import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Quiznew.css'

export class Quiznew extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      course_id: this.props.match.params.id,
      quiz_id:"",
      quiz_name:"",
      ques1: "",
      opt11: "",
      opt12: "",
      opt13: "",
      opt14: "",
      right1: "",
      ques2: "",
      opt21: "",
      opt22: "",
      opt23: "",
      opt24: "",
      right2: "",
      date1: "",
      date2: ""
    }

    this.qidHandler = this.qidHandler.bind(this);
    this.qnameHandler = this.qnameHandler.bind(this);
    this.q1Handler = this.q1Handler.bind(this);
    this.op11Handler = this.op11Handler.bind(this);
    this.op12Handler = this.op12Handler.bind(this);
    this.op13Handler = this.op13Handler.bind(this);
    this.op14Handler = this.op14Handler.bind(this);
    this.cor1Handler = this.cor1Handler.bind(this);
    this.q2Handler = this.q2Handler.bind(this);
    this.op21Handler = this.op21Handler.bind(this);
    this.op22Handler = this.op22Handler.bind(this);
    this.op23Handler = this.op23Handler.bind(this);
    this.op24Handler = this.op24Handler.bind(this);
    this.cor2Handler = this.cor2Handler.bind(this);
    this.d1Handler = this.d1Handler.bind(this);
    this.d2Handler = this.d2Handler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  qidHandler = (e)=>{
    this.setState({
        quiz_id: e.target.value
    })
  }
  qnameHandler = (e)=>{
    this.setState({
        quiz_name: e.target.value
    })
  }
  q1Handler = (e)=>{
      this.setState({
          ques1: e.target.value
      })
  }
  op11Handler = (e)=>{
      this.setState({
          opt11: e.target.value
      })
  }
  op12Handler = (e)=>{
      this.setState({
          opt12: e.target.value
      })
  }
  op13Handler = (e)=>{
      this.setState({
          opt13: e.target.value
      })
  }
  op14Handler = (e)=>{
      this.setState({
          opt14: e.target.value
      })
  }
  cor1Handler = (e)=>{
      this.setState({
          right1: e.target.value
      })
  }
  q2Handler = (e)=>{
      this.setState({
          ques2: e.target.value
      })
  }
  op21Handler = (e)=>{
      this.setState({
          opt21: e.target.value
      })
  }
  op22Handler = (e)=>{
      this.setState({
          opt22: e.target.value
      })
  }
  op23Handler = (e)=>{
      this.setState({
          opt23: e.target.value
      })
  }
  op24Handler = (e)=>{
      this.setState({
          opt24: e.target.value
      })
  }
  cor2Handler = (e)=>{
      this.setState({
          right2: e.target.value
      })
  }
  d1Handler = (e)=>{
      this.setState({
          date1: e.target.value
      })
  }
  d2Handler = (e)=>{
      this.setState({
          date2: e.target.value
      })
  }

  submitHandler = (e)=>{
      e.preventDefault();
      const data = {
          quiz_id : this.state.quiz_id,
          quiz_name : this.state.quiz_name,
          ques1 : this.state.ques1,
          opt11 : this.state.opt11,
          opt12 : this.state.opt12,
          opt13 : this.state.opt13,
          opt14 : this.state.opt14,
          right1 : this.state.right1,
          ques2 : this.state.ques2,
          opt21 : this.state.opt21,
          opt22 : this.state.opt22,
          opt23 : this.state.opt23,
          opt24 : this.state.opt24,
          right2 : this.state.right2,
          date1 : this.state.date1,
          date2 : this.state.date2,
      }
      axios.post(`http://localhost:3001/course/${this.state.course_id}/quiz/new`,data)
      .then((response)=>{
          console.log(response.data);
          if(response.data.message==="error"){
              alert("Something went wrong.")
              this.props.history.push(`/course/${this.state.course_id}/quiz`);
          }
          else if(response.data.message==="success"){
              alert("Quiz published.")
              this.props.history.push(`/course/${this.state.course_id}/quiz`);
          }
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Header title={this.state.course_id} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu course_id={this.state.course_id} /></div>
            <div className="col-9 coursecolumn">
              <h3>Create Quiz</h3><br />
              <p>Enter details and choose correct option for each question.</p>
              <div>
                  <form onSubmit={this.submitHandler}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Quiz ID</td>
                                <td>: <input type="text" name="quiz_id" onChange={this.qidHandler} required/></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>: <input type="text" name="quiz_name" onChange={this.qnameHandler} required/></td>
                            </tr><tr><td><br/></td></tr>
                            <tr>
                                <td>Question 1</td>
                                <td>: <input type="text" name="ques1" className="quizquestion" onChange={this.q1Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option A&nbsp;<input type="radio" name="ans1" value="a" onChange={this.cor1Handler} checked={this.state.right1==="a"} required /></label></td>
                                <td>: <input type="text" name="opt11" onChange={this.op11Handler} required /></td>
                                <td><label>Option B&nbsp;<input type="radio" name="ans1" value="b" onChange={this.cor1Handler} checked={this.state.right1==="b"} /></label></td>
                                <td>: <input type="text" name="opt12" onChange={this.op12Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option C&nbsp;<input type="radio" name="ans1" value="c" onChange={this.cor1Handler} checked={this.state.cor1==="c"} /></label></td>
                                <td>: <input type="text" name="op13" onChange={this.op13Handler} required /></td>
                                <td><label>Option D&nbsp;<input type="radio" name="ans1" value="d" onChange={this.cor1Handler} checked={this.state.cor1==="d"} /></label></td>
                                <td>: <input type="text" name="opt14" onChange={this.op14Handler} required /></td>
                            </tr>
                            <tr>
                                <td>Question 2</td>
                                <td>: <input type="text" name="ques2" className="quizquestion" onChange={this.q2Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option A&nbsp;<input type="radio" name="ans2" value="a" onChange={this.cor2Handler} checked={this.state.right2==="a"} required /></label></td>
                                <td>: <input type="text" name="opt21" onChange={this.op21Handler} required /></td>
                                <td><label>Option B&nbsp;<input type="radio" name="ans2" value="b" onChange={this.cor2Handler} checked={this.state.right2==="b"} /></label></td>
                                <td>: <input type="text" name="opt22" onChange={this.op22Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option C&nbsp;<input type="radio" name="ans2" value="c" onChange={this.cor2Handler} checked={this.state.right2==="c"} /></label></td>
                                <td>: <input type="text" name="opt23" onChange={this.op23Handler} required /></td>
                                <td><label>Option D&nbsp;<input type="radio" name="ans2" value="d" onChange={this.cor2Handler} checked={this.state.right2==="d"} /></label></td>
                                <td>: <input type="text" name="opt24" onChange={this.op24Handler} required /></td>
                            </tr><tr><td><br/></td></tr>
                            <tr>
                                <td>Available from</td>
                                <td>: <input type="date" name="date1" onChange={this.d1Handler} required /></td>
                                <td>Available till</td>
                                <td>: <input type="date" name="date2" onChange={this.d2Handler} required /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>&nbsp;&nbsp;<button type="submit" name="publish" className="btn btn-primary" >Publish</button></td>
                            </tr>
                        </tbody>
                    </table>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Quiznew
