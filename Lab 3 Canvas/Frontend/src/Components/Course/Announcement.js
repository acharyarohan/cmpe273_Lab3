import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Announcement.css';

export class Announcement extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      course_id: this.props.match.params.id,
      anns:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.course_id}/announcement`)
    .then((result)=>{
      // console.log(result);
      this.setState({
        anns: result.data.data
      })
    });
  }

  render() {
    let anns = [];
    Object.assign(anns,this.state.anns);
    return (
      <div>
        <Navbar />
        <Header title={this.state.course_id} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu course_id={this.state.course_id} /></div>
            <div className="mycol">
              <h3>Announcements</h3><br />
              <div>
              {anns.map((ann,index)=>{
                return <div key={index} className="allanns">
                <Link to={`/course/${this.state.course_id}/announcement/${ann.aname}`}><span className="anntitle">{ann.aname}</span></Link><span className="anntime">{ann.atime}</span><br/>
                {ann.adesc.substring(0,100)+"..."}
                </div>
              })}
              </div>
              {(Cookies.get('role')==="faculty")
              ?<Link to={`/course/${this.state.course_id}/announcement/new`}><button className="btn btn-primary">New Announcement</button></Link>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Announcement
