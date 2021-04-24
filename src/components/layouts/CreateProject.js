import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment'
import Member from '../reuseable/Member';
import axios from 'axios';

const CreateProject = () => {
    const [title, setTitle] = useState('')
    const [team, setTeam] = useState([]);
    const [personel, setPersonel] = useState([]);
    const [activeAddMem, setActiveAddMem] = useState(null);
    const [show, setShow] = useState(false);
    const [role, setRole] = useState('');
    const [payInterval, setPayInterval] = useState(null)
    const [payment, setPayment] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [ endDate, setEndDate ] = useState('');

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
    const validateDates = () => {
        if(startDate.length > 0 && endDate.length > 0){
            const currentDate = moment(new Date()).format("YYYY-MM-DD");
            if (endDate > startDate && startDate >= currentDate){
                console.log('got it')
                return true
            }
            console.log('mali part two')
            return false
        }
        return false
    }
    const validatePay = () => {
        // console.log(parseInt(payment))
        // console.log(payment.split(" ").split(",").join(''))
        console.log(parseInt(payment.split(",").join('')))
        if (Number.isInteger(parseInt(payment.split(",").join('')))){
            console.log('it is a number')
            return true 
        }
            console.log('it is not a number')
            return false
    }   
    const handleAdd = () => {
        let newItem
        if (activeAddMem !== null && role.length > 0 && validatePay() && payInterval !== null){
            newItem = {
                entity: activeAddMem,
                role: role,
                pay: parseInt(payment.split(",").join('')),
                payInterval: payInterval,
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
            return {id: mem.entity.id, name: mem.entity.name, role: mem.role, pay:mem.pay, pay_interval: mem.payInterval}
        })
        if (validateDates() && title.length > 0 && team.length > 0){
            axios.post(`http://localhost:3001/api/project/${title}`, 
            {
                title: title, 
                team:newTeam, 
                start_date: moment(startDate)._d, 
                end_date: moment(endDate)._d,
                total_cost: totalCost(),
                member_count: newTeam.length
            }).then(()=>{})
            setTimeout(() => { window.location.assign('/') }, 3000);
        } else {
            if (startDate === ""){
                alert('Please add start date')
            }
            if (endDate === "") {
                alert('Please add end date')
            }
            if (title.length === 0) {
                alert('Please add a title')
            }
            if (team.length === 0) {
                alert('Please add team members')
            }  
        }
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
                        <p>Start Date:</p> 
                        <input 
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <p>End Date:</p> 
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
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
                            {
                            activeAddMem !== null ? <h4>{activeAddMem.name}</h4>
                            : 
                            <button onClick={() => setShow(true)}>+</button>
                            }
                            
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
                                value={payment}
                                onChange={(e) => setPayment(e.target.value.split(" ").join(""))}
                            />
                        </div>
                        <div className="CreateProject__main__add__row">

                            <label>
                                <input id="daily" type="radio" name="pay_date" onClick={() => setPayInterval('day')}/>
                                {' '}Daily
                            </label>

                            <label>
                                <input id="weekly" type="radio" name="pay_date" onClick={() => setPayInterval('week')}/>
                                {' '}Weekly
                            </label>

                            <label>
                                <input id="monthly" type="radio" name="pay_date" onClick={() => setPayInterval('month')}/>
                                {' '}Monthly
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