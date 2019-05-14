import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';

export class Navbar extends Component {
    constructor(props){
        super(props);
    
    this.state = {
        id: Cookies.get('userID'),
        role: Cookies.get('Role'), 
    }
}

  

    render() {
        const isStudent = Cookies.get("Role")==="student";
        return (
            <div className="navbar ">
                <header id="navigation-bar">
                    <ul className="navul">
                        <div>
                        <img src={require("./SJSULogo.png")} alt="logo" className="navbarlogo" />
                        </div><br />
                        <li><Link to="/course"><i className="fa fa-book fa-4x" /><br /><span className="navbartext">Dashboard</span></Link></li><br />
                        <li><Link to="/profile"><i className="fa fa-user-circle-o fa-4x" /><br /><span className="navbartext">Profile</span></Link></li><br /><br />
                        <li>{isStudent 
          ? <Link to="/course/search"><i className="navbartext2" /><br /><span className="navbartext2">Search Course</span> </Link>
          : <Link to="/course/new"><i className="navbartext2" /><span className="navbartext2">Add Course</span></Link>}</li><br />
                        {/* <li><span className="logoutbutton"><Link to="/" onClick={this.logout} ><i className="fas fa-sign-out-alt fa-3x" /><br /><span className="navbartext">Log Out</span></Link></span></li> */}
                    </ul>
                </header>
            </div>
        )
    }
}

export default Navbar
