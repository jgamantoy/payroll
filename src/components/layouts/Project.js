import React from 'react';
import Member from '../reuseable/Member';

const Project = () => {
    const testArray = [1,2,3]
    return(
        <div className="Project">
            <div className="Project__header">
                <h1>Project Title</h1>
            </div>
            <div className="Project__main">
                <div className="Project__main__member">
                    <h2>Members</h2>
                    {testArray.map(() => {
                        return <Member />
                    })}
                </div>
                <div className="Project__main__summary">
                    <div className="Project__main__summary__container">
                        <h2>Total Cost</h2>
                        <h3>Php 12,000</h3>
                        <p>Start Date</p>
                        <p>End Date</p>
                        <p> 10 members</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;