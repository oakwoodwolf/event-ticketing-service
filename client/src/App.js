import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Client from './Client';
import Agent from './Agent';
import { Header } from './components/Header';

const App = () => {
  return (
    <Router>
      <React.Fragment>

        <Header></Header>
        <Route exact path='/' component={Client} />
        <Route path='/agent' component={Agent} />
      </React.Fragment>
    </Router>
  );
}
export default App;