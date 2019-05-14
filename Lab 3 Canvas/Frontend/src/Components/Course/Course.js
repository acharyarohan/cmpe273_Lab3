import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Coursecard from "../Coursecard/Coursecard";
import "./Course.css";

export class Course extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get("userID")) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            // id: Cookies.get('id'),
            // role: Cookies.get('role'),
            courses: "",
            allData: []
        };
    }

    // componentDidMount(){
    //   axios.get(`http://localhost:3001/course?userID=${Cookies.get('userID')}`)
    //   .then((response)=>{
    //     console.log(response);
    //     if(response.status===200){
    //       this.setState({
    //         courses: response.data.data
    //       })
    //     }
    //     else{
    //       this.props.history.push("/");
    //     }
    //   });
    // }

    // componentDidMount() {
    //   if (Cookies.get("Role") === "student") {
    //     axios
    //       .get(`http://localhost:3001/register?userID=${Cookies.get("userID")}`)
    //       .then(response => {
    //         //update the state with the response data
    //         console.log("inside didmount home down2", response);
    //         this.setState({
    //           allData: response.data
    //         });
    //         console.log("All Registration:", this.state.allData);
    //       });
    //   } else {
    //     axios
    //       .get(`http://localhost:3001/course?userID=${Cookies.get("userID")}`)
    //       .then(response => {
    //         //update the state with the response data
    //         console.log("inside didmount home down3,response:", response);
    //         console.log(
    //           "inside didmount home down3,response.data.courseID:",
    //           response.data.courseID
    //         );

    //         this.setState({
    //           allData: response.data
    //         });
    //         console.log("All classes:", this.state.allData);
    //       });
    //   }
    // }

    async submit(e) {
        e.preventDefault();
        let { message, courseSem, courseYear, ...rest } = this.state;
        await this.setState({
            courseTerm: courseSem + " " + courseYear
        });
        //  this.props.oncreatecourse(rest)
        let res = await this.props.addCourse({
            variables: {
                ...rest
            },
        });
        alert("course added successfully!")
        this.setState({
            courseID: "",
            courseName: "",
            courseDept: "",
            courseDescription: "",
            courseRoom: "",
            courseCapacity: 0,
            waitlistCapacity: 0,
            courseTerm: "",
            message: "",
            courseSem: "Spring"
        })
    }

    render() {
        let courses = [];
        Object.assign(courses, this.state.courses);
        //const isStudent = Cookies.get("role")==="student";

        return ( <
            div >
            <
            Navbar / >
            <
            Header title = "Dashboard" / >
            <
            div className = "pageContent" >
            <
            div className = "row mycourses" > { " " } {
                this.state.allData.map((course, index) => {
                    return ( <
                        Coursecard key = { index }
                        num = { index }
                        dept = { course.courseDept }
                        id = { course.courseID }
                        name = { course.courseName }
                        />
                    );
                })
            } { " " } <
            /div>{" "} <
            div / >
            <
            /div>{" "} <
            /div>
        );
    }
}

export default Course;