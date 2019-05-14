import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';

export class File extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      course_id: this.props.match.params.id,
      file: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  fileHandler = (e) => {
    this.setState({
      file: e.target.files
    })
  }

  submitHandler = (e) =>{
    e.preventDefault();
    const data = {
      file: this.state.file
    }
    console.log(data);
    axios.post(`http://localhost:3001/course/${this.state.course_id}/file`)
    .then((response)=>{
      console.log(response);
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Header title={this.state.course_id} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu course_id={this.state.course_id}/></div>
            <div className="col-9 coursecolumn">
              <h3>Files</h3><br />
              <form onSubmit={this.submitHandler}>
                <input type='file' name="lecturefile" onChange={this.fileHandler} />
                <button type='submit' className="btn btn-primary">Upload</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default File
