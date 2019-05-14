import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Person.css';

export class Person extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            course_id: "",
            action:""
        }
        this.removeClick = this.removeClick.bind(this);
        this.enrollClick = this.enrollClick.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    enrollClick = (e)=>{
        this.setState({
            id: this.props.id,
            course_id: this.props.course_id,
            action: "enroll"
        });
    }
    removeClick = (e)=>{
        this.setState({
            id: this.props.id,
            course_id: this.props.course_id,
            action: "remove"
        });
    }

    submitHandler = (e)=>{
        e.preventDefault();
        const data = {
            id: this.state.id,
            course_id: this.state.course_id,
            action: this.state.action
        };
        axios.post(`http://localhost:3001/course/${this.props.course_id}/people`,data)
        .then((result)=>{
            if(result.data.message==="error"){
                alert("Something went wrong.")
            }
            else if(result.data.message==="success"){
                if(result.data.code){
                    alert("Permission Code: "+ result.data.code);
                }
                else{
                    alert("Action Performed.");
                }
                window.location.reload();
            }
        });
    }

  render() {
    return (
      <div className="persontab">
        <div className="row">
            <div className="col-2 imagecol">
                {(this.props.image===null || this.props.image === "")
                ?<img src="https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg" alt="profilepicture" className="personimage" />
                :<img src={this.props.image} alt="profilepicture" className="personimage"/>}
            </div>
            <div className="col-8 namecol">
                <h6>{this.props.name}</h6>
            </div>
            <div className="col-2 statcol">
                {(Cookies.get('role')==="faculty")
                ?(this.props.stat==="enroll")
                    ?<form onSubmit={this.submitHandler}><button className="button" onClick={this.removeClick}>REMOVE</button></form>
                    :<form onSubmit={this.submitHandler}><button className="button" onClick={this.enrollClick}>ENROLL</button></form>
                :<span></span>
                }
            </div>
        </div>
      </div>
    )
  }
}

export default Person
