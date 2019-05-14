import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';
//import {Provider} from "react-redux";
import './App.css';

//import store from "./store";

class App extends Component {
  render() {
    return (
    //	<Provider store={store}>
    	//{}
      <BrowserRouter>
        <div>
        {}
          <Main />
        
        </div>
      </BrowserRouter>
     // </Provider>
    );
  }
}

export default App;
