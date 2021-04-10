import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layouts/Home';

class App extends React.Component{
    render(){
        return (
            <div>
                <Home />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))