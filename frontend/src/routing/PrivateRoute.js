import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../util/isLogin';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            isLogin()
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
    />

);

export default PrivateRoute;