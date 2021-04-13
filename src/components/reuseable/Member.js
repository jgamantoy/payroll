import React from 'react';

const Member = () => {
    return (
        <div className="Member">
            <div className="Member__details">
                <h3>Name</h3>
                <h4>Role</h4>
                <p>Php 4,000/m</p>
            </div>
            <div className="Member__image">
            </div>
            <div className="Member__exit">
                <img 
                    src="/images/black_x.png"
                    alt="exit"
                />
            </div>
        </div>
    )
}

export default Member;