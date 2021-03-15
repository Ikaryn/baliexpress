import React from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ProductListPage from '../pages/ProductListPage';
import ProductPage from '../pages/ProductPage';

const routes = [
    <PublicRoute key="route-homepage" component={HomePage} restricted path="/" exact/>,
    <PublicRoute key="route-LoginPage" component={Login} restricted path="/login" exact/>,
    <PublicRoute key="route-LoginPage" component={Register} restricted path="/Register" exact/>,
    <PrivateRoute key="route-profilepage" component={ProfilePage} path="/profile/:uid" exact/>,
    <PublicRoute key="route-product" component={ProductPage} path="/product/:category/:pid" exact/>,
    <PublicRoute key="route-categories" component={ProductListPage} path="/product/:category" exact/>
    // <PublicRoute key="route-productList" component?
];

export default routes;