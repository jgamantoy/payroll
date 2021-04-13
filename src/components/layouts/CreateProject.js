import React from 'react';
import Member from '../reuseable/Member';

const CreateProject = () => {
    const testArray = [1,2,3]
    return(
        <div className="CreateProject">
            <div className="CreateProject__main">
                <div className="CreateProject__main__summary">
                        <input type="textbox" placeholder="Project Title"/>
                        <h3>Total Cost: Php 12,000</h3>
                        <p>Start Date:</p>
                        <p>End Date:</p>
                        <p> 10 members</p>
                    </div>
                <div className="CreateProject__main__member">
                    <h2>Team</h2>
                    {testArray.map(() => {
                        return <Member />
                    })}
                </div>
                <div className="CreateProject__main__add">
                        <h2>Add Personal</h2>
                        <div className="CreateProject__main__add__row">
                            <h4>Name: +</h4>
                        </div>
                        <div className="CreateProject__main__add__row">
                            <h4>Role:</h4>
                            <input type="text"/>
                        </div>
                        <div className="CreateProject__main__add__row">
                            <h4>Payment:</h4>
                            <input type="number"/>
                        </div>
                        <div className="CreateProject__main__add__row">
                            <input type="radio" name="pay_date" />
                            <label>Daily</label>
                            <input type="radio" name="pay_date" />
                            <label>Weekly</label>
                            <input type="radio" name="pay_date" />
                            <label>Monthly</label>
                        </div>
                        <button>Add</button>

                </div>
            </div>
        </div>
    )
}

export default CreateProject;