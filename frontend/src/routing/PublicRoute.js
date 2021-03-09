import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../util/isLogin';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            // had to swap ternary operator.
            isLogin() && restricted
            ? <Component {...props} />
            : <Redirect to="/" />
        )}
    />

);

export default PublicRoute;
