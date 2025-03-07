import React, { Component } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export class Header extends Component {
  render() {
    // simple mapping of array from props
    const { user, logout, login } = this.props;
    return (
      <div>
        <div class="header">
          <div class="header-button">
            <Link to="/">Client Home</Link>
          </div>
          <div class="header-button">
            <Link to="/agent">Agent Dashboard</Link>
          </div>
          {!!user && user.roles.includes("admin") && (
            <div class="header-button">
              <Link to="/admin/">Admin Dashboard</Link>
            </div>
          )}
          {user ? (
            <button class="header-button logon" onClick={logout}>
              Log Out
            </button>
          ) : (
            <div class="header-button">
              <Link to="/login">Log In</Link>
            </div>
          )}
        </div>
        <hr />
      </div>
    );
  }
}
