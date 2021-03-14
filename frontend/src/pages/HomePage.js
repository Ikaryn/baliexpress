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
        history.push('login');
    }
    
    const navRegister = () => {
        history.push('register');
    }

    const navCPU = () => {
        history.push('product/CPU');
    }
    const navMotherboards = () => {
        history.push('product/Motherboards');
    }
    const navStorage = () => {
        history.push('product/Storage');
    }

    return (
        <div>
            {/* <NavBar /> */}
            <button onClick={() => {navLogin();}}>Login Page</button>
            <button onClick={() => {navRegister();}}>Register Page</button>
            <button onClick={() => {navCPU();}}>CPU page</button>
            <button onClick={() => {navMotherboards();}}>Motherboards page</button>
            <button onClick={() => {navStorage();}}>Storage page</button>
        </div>
        )
};

export default HomePage;