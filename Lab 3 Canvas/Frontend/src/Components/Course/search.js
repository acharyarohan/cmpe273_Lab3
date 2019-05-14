// import React, { Component } from 'react';
// import Navbar from '../Navbar/Navbar';
// import Header from '../Header/Header';
// import Coursecard from '../Coursecard/Coursecard';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import './Coursesearch.css';

// export class Coursesearch extends Component {
//     constructor(props){
//         super(props);
//         if (!Cookies.get('userID')) {
//           alert("Please login first.");
//           this.props.history.push("/");
//         }
//         this.state = {
//             searchterm: "",
//             courses: {}
//         }
//        // this.searchtermHandler = this.searchtermHandler.bind(this);
//     }

//     serachtermHandler = (e) => {
//         this.setState({
//             searchterm: e.target.value
//         })
//     }

//     componentDidMount(){
//         axios.get("http://localhost:3001/course/search")
//         .then((response)=>{
//             this.setState({
//                 courses: response.data.courses
//             });
//         });
//     }

//   render() {
//     let courses = [];
//     Object.assign(courses, this.state.courses);

//     return (
//       <div>
//         <Navbar/>
//         <Header title="Course Catalog" />
//         <div className="pageContent">
//           <div className="row coursesearch">
//             <input type="text" name="searchterm" className="searchinput" placeholder="Search course by id or name" onChange={this.serachtermHandler}/>
//             <br></br>
//             {courses.map((course,index)=>{
//                 return (course.course_name.toLowerCase().includes(this.state.searchterm.toLowerCase())) || (course.course_id.toLowerCase().includes(this.state.searchterm.toLowerCase()) || (course.course_term.toLowerCase().includes(this.state.searchterm.toLowerCase())))
//                 ?<Coursecard key={index} num={index} id={course.course_id} name={course.course_name} term={course.course_term} />:<span key={index}/>
//             })}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Coursesearch

import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
//import { rooturl } from "../../config/settings";

