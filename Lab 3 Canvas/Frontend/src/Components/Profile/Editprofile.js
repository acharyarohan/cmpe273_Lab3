import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

export class Editprofile extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('userID')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
                profileImage: "",
                phone: "",
                aboutMe: "",
                city: "",
                country: "",
                company: "",
                school: "",
                hometown: "",
                language: "",
                gender: ""
            }
            // this.imageHandler = this.imageHandler.bind(this);
            // this.phoneHandler = this.phoneHandler.bind(this);
            // this.aboutHandler = this.aboutHandler.bind(this);
            // this.cityHandler = this.cityHandler.bind(this);
            // this.countryHandler = this.countryHandler.bind(this);
            // this.companyHandler = this.companyHandler.bind(this);
            // this.schoolHandler = this.schoolHandler.bind(this);
            // this.hometownHandler = this.hometownHandler.bind(this);
            // this.languageHandler = this.languageHandler.bind(this);
            // this.genderHandler = this.genderHandler.bind(this);
            // this.submitHandler = this.submitHandler.bind(this);
    }

    imageHandler = (e) => {
        this.setState({
            profileImage: e.target.value
        });
    }
    phoneHandler = (e) => {
        this.setState({
            phoneNumber: e.target.value
        });
    }
    aboutHandler = (e) => {
        this.setState({
            aboutMe: e.target.value
        });
    }
    cityHandler = (e) => {
        this.setState({
            city: e.target.value
        });
    }
    countryHandler = (e) => {
        this.setState({
            country: e.target.value
        });
    }
    companyHandler = (e) => {
        this.setState({
            company: e.target.value
        });
    }
    schoolHandler = (e) => {
        this.setState({
            school: e.target.value
        });
    }
    hometownHandler = (e) => {
        this.setState({
            hometown: e.target.value
        });
    }
    languageHandler = (e) => {
        this.setState({
            language: e.target.value
        });
    }
    genderHandler = (e) => {
        this.setState({
            gender: e.target.value
        });
    }

    // submitHandler = (e) => {
    //   e.preventDefault();
    //   const data = {
    //     profileImage: this.state.profileImage,
    //     phoneNumber: this.state.phoneNumber,
    //     aboutMe: this.state.aboutMe,
    //     city: this.state.city,
    //     country: this.state.country,
    //     company: this.state.company,
    //     school: this.state.school,
    //     hometown: this.state.hometown,
    //     language: this.state.language,
    //     gender: this.state.gender
    //   }
    //   axios.post(`http://localhost:3001/profile/edit?userID=${Cookies.get('userID')}`,data)
    //   .then((response) => {
    //     if(response.status=== 200){
    //       alert("Profile Updated");
    //       this.props.history.push("/profile");
    //     }
    //     else if(response.status=== 400){
    //       alert("Sorry, could not update!");
    //       this.props.history.push("/profile");
    //     }
    //   });
    // }

    // componentDidMount() {
    //   axios.get(`http://localhost:3001/profile?userID=${Cookies.get('userID')}`)
    //     .then((response) => {
    //       console.log(response);
    //       this.setState({
    //         profileImage: response.data.profileImage,
    //     phoneNumber: response.data.phoneNumber,
    //     aboutMe: response.data.aboutMe,
    //     city: response.data.city,
    //     country: response.data.country,
    //     company: response.data.company,
    //     school: response.data.school,
    //     hometown: response.data.hometown,
    //     language: response.data.language,
    //     gender: response.data.gender

    //       });
    //     });
    // }

    async submit(e) {
        e.preventDefault();
        let {
            name,
            aboutMe,
            phoneNumber,
            language,
            hometown,
            gender,
            city,
            company,
            country,
            school
        } = this.state;
        let res = await this.props.updateProfileMutation({
            variables: {
                name,
                aboutMe,
                phoneNumber,
                language,
                hometown,
                gender,
                company,
                city,
                country,
                school,
                uid: cookie.load('cookie').email
            },
        });
        await this.setState({
            ...res.data.profileUpdate
        })
        this.cancel();
        //  this.props.onEditProfile(obj);
    }

    cancel = () => {
        this.props.onEditSwitch(0);
    }
    editon = () => {
        this.setState({
            ...this.props.profile
        })
        this.props.onEditSwitch(1);
    }
    handleFile = (e) => {
        this.setState({
            message: "",
            file: e.target.files[0]
        })
    }
    changeHandlerCommon(property, e) {
        this.setState({
            [property]: e.target.value
        })
    }
    changeHandlerRadio = (e) => {
        this.setState({
            gender: e.target.value
        });
    }



    render() {

        return ( <
            div >
            <
            Navbar / >
            <
            Header title = "Edit Profile" / >
            <
            div className = "pageContent" >
            <
            div className = "row" >
            <
            div className = "col-3 profilecolumn" >
            <
            /div> <
            div className = "col-6 editprofilecolumn" >
            <
            h4 > Update Profile < /h4><br/ >
            <
            form onSubmit = { this.submitHandler } >
            <
            table align = "center" >
            <
            tbody >
            <
            tr >
            <
            td > Profile Picture: < /td> <
            td > < input type = "text"
            name = "profileImage"
            placeholder = "image url"
            onChange = { this.imageHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > Contact Number: < /td> <
            td > < input type = "text"
            name = "phoneNumber"
            placeholder = "0123456789"
            pattern = "\d{10}"
            title = "Enter a valid contact number."
            onChange = { this.phoneHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > About Me: < /td> <
            td > < input type = "text"
            name = "aboutMe"
            onChange = { this.aboutHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > City: < /td> <
            td > < input type = "text"
            name = "city"
            onChange = { this.cityHandler }
            />{this.state.city}</td >
            <
            /tr> <
            tr >
            <
            td > Country: < /td> <
            td > < input type = "text"
            name = "country"
            onChange = { this.countryHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > Company: < /td> <
            td > < input type = "text"
            name = "company"
            onChange = { this.companyHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > School: < /td> <
            td > < input type = "text"
            name = "school"
            onChange = { this.schoolHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > Hometown: < /td> <
            td > < input type = "text"
            name = "hometown"
            onChange = { this.hometownHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > Language: < /td> <
            td > < input type = "text"
            name = "language"
            onChange = { this.languageHandler }
            /></td >
            <
            /tr> <
            tr >
            <
            td > Gender: < /td> <
            td >
            <
            label >
            <
            input type = "radio"
            name = "gender"
            value = "Male"
            onChange = { this.genderHandler }
            checked = { this.state.gender === "Male" }
            />
            Male & nbsp; < /label> <
            label >
            <
            input type = "radio"
            name = "gender"
            value = "Female"
            onChange = { this.genderHandler }
            checked = { this.state.gender === "Female" }
            />
            Female & nbsp; < /label> <
            label >
            <
            input type = "radio"
            name = "gender"
            value = "Other"
            onChange = { this.genderHandler }
            checked = { this.state.gender === "Other" }
            />
            Other & nbsp; < /label> <
            /td> <
            /tr> <
            tr > < td > < br / > < /td></tr >
            <
            tr >
            <
            td > < /td> <
            td > < input type = "submit"
            value = "Update"
            className = "button2"
            onClick = { this.submitHandler }
            />&nbsp; <
            Link to = "/profile" > < button className = "button2" > Cancel < /button></Link >
            <
            /td> <
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

export default Editprofile