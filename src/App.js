
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize = 12;
  apiKey = process.env.REACT_APP_NEWSAPP_API

  state = {
    progress: 0 //making state for progress and initalizing progress to 0
  }

  setProgress =(progress) => { //making function called setProgress
    this.setState({ progress: progress })
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={4}
            

          />
          <Switch>
            <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="business" pageSize={this.pageSize} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" /></Route>
            <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="health" pageSize={this.pageSize} country="in" category="health" /></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="science" pageSize={this.pageSize} country="in" category="science" /></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="sports" pageSize={this.pageSize} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey}   key="technology" pageSize={this.pageSize} country="in" category="technology" /></Route>
          </Switch>

        </div>
      </Router>

    )
  }
}