class Search extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get("userID")) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      courseTerm: "spring19",
      courseDept: "cmpe",
      courseID: "273",
      search_condition: "E",
      search_answer: [],
      user_registration_data: [],
      registration_data: [],
      authFlag: true,
      redirectError: false,
      subSearch: [],
      startIndex: 0,
      pagesPerPage: 3,
      currentPage: 1
    };
  }

  //get the registered course of a user from backend
  async componentDidMount() {
    console.log("inside didmount up");

    axios.get(`http://localhost:3001/register?userID=${Cookies.get('userID')}`).then(response => {
      //update the state with the response data
      console.log("inside didmount down");
      this.setState({
        user_registration_data: response.data
      });
      console.log("user classes:", this.state.user_registration_data);
    });
    axios.get("http://localhost:3001/registerAll").then(response => {
      //update the state with the response data
      console.log("inside didmount registration ALL down");
      this.setState({
        registration_data: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });
  }

  handleStateUpdate = () => {
    console.log("inside updateState up");

    axios.get(`http://localhost:3001/register?userID=${Cookies.get('userID')}`).then(response => {
      //update the state with the response data
      console.log("inside updateState down");
      this.setState({
        user_registration_data: response.data
      });
      console.log("user classes:", this.state.user_registration_data);
    });
    axios.get("http://localhost:3001/registerAll").then(response => {
      //update the state with the response data
      console.log("inside updateState registration ALL down");
      this.setState({
        registration_data: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });
  };

  handleChange = e => {
    e.preventDefault();

    console.log("target:", e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state:", this.state);
  };

  submitSearch = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      courseTerm: this.state.courseTerm,
      courseDept: this.state.courseDept,
      courseID: this.state.courseID,
      search_condition: this.state.search_condition
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:3001/course/search?userID=${Cookies.get("userID")}`,
        data
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          var firstSearch = response.data.filter(result => {
            var index = response.data.indexOf(result);
            return index >= 0 && index < 3;
          });
          this.setState({
            authFlag: true
          });
          this.setState({
            search_answer: response.data,
            subSearch: firstSearch
          });

          console.log("search response:" + JSON.stringify(response.data));
          response.data.map(course => console.log(course.courseID));
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  handlePagination = event => {
    var target = event.target;
    var id = target.id;
    var flag = true;
    if (id == "prev") {
      console.log("SI", this.state.startIndex);
      if (this.state.startIndex > 0) {
        var startIndex = this.state.startIndex - this.state.pagesPerPage;
      } else {
        flag = false;
      }
    } else {
      var startIndex = this.state.startIndex + this.state.pagesPerPage;
      if (startIndex > this.state.search_answer.length) {
        flag = false;
      }
    }

    if (flag === true) {
      var endIndex = startIndex + this.state.pagesPerPage - 1;
      var search_answer = this.state.search_answer;
      var subSearch = this.state.search_answer.filter(message => {
        var index = search_answer.indexOf(message);
        return index >= startIndex && index <= endIndex;
      });
      console.log("startindex: ", startIndex);
      console.log("endindex: ", endIndex);
      this.setState({
        subSearch: subSearch,
        startIndex: startIndex
      });
    }
  };

  handleAddCourse = course => {
    //prevent page from refresh
    console.log("course", course);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(`http://localhost:3001/enroll?userID=${Cookies.get('userID')}`,course)
    .then((response)=>{
        console.log(response);
        if(response.status=== 200){
            alert("Course successfully addedd.");
            this.props.history.push('/course');
        }
        else if(response.status=== 400){
            alert("Something went wrong!")
            this.props.history.push('/course');
        }
    })}
      
 

  handleWaitlist = course => {
    //prevent page from refresh
    console.log("course", course);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(`http://localhost:3001/waitlist?userID=${Cookies.get('userID')}`, course)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true
          });
          this.handleStateUpdate();

          console.log("response:" + response);
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  handleDropCourse = course => {
    //prevent page from refresh
    console.log("course", course);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(`http://localhost:3001/dropCourse?userID=${Cookies.get('userID')}`, course)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true
          });
          this.handleStateUpdate();

          console.log("response:" + response);
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  render() {
    var courseAns = [];
    if (this.state.subSearch.length > 0) {
      courseAns = this.state.subSearch.map(course => {
        console.log("course=", course, typeof course);
        console.log("state of all reg:", this.state.registration_data);

        let countWaitlist = 0;
        let countRegistered = 0;
        var hasClass = false;
        console.log("state of user reg:", this.state.user_registration_data);

        this.state.user_registration_data.map(element => {
          if (
            element.courseID == course.courseID &&
            element.instructorID == course.instructorID
          ) {
            hasClass = true;
          }
        });
        console.log("hasclass===", hasClass);

        this.state.registration_data.map(element => {
          console.log("element=", element, typeof element);
          if (
            element.courseID == course.courseID &&
            element.instructorID == course.instructorID &&
            element.waitlisted == "0"
          ) {
            countRegistered += 1;
          } else if (
            element.courseID == course.courseID &&
            element.instructorID == course.instructorID &&
            element.waitlisted == "1"
          ) {
            countWaitlist += 1;
          }
        });
        let button;
        if (hasClass) {
          button = (
            <button onClick={() => this.handleDropCourse(course)}>
              {" "}
              DROP{" "}
            </button>
          );
        } else {
          if (countRegistered < course.courseCapacity) {
            button = (
              <button onClick={() => this.handleAddCourse(course)}>
                {" "}
                ADD{" "}
              </button>
            );
          } else if (countWaitlist < course.waitlistCapacity) {
            button = (
              <button onClick={() => this.handleWaitlist(course)}>
                Waitlist{" "}
              </button>
            );
          } else {
            button = (
              <div className="alert alert-danger" role="alert">
                <strong> FULL </strong>{" "}
              </div>
            );
          }
        }
        return (
          <tr>
            <td> {course.courseID} </td> <td> {course.courseName} </td>{" "}
            <td> {course.courseRoom} </td> {" "}
            <td> {button} </td>{" "}
          </tr>
        );
      });
    }
    let redirectVar = null;
    if (!Cookies.get("userID")) {
      redirectVar = <Redirect to="/course" />;
    }

    return (
      <div>
        <Navbar />
        <Header title="Search" />
        {" "}
        {redirectVar}{" "}
        <div>
          <div>
            <h2 align="center">
              Search Courses <br />
              <br />
            </h2>{" "}
          </div>{" "}
          <div>
            <form>
              <label>
                Select Department:
                <select
                  name="courseDept"
                  value={this.state.courseDept}
                  onChange={this.handleChange}
                >
                  <option value="cmpe"> CMPE </option>{" "}
                  <option value="cs"> CS </option>{" "}
                  <option value="ee"> EE </option>{" "}
                  <option value="bus"> BUS </option>{" "}
                </select>{" "}
              </label>{" "}
              <label>
                Select Semester:
                <select
                  name="courseTerm"
                  value={this.state.courseTerm}
                  onChange={this.handleChange}
                >
                  <option value="spring19"> Spring 19 </option>{" "}
                  <option value="fall18"> Fall 18 </option>{" "}
                  <option value="spring18"> Spring 18 </option>{" "}
                </select>{" "}
              </label>{" "}
            </form>{" "}
            <form>
              <label>
                Select Range:
                <select
                  name="search_condition"
                  value={this.state.search_condition}
                  onChange={this.handleChange}
                >
                  <option value="E"> is exactly </option>{" "}
                  <option value="G"> greater than or equal to </option>{" "}
                </select>{" "}
              </label>{" "}
              <label>
                <input
                  type="text"
                  name="courseID"
                  placeholder="Course Number"
                  onChange={this.handleChange}
                  //value={this.state.course_number}
                />{" "}
              </label>{" "}
            </form>{" "}
          </div>{" "}
          <div className="col-md-1">
            <button onClick={this.submitSearch} class="btn btn-primary">
              search{" "}
            </button>{" "}
          </div>{" "}
        </div>
        <div class="container">
          <h2> List of courses </h2>{" "}
          <table class="table">
            <thead>
              <tr>
                <th> Course ID </th> <th> Title </th> <th> Course Room </th>{" "}
                {" "}
              </tr>{" "}
            </thead>{" "}
            {courseAns}
            <div className="pagination-container center-content">
              <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                <button
                  className="btn btn-primary btn-lg"
                  id="prev"
                  onClick={this.handlePagination}
                >
                  Prev{" "}
                </button>{" "}
              </span>{" "}
              <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                <button
                  className="btn btn-primary btn-lg"
                  id="next"
                  onClick={this.handlePagination}
                >
                  Next{" "}
                </button>{" "}
              </span>{" "}
            </div>{" "}
          </table>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Search;
