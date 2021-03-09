import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routing/routes';
import API from './util/API';

const api = new API();

function App() {
  
  const [header, setHeader] = React.useState("beginning");
  
  async function login() {
    console.log('hello');
    api.get('', {})
    .then((res) => {
      console.log(res);
      console.log('wtf');
    })
    console.log('ok')
    
  }

  return (
    <div>
    <BrowserRouter key="routes">
      <Switch>{routes}</Switch>
    </BrowserRouter>
    <button onClick={() => { login();}}>Test click</button>
    </div>
  );
}

export default App;
