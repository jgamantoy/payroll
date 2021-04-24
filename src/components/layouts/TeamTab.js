import React, { useEffect, useState } from 'react';
import AddPersonelModal from './AddPersonelModal';
import EditPersonel from './EditPersonel';
import axios from 'axios';


const TeamTab = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [teamMembers, setTeamMembers] = useState([])
    const [filteredMembers, setFilteredMembers] = useState([])
    const [activePersonel, setActivePersonel] = useState(null)
    const [filter, setFilter] = useState('')
    const [updateStatus, setUpdateStatus] = useState('off')

    const reload = () => window.location.reload();
    
    const deleteMember = () => {
        axios.delete(`http://localhost:3001/api/delete/${activePersonel.id}`).then(()=> {
        })
        const newArray = teamMembers.filter((mem)=> mem.name !== activePersonel.name)
        setTeamMembers(newArray);
        setActivePersonel(null);
    }

    useEffect(()=>{
        axios.get('http://localhost:3001/api/members').then((res) => {
            console.log(res.data)
            setTeamMembers(res.data);
            setFilteredMembers(res.data);
        })
    }, [])
    useEffect(() => {
        let filteredTeam = teamMembers.filter((tm) => tm.name.toLowerCase().includes(filter.toLowerCase()))
        setFilteredMembers(filteredTeam)
    }, [filter])
    return (
        <div className="TeamTab">
            <div className="TeamTab__list">
                <h2>Personel</h2>
                <div className="TeamTab__list__container">
                    <h4>{teamMembers.length} people</h4>
                    <input 
                        type="text" 
                        value={filter}
                        placeholder="search for name" 
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div className="TeamTab__list__container__names">
                    <ul>
                        {filteredMembers.map((tm)=> {
                            return <li onClick={()=>setActivePersonel(tm)}>{tm.name}</li>
                        })}
                    </ul>
                    </div>
                </div>
            </div>
            <div className="TeamTab__desc">
                { updateStatus === "off" ? 
                    <div className="TeamTab__desc__container">

                        <h2>{activePersonel !== null ? activePersonel.name : 'Name'}</h2>
                        <h4>Contact no: {activePersonel !== null ? activePersonel.contact : ''}</h4>
                        <h4>Address: {activePersonel !== null ? activePersonel.email : ''}</h4>
                        <h4>Pay Method: {activePersonel !== null ? activePersonel.pay_method : ''}</h4>
                        {activePersonel ? 
                            <div className="TeamTab__desc__container__buttons">
                                <button onClick={() => setUpdateStatus("on")}>Edit</button>
                                <button onClick={() => deleteMember()}>Delete</button>
                            </div> :
                            ""
                        }

                    </div>
                :   <div className="TeamTab__desc__container">
                        <EditPersonel 
                            activePersonel={activePersonel}                    
                            teamMembers={teamMembers} 
                            setTeamMembers={(a) => setTeamMembers(a)} 
                            setUpdateStatus={(a) => setUpdateStatus(a)}
                            setActivePersonel={(a) => setActivePersonel(a)}
                        />
                    </div>                   
                }
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