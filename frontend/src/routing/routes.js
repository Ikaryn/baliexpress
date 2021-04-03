import React from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ProductListPage from '../pages/ProductListPage';
import ProductPage from '../pages/ProductPage';
import EditProductPage from '../pages/EditProductPage';
import SearchPage from '../pages/SearchPage';
import BuildPage from '../pages/BuildPage';


const routes = [
    <PublicRoute key="route-homepage" component={HomePage} restricted path="/" exact/>,
    <PublicRoute key="route-LoginPage" component={Login} restricted path="/login" exact/>,
    <PublicRoute key="route-RegisterPage" component={Register} restricted path="/Register" exact/>,
    <PrivateRoute key="route-profilepage" component={ProfilePage} path="/profile/:uid" exact/>,
    <PublicRoute key="route-product" component={ProductPage} path="/product/:category/:pid" exact/>,
    <PrivateRoute key="route-edit-product" component={EditProductPage} path="/edit-product/:category/:pid" exact/>,
    <PublicRoute key="route-categories" component={ProductListPage} path="/product/:category" exact/>,
    <PublicRoute key="route-search" component={SearchPage} path="/search/:search" exact/>
    <PublicRoute key="route-build" component={BuildPage} path="/build" exact />
];

export default routes;