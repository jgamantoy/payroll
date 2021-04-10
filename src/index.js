import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './components/layouts/Projects';
import Navbar from './components/reuseable/Navbar';
class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Navbar />
                <Projects />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))