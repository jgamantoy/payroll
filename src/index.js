import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ProjectsTab from './components/layouts/ProjectsTab';
import Project from './components/layouts/Project';
import CreateProject from './components/layouts/CreateProject';
import TeamTab from './components/layouts//TeamTab';
import Navbar from './components/reuseable/Navbar';
class App extends React.Component{
    render(){
        return (
            <Router>
                <div className="App">
                <Navbar />
                    <Switch>
                    <Route exact path="/" component={ProjectsTab} />
                    <Route path="/project" component={Project}/>
                    <Route path="/create_project" component={CreateProject} />
                    <Route path="/team" component={TeamTab} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))