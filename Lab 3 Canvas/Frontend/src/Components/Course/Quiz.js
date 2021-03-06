import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';

export class Quiz extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      course_id: this.props.match.params.id,
      quizzes:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.course_id}/quiz`)
    .then((response)=>{
      if(response.data.message==="error"){
        alert("Something went wrong.");
        this.props.history.push(`http://localhost:3001/course/${this.state.course_id}`);
      }
      else if(response.data.message==="success"){
        this.setState({
          quizzes: response.data.data
        })
      }
    })
  }

  render() {
    let quizzes = [];
    Object.assign(quizzes, this.state.quizzes);
    return (
      <div>
        <Navbar />
        <Header title={this.state.course_id} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu course_id={this.state.course_id} /></div>
            <div className="col-9 coursecolumn">
              <h3>Quiz</h3><br/>
              <div>
                {quizzes.map((quiz,index)=>{
                  return <div className="quiztab" key={index}><Link to={`/course/${this.state.course_id}/quiz/${quiz.quiz_id}`}>{quiz.quiz_id} - {quiz.quiz_name}</Link></div>
                })}
              </div>
              {(Cookies.get("role")==="faculty")
              ?<Link to={`/course/${this.state.course_id}/quiz/new`}><button className="btn btn-primary">New Quiz</button></Link>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Quiz
