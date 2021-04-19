import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            // had to swap ternary operator.
            // isLogin() && restricted
            // ? <Component {...props} />
            // : <Redirect to="/" />
            <Component {...props} />
        )}
    />

);

export default PublicRoute;
