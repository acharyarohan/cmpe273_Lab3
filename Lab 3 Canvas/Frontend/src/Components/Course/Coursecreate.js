import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import '../Profile/Profile.css';
import { graphql, compose } from 'react-apollo';
import { addCourse } from '../../mutation/mutations';

export class Coursecreate extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('userID')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            courseID: "",
            courseName: "",
            courseDept: "",
            courseDescription: "",
            courseRoom: "",
            courseCapacity: "",
            waitlistCapacity: "",
            courseTerm: ""
        }
        this.course_idHandler = this.course_idHandler.bind(this);
        this.course_nameHandler = this.course_nameHandler.bind(this);
        this.course_deptHandler = this.course_deptHandler.bind(this);
        this.course_descHandler = this.course_descHandler.bind(this);
        this.course_roomHandler = this.course_roomHandler.bind(this);
        this.course_capHandler = this.course_capHandler.bind(this);
        this.course_waitHandler = this.course_waitHandler.bind(this);
        this.course_termHandler = this.course_termHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    course_idHandler = (e) => {
        this.setState({
            courseID: e.target.value
        });
    }
    course_nameHandler = (e) => {
        this.setState({
            courseName: e.target.value
        });
    }
    course_deptHandler = (e) => {
        this.setState({
            courseDept: e.target.value
        });
    }
    course_descHandler = (e) => {
        this.setState({
            courseDescription: e.target.value
        });
    }
    course_roomHandler = (e) => {
        this.setState({
            courseRoom: e.target.value
        });
    }
    course_capHandler = (e) => {
        this.setState({
            courseCapacity: e.target.value
        });
    }
    course_waitHandler = (e) => {
        this.setState({
            waitlistCapacity: e.target.value
        });
    }
    course_termHandler = (e) => {
        this.setState({
            courseTerm: e.target.value
        });
    }

    // submitHandler = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         courseID: this.state.courseID,
    //         courseName: this.state.courseName,
    //         courseDept: this.state.courseDept,
    //         courseDescription: this.state.courseDescription,
    //         courseRoom: this.state.courseRoom,
    //         courseCapacity: this.state.courseCapacity,
    //         waitlistCapacity: this.state.waitlistCapacity,
    //         courseTerm: this.state.courseTerm
    //     }   
    //     axios.post(`http://localhost:3001/course/new?userID=${Cookies.get('userID')}&role=${Cookies.get('Role')}`,data)
    //     .then((response)=>{
    //         console.log(response);
    //         if(response.status=== 200){
    //             alert("Course successfully addedd.");
    //             this.props.history.push('/course');
    //         }
    //         else if(response.status=== 400){
    //             alert("Something went wrong!")
    //             this.props.history.push('/course');
    //         }
    //     });
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
        return ( <
            div >
            <
            Navbar / >
            <
            Header title = "Add Course" / >
            <
            div className = "pageContent" >
            <
            div className = "row" >
            <
            div className = "col-3 profilecolumn" > < /div> <
            div className = "col-6 createcourse" >
            <
            form onSubmit = { this.submitHandler } >
            <
            table className = "coursetable"
            align = "center" >
            <
            tbody >
            <
            tr >
            <
            td > Course ID: < /td> <
            td > < input type = "text"
            name = "course_id"
            onChange = { this.course_idHandler }
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Course Name: < /td> <
            td > < input type = "text"
            name = "course_name"
            onChange = { this.course_nameHandler }
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Course Department: < /td> <
            td > < input type = "text"
            name = "course_dept"
            onChange = { this.course_deptHandler }
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Course Description: < /td> <
            td > & nbsp; & nbsp; < textarea rows = "5"
            cols = "30"
            name = "course_desc"
            onChange = { this.course_descHandler }
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Course Room: < /td> <
            td > < input type = "text"
            name = "course_room"
            onChange = { this.course_roomHandler }
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Course Capacity: < /td> <
            td > < input type = "text"
            name = "course_cap"
            onChange = { this.course_capHandler }
            pattern = "\d+"
            title = "Enter a valid number."
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Waitlist Capacity: < /td> <
            td > < input type = "text"
            name = "course_wait"
            onChange = { this.course_waitHandler }
            pattern = "\d+"
            title = "Enter a valid number."
            required / > < /td> <
            /tr> <
            tr >
            <
            td > Course Term: < /td> <
            td > < input type = "text"
            name = "course_term"
            onChange = { this.course_termHandler }
            required / > < /td> <
            /tr> <
            tr > < td > < br / > < /td></tr >
            <
            tr >
            <
            td > < /td> <
            td > < input type = "submit"
            className = "button2"
            value = "Add Course" / >
            &
            nbsp; < Link to = "/course" > < button className = "button2" > Cancel < /button></Link > < /td> <
            /tr> <
            /tbody> <
            /table> <
            /form> <
            /div> <
            /div> <
            /div> <
            /div>
        )
    }
}

export default Coursecreate