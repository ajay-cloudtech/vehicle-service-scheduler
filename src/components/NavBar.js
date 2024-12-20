import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 

// main nav bar function 
const NavBar = () => {
    //check if user is logged in by checking access token in local storage
    const accessToken = localStorage.getItem('accessToken'); 

    return (
        //html component for nav bar
        <nav className="navbar">
            <h1 className='h1'>Car<span style = {{color: 'yellow'}}>Care</span>🚗</h1>
            <ul>
                {accessToken && (
                    <>
                        <li>
                            <Link to="/dashboard">Quick Actions</Link> {/* Link to Dashboard */}
                        </li>
                        <li>
                            <Link to="/maintenance-records">Vehicle | Maintenance</Link> {/* Link to Vehicle & Maintenance Records */}
                        </li>
                        <li>
                            <Link to="/reports">Reports</Link> {/* Link to Reports */}
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link> {/* Link to Profile */}
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link> {/* Logout link */}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
