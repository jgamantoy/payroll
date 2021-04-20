import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import ProjectsTab from './components/layouts/ProjectsTab';
import Project from './components/layouts/Project';
import CreateProject from './components/layouts/CreateProject';
import TeamTab from './components/layouts//TeamTab';
import Navbar from './components/reuseable/Navbar';

import './scss/index.scss'
class App extends React.Component{
    render(){
        return (
            <Router>
                <div className="App">
                <Navbar />
                    <Switch>
                    <Route exact path="/" component={ProjectsTab} />
                    <Route path="/project" component={Project}/>
                    <Route exact path="/create_project" component={CreateProject} />
                    <Route exact path="/team" component={TeamTab} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))