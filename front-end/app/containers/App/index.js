/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import ShopPage from 'containers/ShopPage/Loadable';
import StorePage from 'containers/StorePage/Loadable';
import Signin from 'containers/Signin/Loadable';
import Signup from 'containers/Signup/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import { AuthProvider } from './auth'
import { PrivateRoute } from "./private_route";
// import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div``;

// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export default function App() {
    return (
        <AuthProvider>
            <AppWrapper>
                <Helmet
                    titleTemplate="%s - React.js Boilerplate"
                    defaultTitle="React.js Boilerplate"
                >
                    <meta name="description" content="A React.js Boilerplate application" />
                </Helmet>
                <Header />
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute path="/features" component={FeaturePage} />
                    <PrivateRoute path="/shop" component={ShopPage} />
                    <PrivateRoute path="/store" component={StorePage} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="" component={NotFoundPage} />
                </Switch>
                {/* <Footer /> */}
                <GlobalStyle />
            </AppWrapper>
        </AuthProvider>
    );
}
