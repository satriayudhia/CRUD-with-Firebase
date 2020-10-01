import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '../../../config/redux'

//PAGES
import Dashboard from '../Dashboard';
import LoginReact from '../LoginReact'
import Register from '../Register';

//CSS
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={LoginReact} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={Register} />
      </Router>
    </Provider>
  );
}

export default App;
