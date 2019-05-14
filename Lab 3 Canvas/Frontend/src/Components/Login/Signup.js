import React, { Component } from 'react'
import axios from 'axios';
import '../Login/Login.css';
import Header from './Header';
import { signupuser, signupreset } from '../../actions/signupActions';
import { graphql, compose } from 'react-apollo';
import { signupMutation } from '../../mutation/mutations';

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            name: "",
            email: "",
            password: "",
            role: ""
        }
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idChangeHandler = (e) => {
        this.setState({
            userID: e.target.value
        });
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    roleChangeHandler = (e) => {
        this.setState({
            role: e.target.value
        });
    }

    // submitHandler = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         userID: this.state.userID,
    //         name: this.state.name,
    //         email: this.state.email,
    //         password: this.state.password,
    //         role: this.state.role
    //     }
    //     axios.post("http://localhost:3001/signup", data)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 alert("SignUp Successful!")
    //             }
    //             else{
    //                 alert("SignUp failed.")
    //             }
    //             this.props.history.push('/login');
    //         });
    // }

    let res = await this.props.signupMutation({
        variables: {
            email,
            password,
            name,
            userID,
            role
        },
    });
    if (_.has(res, "data.signup.email")) {
        if (res.data.signup.email) {
            alert("sign up successfull! redirecting to login page!")
            this.setState({
                signupSuccess: 1
            })
        } else {
            alert("sign up failed! Email already exists")
            this.setState({
                signupSuccess: 0
            })
        }
    } else {
        alert("sign up failed! Please try again !")

        this.setState({
            signupSuccess: 0
        })
    }


}

render() {
    return ( <
        div >
        <
        div > < Header / > < /div> <
        div className = "login" >
        <
        div className = "logodiv" > < img src = "https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/san_jose_state_u-1/standard.png?1548463655"
        alt = "Logo"
        className = "loginlogo" / > < /div> <
        div className = "loginform" >
        <
        form onSubmit = { this.submitHandler } >
        <
        input type = "text"
        placeholder = "SJSU ID"
        onChange = { this.idChangeHandler }
        pattern = "\d+"
        title = "Enter a valid ID"
        required / > < br / >
        <
        input type = "text"
        placeholder = "Name"
        onChange = { this.nameChangeHandler }
        required / > < br / >
        <
        input type = "email"
        placeholder = "Email"
        onChange = { this.emailChangeHandler }
        required / > < br / >
        <
        input type = "password"
        placeholder = "Password"
        onChange = { this.passwordChangeHandler }
        required / > < br / >
        <
        label > Student & nbsp; <
        input type = "radio"
        name = "role"
        value = "student"
        onChange = { this.roleChangeHandler }
        checked = { this.state.role === "student" }
        required / > < /label> &
        nbsp; & nbsp; & nbsp; & nbsp; < label > Faculty & nbsp; <
        input type = "radio"
        name = "role"
        value = "faculty"
        onChange = { this.roleChangeHandler }
        checked = { this.state.role === "faculty" }
        /></label > < br / >
        <
        input type = "submit"
        className = "button"
        value = "Sign Up" / >
        <
        /form> <
        /div> <
        /div> <
        /div>
    )
}
}

export default Signup