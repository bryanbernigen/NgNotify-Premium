import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import './topbar.css';

const Topbar = ({creds = "guest", isAdmin = false}: {creds: string, isAdmin: boolean}) => {
    const navigate = useNavigate();

    function loginout() {
        console.log(creds);
        if (creds === "guest") {
            navigate('/login');
        } else {
            // logout
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            localStorage.removeItem("name");
            localStorage.removeItem("isAdmin");
            navigate('/login');
        }
    }

    return (
        <nav>
            <div className="navCt" id="navCt">
                <div className="navLeft" >
                    <img src="/icons8-chevron-left-96.png" onClick={() => navigate(-1)}/>
                    <img src="/icons8-chevron-right-96.png" onClick={() => navigate(1)}/>
                </div>
                <div className="navRight">
                    <div className="navCollapse">
                        <div className="navItems">
                            <img className="navIcon" src="/icons8-user-100.png"/>
                            <span className="navText" id="unameuwu">{creds}</span>
                            <FaCaretDown />
                        </div>
                        <div className="navDrop">
                            <div className="navChild" onClick={() => loginout()} id="loginout">
                                {
                                    creds === "guest" ?
                                        `Log in`
                                    :   `Log out`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Topbar;