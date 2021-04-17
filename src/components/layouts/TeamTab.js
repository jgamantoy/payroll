import React, { useEffect, useState, usseEffect } from 'react'
import AddPersonelModal from './AddPersonelModal'
import axios from 'axios';
const TeamTab = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [teamMembers, setTeamMembers] = useState([])
    const [activePersonel, setActivePersonel] = useState(null)
    const reload = () => window.location.reload();
    useEffect(()=>{
        axios.get('http://localhost:3001/api/members').then((res) => {
            setTeamMembers(res.data);
        })
    }, [])
    return (
        <div className="TeamTab">
            <div className="TeamTab__list">
                <h2>Personel</h2>
                <div className="TeamTab__list__container">
                    <h4>N people</h4>
                    <input type="text" placeholder="search for name"></input>
                    <div className="TeamTab__list__container__names">
                    <ul>
                        {teamMembers.map((tm)=> {
                            return <li onClick={()=>setActivePersonel(tm)}>{tm.name}</li>
                        })}
                    </ul>
                    </div>
                </div>
            </div>
            <div className="TeamTab__desc">
                <div class="TeamTab__desc__container">
                    <div className="TeamTab__desc__container__image" style={{height: '300px', width: '300px', backgroundColor: '#c4c4c4'}}>
                        image
                    </div>
                    <h2>{activePersonel !== null ? activePersonel.name : 'Name'}</h2>
                    <h4>Contact no: {activePersonel !== null ? activePersonel.phone_number : ''}</h4>
                    <h4>Address: {activePersonel !== null ? activePersonel.address : ''}</h4>
                </div>
                <AddPersonelModal 
                    show={isOpen} 
                    setIsOpen={(a) => setIsOpen(a)} 
                    teamMembers={teamMembers} 
                    setTeamMembers={(a) => setTeamMembers(a)} 
                    reload={reload}
                />
            </div>
            <div className="TeamTab__plus">
                <img
                src="/images/red_plus.png"
                alt="plus"
                onClick={()=> setIsOpen(true)}
                />
            </div>
        </div>
    )
}

export default TeamTab;