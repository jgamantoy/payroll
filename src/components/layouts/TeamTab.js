import React, { useState } from 'react'
import AddPersonelModal from './AddPersonelModal'
const TeamTab = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="TeamTab">
            <div className="TeamTab__list">
                <h2>Personel</h2>
                <div className="TeamTab__list__container">
                    <h4>N people</h4>
                    <input type="text" placeholder="search for name"></input>
                    <div className="TeamTab__list__container__names">
                    <ul>
                        {[1,2,3].map(()=> {
                            return <li onClick={()=> setIsOpen(true)}>Person name</li>
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
                    <h2>Name</h2>
                    <h4>Contact no.: </h4>
                    <h4>Address: </h4>
                </div>
                <AddPersonelModal show={isOpen} setIsOpen={(a) => setIsOpen(a)}/>
            </div>
        </div>
    )
}

export default TeamTab;