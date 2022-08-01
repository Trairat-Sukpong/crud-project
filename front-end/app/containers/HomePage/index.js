/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';

import { makeSelectUsername } from './selectors';
import { refresh_token } from '../../refreshToken';

import reducer from './reducer';
import saga from './saga';

import { AuthContext } from '../App/auth';
import * as env from '../../env.json';

const token = localStorage.getItem("token")
const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {

  const [data, setData] = useState("")

  const [currentUser, setCurrentUser] = useContext(AuthContext);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();

    getProfile()
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  const onLogout = async () => {
    await axios({
      method: "POST",
      withCredentials: true,
      url: env.host_api_auth + "/auth/logout",
    })
      .then(function (response) {
        console.log(response);
        // window.location.reload();
        setCurrentUser(false);
        localStorage.removeItem('token')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getProfile = async () => {
    await axios({
      method: "POST",
      withCredentials: true,
      url: env.host_api_auth + "/profile/user",
      headers: {
        "x-access-token": token
      }
    })
      .then(function (response) {
        setData(response.data)
      })
      .catch(
        function (error) {
          // console.log(error.response);

          if (error.response.status == 401) {
            refresh_token();
          }

        });
  }

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className=" text-center">
        <div>{JSON.stringify(data)}</div>
        <button type="button" className="btn btn-primary" onClick={onLogout}>Logout</button>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
