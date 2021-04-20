import React from 'react';
import './App.css';
import Chatbot from "react-chatbot-kit";
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routing/routes';
import NavBar from './components/navbar';
import NavBarSpacer from './components/NavBarSpacer';
import StoreProvider from './util/store';
import { ThemeProvider } from '@material-ui/styles';
import { Button, createMuiTheme, IconButton } from '@material-ui/core';
import config from './components/Chatbot/config'
import MessageParser  from './components/Chatbot/MessageParser';
import ActionProvider  from './components/Chatbot/ActionProvider';
import ChatbotAvatar from './assets/ChatbotAvatar.png';

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
  
  const [chatbotOpen, setChatbotOpen] = React.useState(false);
  
  const handleClick = () => {
    setChatbotOpen(chatbotOpen ? false : true);
  }
  
  return (
  <ThemeProvider theme={theme}>
    <StoreProvider>
      <NavBarSpacer />
      <BrowserRouter key="routes">
        <Switch>{routes}</Switch>
        <NavBar />
      </BrowserRouter>
      <IconButton onClick={() => {handleClick()}} className="chatbot-container">
        <img className="chatbot-button-container" src={ChatbotAvatar} alt="chatbot avatar" />
      </IconButton>
      {chatbotOpen ? 
      <div className="chatbot-container">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
      : ''}
    </StoreProvider>
  </ThemeProvider>
);
}

export default App;
