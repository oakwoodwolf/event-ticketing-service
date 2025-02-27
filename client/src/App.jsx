import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Client from './Routes/Client';
import Agent from './Routes/Agent';
import { Header } from './components/Header';
import ProtectedRoute from './Routes/ProtectedRoute';

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