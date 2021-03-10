import React from 'react';
import NavBar from '../components/navbar';
import API from '../util/API.js';
import {
    useHistory,
  } from 'react-router-dom';

const api = new API();

const HomePage = () => {
    const history = useHistory();

    const navLogin = () => {
        history.push('/login');
    }
    
    const navRegister = () => {
        history.push('/register');
    }


    return (
        <div>
            {/* <NavBar /> */}
            <button onClick={() => {navLogin();}}>Login Page</button>
            <button onClick={() => {navRegister();}}>Register Page</button>
        </div>
        )
};

export default HomePage;