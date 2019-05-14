import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import Menu from '../Menu/Menu';
import './Courseinfo.css';

export class Courseinfo extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
          alert("Please login first.");
          this.props.history.push("/");
        }
        this.state = {
            course_id: this.props.match.params.id,
            course_dept: this.props.match.params.course_dept,
            course_name: this.props.match.params.course_name, 
            details:"",
            action:"",
            isEnroll:""
        }
        this.enrollHandler = this.enrollHandler.bind(this);
        this.waitlistHandler = this.waitlistHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    enrollHandler(){
      this.setState({
        action: "enroll"
      });
    }
    waitlistHandler(){
      this.setState({
        action: "waitlist"
      });
    }
    dropHandler(){
      this.setState({
        action: "drop"
      });
    }

    submitHandler = (e) => {
      e.preventDefault();
      const data = {action: this.state.action};
      axios.post(`http://localhost:3001/course/${this.state.course_id}/home`,data)
      .then((response)=>{
        if(response.data.message==="success"){
          alert("Action completed.");
          this.props.history.index = 0;
          this.props.history.push("/course");
        }
      });
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/course/${this.state.course_id}/home`)
        .then((response)=>{
            if(response.data.message==="error"){
              alert("Something went wrong!");
              this.prop.history.push("/course");
            }
            else if(response.data.message==="success"){
              this.setState({
                details: response.data.data,
                isEnroll: response.data.isEnroll
              });
            }
        });
    }

  render() {
    const isStudent = Cookies.get("role") === "student";
    // console.log(this.props);
    return (
      <div>
        <Navbar/>
        <Header title= {this.state.course_id}/>
        <div className="pageContent">
            <div className="row">
                <div className="col-3 menucolumn">
                {(isStudent)?(this.state.isEnroll==="enroll")?<Menu course_id={this.state.course_id}/>
                :<span></span>
                :<Menu course_id={this.state.course_id} />}
                </div>
                <div className="mycol3">
                  <h3>{this.state.details.course_name}</h3><br/>
                    <table align="center" className="courseinfo">
                    <tbody>
                      <tr>
                        <td>Department:</td>
                        <td> {this.state.details.course_dept}</td>
                      </tr>
                      <tr>
                        <td className="course_desc">Description:</td>
                        <td> {this.state.details.course_desc}</td>
                      </tr>
                      <tr>
                        <td>Classroom:</td>
                        <td> {this.state.details.course_room}</td>
                      </tr>
                      <tr>
                        <td>Capacity:</td>
                        <td> {this.state.details.course_cap}</td>
                      </tr>
                      <tr>
                        <td>Waitlist:</td>
                        <td> {this.state.details.course_wait}</td>
                      </tr>
                      <tr>
                        <td>Term:</td>
                        <td> {this.state.details.course_term}</td>
                      </tr>
                      {(isStudent)
                      ?(this.state.isEnroll==="waitlist")
                        ?<tr><td>Status:</td><td> Waitlisted</td></tr>
                        :<tr></tr>
                      :<tr></tr>}
                    </tbody>
                    </table>
                    <br/>

                    {(isStudent)
                    ? (this.state.isEnroll === "none")?<span>
                      <form onSubmit={this.submitHandler}>
                      <input type="submit" name="enroll" value="Enroll" className="btn btn-primary" onClick={this.enrollHandler} />&nbsp;
                      <input type="submit" name="waitlist" value="Waitlist" className="btn btn-primary" onClick={this.waitlistHandler} />&nbsp;
                      </form>
                    </span>
                    :<span>
                      <form onSubmit={this.submitHandler}>
                      <input type="submit" name="drop" value="Drop" className="btn btn-primary" onClick={this.dropHandler} />
                      </form>
                    </span>
                    : <span></span>}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Courseinfo
