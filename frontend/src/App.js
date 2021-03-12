import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routing/routes';


function App() {

  return (
    <div>
    <BrowserRouter key="routes">
      <Switch>{routes}</Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
