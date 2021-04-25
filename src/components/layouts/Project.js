import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Project = () => {
    const [projectData, setProjectData] = useState(null);
    const [team, setTeam] = useState([]);
    const [transaction, setTransactions] = useState([])
    const projectId = useLocation().pathname.replace("/project/","");
    useEffect(() => {
        axios.get(`http://localhost:3001/api/project/${projectId}`).then((res)=> {
            setProjectData(res.data[0])
            axios.get(`http://localhost:3001/api/members/${res.data[0].name}`).then((res)=>{
                console.log(res.data)
                setTeam(res.data)
            })
        })
        axios.get(`http://localhost:3001/api/transactions`).then((res) => {
                setTransactions(res.data)
            })
        
    }, [projectId])
    const memberDetails = (member) => {
        const payList = transaction.filter((tran) => tran.member_id === member.member_id && tran.project_name === projectData.name)
        const payPerInterval = member.pay/payList.length
        console.log(payList)
        console.log(payPerInterval)
        return (
            <div className="memberDetails">
                <h2>{member.name}</h2>
                <h3>{member.role}</h3>
                <h3>Php {member.pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</h3>
                <h4>Php {payPerInterval.toFixed(2)}/{member.pay_interval}</h4>
            </div>
        )
    }
    return(
        <div className="Project">
            <div className="Project__header">
                <h1>{projectData !== null ? projectData.name : 'Loading'}</h1>
            </div>
            <div className="Project__main">
                <div className="Project__main__member">
                    <h2>Team</h2>
                    {team.length > 0 ? team.map((member) => {
                        return memberDetails(member)
                    }): ''}
                </div>
                <div className="Project__main__summary">
                    <div className="Project__main__summary__container">
                        <h2>Total Cost</h2>
                        <h3>Php {projectData !== null ? projectData.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}</h3>
                        <div className="Project__main__summary__container__members">
                            <img 
                                src="/images/human.png"
                                alt="members"
                            />
                            <p> {projectData !== null ? projectData.member_count : ''} member/s</p>
                        </div>
                        <div className="Project__main__summary__container__dates">
                            <p>Start Date: {projectData !== null ? moment(projectData.start_date).add(1, 'day').format("MMMM DD, YYYY") : ''}</p>
                            <p>End Date: {projectData !== null ? moment(projectData.end_date).add(1, 'day').format("MMMM DD, YYYY") : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;