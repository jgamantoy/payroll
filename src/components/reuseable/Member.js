import React from 'react';

const Member = (props) => {
    const {member, team, setTeam} = props;
    const handleDelete = () => {
        const newTeam = team.filter((mem) => mem.entity.id !== member.entity.id)
        setTeam(newTeam);
    }

    return (
        <div className="Member">
            <div className="Member__details">
                <h3>{member? member.entity.name: ''}</h3>
                <h4>{member ? member.role : ''}</h4>
                <p>Php {member ? member.pay: ''}/m</p>
            </div>
            <div className="Member__image">
            </div>
            <div className="Member__exit">
                <img 
                    src="/images/black_x.png"
                    alt="exit"
                    onClick={() => handleDelete()}
                />
            </div>
        </div>
    )
}

export default Member;