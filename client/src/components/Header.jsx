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
          <Link to='/admin/'>Admin Dashboard</Link>
          </div>
        </div>
        <hr />
        </div>
      );
    
  }
}
