import React from 'react';
import Navbar from '../reuseable/Navbar';

const Home = () => {
    
    const projectCondensed = () => {
        return(
            <div className="projectCondensed">
                <h2>Project Title</h2>
                <h4>Due date: Sept. 13, 2021</h4>
            </div>
        )
    }
    return (
        <div className="Home">
            <Navbar />
            <div className="Home__main">
                
                <div className="Home__main__left">
                    <h2>Projects</h2>
                    <h3>2 projects</h3>
                    <div className="Home__main__left__projects">
                        {[1,2].map(()=> {
                            return projectCondensed()
                        })}
                    </div>
                </div>
                <div className="Home__main__right">
                    <div className="Home__main__right__costs">
                        <h2> Total Cost</h2>
                        <h4> $100,000</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home