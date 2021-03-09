import './App.css';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routing/routes';

function App() {
  return (
    <BrowserRouter key="routes">
      <Switch>{routes}</Switch>
    </BrowserRouter>
  );
}

export default App;
