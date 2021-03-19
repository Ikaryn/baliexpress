import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routing/routes';
import NavBar from './components/navbar';
import NavBarSpacer from './components/NavBarSpacer';
import StoreProvider from './util/store';

function App() {

  return (
    <StoreProvider>
        <NavBarSpacer />
      <BrowserRouter key="routes">
        <Switch>{routes}</Switch>
        <NavBar />
      </BrowserRouter>
    </StoreProvider>
);
}

export default App;
