import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Grade.css';

export class Grade extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      course_id: this.props.match.params.id,
      quizgrades:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.course_id}/grade`)
    .then((response)=>{
      this.setState({
        quizgrades : response.data.quiz
      })
    });
  }

  render() {
    let quizgrades = [];
    Object.assign(quizgrades, this.state.quizgrades);
    const isStudent = Cookies.get("role")==="student";
    return (
      <div>
        <Navbar />
        <Header title={this.state.course_id} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu course_id={this.state.course_id} /></div>
            <div className="mycol">
              <h3>Grades</h3><br/>
              <h5>Quiz</h5>
              {quizgrades.map((q, index)=>{
                // return <div key={index}>{q.student_id} {q.name} {q.quiz_name} {q.grade}<hr/></div>
                return <table key="index" className="quizgradetable"><tbody><tr>
                    {(!isStudent) ? <td className="quizgradetable1">{q.student_id}</td> :null }
                    {(!isStudent) ? <td className="quizgradetable2">{q.name}</td> :null }
                    <td className="quizgradetable3">{q.quiz_name}</td>
                    <td className="quizgradetable4">{q.grade}/2</td>
                  </tr></tbody></table>
              })}<br/>
              <h5>Assignments</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Grade
