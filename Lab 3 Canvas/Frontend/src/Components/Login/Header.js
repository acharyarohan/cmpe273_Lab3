import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <div>
        {/* <h3 className="loginheader">Connecting to <span className="titlespan">SJSU</span></h3> */}
        <img src={require("./canvasLogo.png")} className="loginheader" alt="Logo" />
        {/* <h6 className="loginheader loginheadersub">Sign in with your SJSU ID</h6> */}
      </div>
    )
  }
}

export default Header
