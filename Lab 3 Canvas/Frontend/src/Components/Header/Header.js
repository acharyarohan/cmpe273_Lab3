import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            user: "",
        }

        this.state = {
          id: Cookies.get('userID'),
          role: Cookies.get('Role'), 
      }
    }
    // componentDidMount() {
    //   axios.get('http://localhost:3001/course')
    //     .then((response) => {
    //       // console.log(response.data.data);
    //       this.setState({
    //         user: response.data.data
    //       });
    //     });
    // }
    logout(){
      Cookies.remove('userID');
      Cookies.remove('Role');
  }

  render() {
    return (
      <div className="row container">
        <div className="col-12 pageheader">
            <h1 className="pagetitle1" >{this.props.title}</h1>
            <h1 className="pagetitle2"> <Link to="/" className="pagetitle2" onClick={this.logout} >Logout</Link></h1>
            {/* <h1 className="pagetitle2" >Welcome, {this.props.user.name}</h1> */}
        </div>
      </div>
    )
  }
}

export default Header
