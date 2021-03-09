import React from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/HomePage';

const routes = [
    <PublicRoute key="route-homepage" component={HomePage} restricted path="/" exact/>
];

export default routes;