import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Profile from './Profile/Profile';
import Editprofile from './Profile/Editprofile';
import Course from './Course/Course';
import Coursecreate from './Course/Coursecreate';
import Search from './Course/search';
import Courseinfo from './Course/Courseinfo';
import People from './Course/People';
import Grade from './Course/Grade';
import File from './Course/File';
import Quiz from './Course/Quiz';
import Quizinfo from './Course/Quizinfo';
import Quiznew from './Course/Quiznew';
import Assignment from './Course/Assignment';
import Announcement from './Course/Announcement';
import Newannouncement from './Course/Newannouncement';
import Anninfo from './Course/Anninfo';

export class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/course" component={Course} />
        <Route exact path="/course/new" component={Coursecreate} />
        <Route exact path="/course/search" component={Search} />
        <Route exact path="/course/:id/home" component={Courseinfo} />
        <Route exact path="/course/:id/people" component={People} />
        <Route exact path="/course/:id/grade" component={Grade} />
        <Route exact path="/course/:id/quiz/new" component={Quiznew} />
        <Route exact path="/course/:id/quiz/:qid" component={Quizinfo} />
        <Route exact path="/course/:id/quiz" component={Quiz} />
        <Route exact path="/course/:id/file" component={File} />
        <Route exact path="/course/:id/announcement/new" component={Newannouncement} />
        <Route exact path="/course/:id/announcement/:aname" component={Anninfo} />
        <Route exact path="/course/:id/announcement" component={Announcement} />
        <Route exact path="/course/:id/assignment" component={Assignment} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={Editprofile} />
        <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

export default Main
