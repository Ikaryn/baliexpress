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
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { 500: 'rgb(153,170,181)' },
    neutral : {
      main: '#5c6ac4',
    },
  },
});

function App() {
  
  return (
  <ThemeProvider theme={theme}>
    <StoreProvider>
        <NavBarSpacer />
      <BrowserRouter key="routes">
        <Switch>{routes}</Switch>
        <NavBar />
      </BrowserRouter>
    </StoreProvider>
  </ThemeProvider>
);
}

export default App;
