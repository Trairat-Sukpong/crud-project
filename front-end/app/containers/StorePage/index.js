/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-plusplus */
/*
 * ShopPage
 *
 * List all the shop
 */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { useDispatch } from 'react-redux'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { REQ_GET_ITEM } from '../Redux/actionType'

import reducer from '../Redux/reducer';
import saga from '../Redux/saga';
import H1 from 'components/H1';

import messages from './messages';
import Create from './create.modal';
import TableItem from './item.table';

import 'antd/dist/antd.css';


const key = 'itemStore';

function StorePage() {


  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch()

  const action = (type, payload) => {
    dispatch({ type, payload })
  }

  useEffect(() => {

    action(REQ_GET_ITEM)

  }, []);

  return (
    <div>
      <Helmet>
        <title>Shop Page</title>
        <meta
          name="description"
          content="Shop page of React.js Boilerplate application"
        />
      </Helmet>
      <H1 className=" text-uppercase text-black-50">
        <b>
          <FormattedMessage {...messages.header} />
        </b>
      </H1>
      <div className="container">
        <div className="row text-end">
          <div className="col">
            <Create />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <TableItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePage

