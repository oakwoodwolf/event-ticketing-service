import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class Header extends Component {
  render() {

      // simple mapping of array from props
      return (
        <div>
          <div class="header">
          <div class="header-button">
            <Link to='/'>Client Home</Link>
          </div>
          <div class="header-button">
            <Link to='/agent'>Agent Dashboard</Link>
          </div>
          <div class="header-button">
            <a href='http://localhost:5173'>Agent Dashboard</a>
          </div>
        </div>
        <hr />
        </div>
      );
    
  }
}
