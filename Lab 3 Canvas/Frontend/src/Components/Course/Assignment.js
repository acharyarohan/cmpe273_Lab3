import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import './Courseinfo.css'; 

export class Assignment extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      course_id: this.props.match.params.id
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Header title={this.state.course_id} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu course_id={this.state.course_id} /></div>
            <div className="mycol">
              <h3>Assignment</h3><br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Assignment
