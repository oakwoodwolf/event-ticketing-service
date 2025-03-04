import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Client from './Routes/Client';
import Agent from './Routes/Agent';
import AdminPage from './Routes/AdminPage';
import { Header } from './components/Header';

const App = () => {
  return (
    <Router>
      <React.Fragment>

        <Header></Header>
        <Routes>
          <Route exact path='/' element={<Client/>} /> 
          <Route path='/agent' element={<Agent/>} />
          <Route path='/admin/*' element={<AdminPage/>} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}
export default App;