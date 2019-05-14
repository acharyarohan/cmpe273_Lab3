import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('userID')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      user: "",
      userID: Cookies.get('userID'),
      Role: Cookies.get('Role')
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/profile?userID=${this.state.userID}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          user: response.data
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Header title="Profile" />
        {/* <div className="pageContent"> */}
        <img src="https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg" alt="profilepic1" className="profilepic" />
        
            {/* <div className="col-3 profilecolumn"> */}
              {(this.state.user.profileImage === null || this.state.user.profileImage === "")
                ? <img src="https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg" alt="profilepic1" className="profilepic" />
                : <img src={this.state.user.profileImage} alt="profilepic" className="profilepic" />}
            {/* </div> */}
            
              {/* <div className="mycol2"> */}
              <h4>Personal Information</h4>
              <table align="center">
                <tbody>
                  <tr className="tablerow">
                    <td>Contact Number:</td>
                    <td>{this.state.user.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>About Me:</td>
                    <td> {this.state.user.aboutMe}</td>
                  </tr>
                  <tr>
                    <td>City:</td>
                    <td> {this.state.user.city}</td>
                  </tr>
                  <tr>
                    <td>Country:</td>
                    <td> {this.state.user.country}</td>
                  </tr>
                  <tr>
                    <td>Company:</td>
                    <td> {this.state.user.company}</td>
                  </tr>
                  <tr>
                    <td>School:</td>
                    <td> {this.state.user.school}</td>
                  </tr>
                  <tr>
                    <td>Hometown:</td>
                    <td> {this.state.user.hometown}</td>
                  </tr>
                  <tr>
                    <td>Language:</td>
                    <td> {this.state.user.language}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td> {this.state.user.gender}</td>
                  </tr>

                </tbody>
              </table>
              {/* </div> */}
              <br />
              <Link to="/profile/edit" ><button className="button">Edit Profile</button></Link>
            
        
        {/* </div> */}
      </div>
    )
  }
}

export default Profile
