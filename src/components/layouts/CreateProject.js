import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Member from '../reuseable/Member';
import axios from 'axios';


const CreateProject = () => {
    const [title, setTitle] = useState('')
    const [team, setTeam] = useState([]);
    const [personel, setPersonel] = useState([]);
    const [activeAddMem, setActiveAddMem] = useState(null);
    const [show, setShow] = useState(false);
    const [role, setRole] = useState('');
    const [payment, setPayment] = useState(0);
    console.log(team)
    const handleAdd = () => {
        let newItem
        if (activeAddMem !== null && role.length > 0 && payment.length > 0){
            newItem = {
                entity: activeAddMem,
                role: role,
                pay: payment,
            }
            setTeam([...team, newItem])
            setRole('');
            setPayment(0);
            setActiveAddMem(null)
        }
        else{
            console.log('kulang')
        }
    }
    const handleSubmit = () => {
        const newTeam = team.map((mem)=> {
            return {id: mem.entity.id, name: mem.entity.name, role: role, pay:payment}
        })
        axios.post('http://localhost:3001/api/project', {title: title, team:newTeam}).then(()=>{
        console.log('success')
        })
    }
    const totalCost = () => {
        if (team.length > 0){
            let tCost = 0;
            team.forEach((member)=>{
                tCost += parseInt(member.pay)
            })
            return tCost;
        }
        return 0
    }
    useEffect(() => {
        axios.get('http://localhost:3001/api/members').then((res)=>{
            setPersonel(res.data);
        })
    }, [])
    return(
        <div className="CreateProject">
            <div className="CreateProject__main">
                <div className="CreateProject__main__summary">
                        <input 
                            type="textbox" 
                            value={title}
                            placeholder="Project Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <h3>Total Cost: Php {totalCost()}</h3>
                        <p>Start Date:</p> <input type="date"></input>
                        <p>End Date:</p> <input type="date"></input>
                        <p> {team.length} members</p>
                        <button onClick={()=> handleSubmit()}>Save</button>
                    </div>
                <div className="CreateProject__main__member">
                    <h2>Team</h2>
                    {team.map((member) => {
                        return <Member member={member} team={team} setTeam={setTeam}/>
                    })}
                </div>
                <div className="CreateProject__main__add">
                        <h2>Add Personal</h2>
                        <div className="CreateProject__main__add__row">
                            <h4>Name:</h4>
                            {activeAddMem !== null ? <h4>{activeAddMem.name}</h4>:<button onClick={() => setShow(true)}>+</button>}
                            
                        </div>
                        <div className="CreateProject__main__add__row">
                            <h4>Role:</h4>
                            <input 
                                id="role"
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <div className="CreateProject__main__add__row">
                            <h4>Total Pay:</h4>
                            <input 
                                id="pay"
                                type="number"
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                            />
                        </div>
                        <div className="CreateProject__main__add__row">

                            <label>
                                <input id="daily" type="radio" name="pay_date"/>
                                {' '}Daily
                            </label>

                            <label>
                                <input id="weekly" type="radio" name="pay_date"/>
                                {' '}Weekly
                            </label>

                            <label>
                                <input id="yearly" type="radio" name="pay_date"/>
                                {' '}Yearly
                            </label>
                        </div>
                        <button onClick={()=> handleAdd()}>Add</button>
                </div>
            </div>
            <Modal 
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4>{personel.length} people</h4>
                    <input type="text" placeholder="search for name"></input>
                    <div className="CreateProject__Employeelist">
                    <ul>
                        {personel.map((tm)=> {
                            return <li onClick={()=> {
                                setActiveAddMem(tm)
                                setShow(false)
                            }}>{tm.name}</li>
                        })}
                    </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CreateProject;