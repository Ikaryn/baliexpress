import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routing/routes';
import NavBar from './components/navbar';
import NavBarSpacer from './components/NavBarSpacer';


function App() {

  return (
    <div>
    <NavBar />
    <NavBarSpacer />
    <BrowserRouter key="routes">
      <Switch>{routes}</Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
