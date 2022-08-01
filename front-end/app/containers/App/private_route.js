import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth'

export function PrivateRoute({ component: Component, ...rest }) {
    const [currentUser] = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    )
}

// export { PrivateRoute }