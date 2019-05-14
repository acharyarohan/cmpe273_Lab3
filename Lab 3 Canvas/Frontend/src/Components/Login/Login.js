import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
//import { Logindata } from "../actions/Posts";
import Header from './Header';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { graphql, compose, withApollo } from 'react-apollo';
import { loginQuery } from '../../queries/queries';
import { loginMutation } from '../../mutation/mutations';


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            password: ""
        }

    }

    idChangeHandler = (e) => {
        this.setState({
            userID: e.target.value
        });
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    // submitHandler = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         userID: this.state.userID,
    //         password: this.state.password
    //     }
    //     axios.post("http://localhost:3001", data)
    //         .then(response => {
    //             console.log("login", response); 
    //             if(response.status=== 200){
    //                 Cookies.set('userID',response.data.userID);
    //                 Cookies.set('Role',response.data.role);
    //                 this.props.history.push("/course");
    //             }
    //             else if(response.status=== 401){
    //                 alert("No such user found.");
    //                 this.props.history.push("/");
    //             }
    //             else{
    //                 alert("Incorrect username or passowrd.");
    //                 this.props.history.push("/");
    //             }
    //         });
    // }

    componentDidMount() {
        if (Cookies.get('userID')) {
            this.props.history.push("/course");
        }
    }

    async login(e) {
        e.preventDefault();
        let { email, password } = this.state;

        let res = await this.props.client.query({
            query: loginQuery,
            variables: {
                email,
                password
            },
        });

        this.setState({
                auth: true
            })
            // this.props.onLoginUser(data);
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
            div className = "loginform" > < form onSubmit = { this.submitHandler } >
            <
            input type = "text"
            name = "id"
            placeholder = "SJSU ID"
            onChange = { this.idChangeHandler }
            pattern = "\d+"
            title = "Enter a valid ID"
            required > < /input><br / >
            <
            input type = "password"
            name = "password"
            placeholder = "Password"
            onChange = { this.passwordChangeHandler }
            required / > < br / >
            <
            input type = "submit"
            className = "button"
            value = "Sign In" / > < br / > < br / >
            <
            Link to = "/signup" > New Member Signup < /Link> < /
            form > <
            /div> < /
            div > <
            /div>
        )
    }
}

// Login.PropTypes = {
//   accountprofile: PropTypes.func.isRequired,
//   posts: PropTypes.array.isRequired
// }


// const mapStateToProps = state => ({
//  // posts: state.posts.items,
//   validity : state.posts.items,
//   facultyfnd: state.posts.userid,
//   finalstatus : state.posts.final,
//   redirect : state.posts.red
//  // loginc: state.posts.items
//                        //  this:setState({
//                        //      redirect : state.posts.items
//                        //  })
// }
// );


// export default connect(mapStateToProps,{Logindata})(Login)

export default Login