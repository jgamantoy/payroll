import React from 'react';
import ReactDOM from 'react-dom';

import ProjectsTab from './components/layouts/ProjectsTab';
import Project from './components/layouts/Project';
import CreateProject from './components/layouts/CreateProject';
import TeamTab from './components/layouts//TeamTab';
import Navbar from './components/reuseable/Navbar';
class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Navbar />
                {/* <ProjectsTab /> */}
                {/* <Project /> */}
                {/* <CreateProject /> */}
                <TeamTab />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))