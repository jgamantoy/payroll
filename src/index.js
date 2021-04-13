import React from 'react';
import ReactDOM from 'react-dom';

import ProjectsTab from './components/layouts/ProjectsTab';
import Project from './components/layouts/Project';
import Navbar from './components/reuseable/Navbar';
class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Navbar />
                {/* <ProjectsTab /> */}
                <Project />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))