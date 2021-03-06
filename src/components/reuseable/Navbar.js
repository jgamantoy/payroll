import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div className="Navbar">
            <div className="Navbar__container">
                <div 
                    className={`Navbar__container__tab ${location.pathname === "/"  || location.pathname === "/create_project"? 'active' : ''}`}
                    onClick={()=> history.push('/')}
                >
                    Projects
                </div>
                <div 
                    className={`Navbar__container__tab ${location.pathname === "/payments" ? 'active' : ''}`}
                    onClick={()=> history.push('/payments')}
                >
                    Payments
                </div>
                <div 
                    className={`Navbar__container__tab ${location.pathname === "/team" ? 'active' : ''}`}
                    onClick={()=> history.push('/team')}
                >
                    Team
                </div>
            </div>

        </div>
    )
}

export default Navbar;