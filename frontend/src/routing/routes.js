import React from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';

const routes = [
    <PublicRoute key="route-homepage" component={HomePage} restricted path="/" exact/>,
    <PublicRoute key="route-LoginPage" component={Login} restricted path="/login" exact/>,
    <PublicRoute key="route-LoginPage" component={Register} restricted path="/Register" exact/>
];

export default routes;