import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';

export class Quizinfo extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            course_id: this.props.match.params.id,
            quiz_id: this.props.match.params.quiz_id,
            quiz:"",
            ans1: "",
            ans2: ""
        }
        this.ans1Handler = this.ans1Handler.bind(this);
        this.ans2Handler = this.ans2Handler.bind(this);
        this.submithandler = this.submithandler.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/course/${this.state.course_id}/quiz/${this.state.quiz_id}`)
        .then((response)=>{
            // console.log(response.data);
            this.setState({
                quiz: response.data.data
            })
        });
    }

    ans1Handler = (e)=>{
        this.setState({
            ans1: e.target.value
        })
    }
    ans2Handler = (e)=>{
        this.setState({
            ans2: e.target.value
        })
    }
    submithandler = (e)=>{
        e.preventDefault();
        const data = {
            ans1: this.state.ans1,
            ans2: this.state.ans2
        }
        axios.post(`http://localhost:3001/course/${this.state.course_id}/quiz/${this.state.quiz_id}`,data)
        .then((response)=>{
            if (response.data.message === "error") {
                alert("Something went wrong.")
                this.props.history.push(`/course/${this.state.course_id}/quiz`);
            }
            else if (response.data.message === "success") {
                alert("Score: "+response.data.data)
                this.props.history.push(`/course/${this.state.course_id}/quiz`);
            }
        })
    }

    render() {
        let q = {};
        Object.assign(q,this.state.quiz);
        return (
            <div>
                <Navbar />
                <Header title={this.state.course_id} />
                <div className="pageContent">
                    <div className="row">
                        <div className="col-3 menucolumn"><Menu course_id={this.state.course_id} /></div>
                        <div className="col-9 coursecolumn">
                            <h3>{this.state.quiz_id} - {q.quiz_name}</h3><br />
                            <div>
                                <form onSubmit={this.submithandler}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{q.ques1}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="a" onChange={this.ans1Handler} checked={this.state.ans1==="a"} required/></label>&nbsp;{q.opt11}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="b" onChange={this.ans1Handler} checked={this.state.ans1==="b"} /></label>&nbsp;{q.opt12}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="c" onChange={this.ans1Handler} checked={this.state.ans1==="c"} /></label>&nbsp;{q.opt13}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="d" onChange={this.ans1Handler} checked={this.state.ans1==="d"} /></label>&nbsp;{q.opt14}</td>
                                        </tr><tr><td><br/></td></tr>
                                        <tr>
                                            <td>{q.ques2}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="a" onChange={this.ans2Handler} checked={this.state.ans2==="a"} required/></label>&nbsp;{q.opt21}</td>
                                        </tr>   
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="b" onChange={this.ans2Handler} checked={this.state.ans2==="b"} /></label>&nbsp;{q.opt22}</td>
                                        </tr>   
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="c" onChange={this.ans2Handler} checked={this.state.ans2==="c"} /></label>&nbsp;{q.opt23}</td>
                                        </tr>   
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="d" onChange={this.ans2Handler} checked={this.state.ans2==="d"} /></label>&nbsp;{q.opt24}</td>
                                        </tr> <tr><td><br/></td></tr>
                                        {(Cookies.get('role')==='student')?<tr><td><button type="submit" name="submit" className="btn btn-primary" >Submit</button></td></tr>:null}
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

export default Quizinfo
