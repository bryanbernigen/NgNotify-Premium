import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaCaretDown } from 'react-icons/fa';
import './navbar.css'

function loginout() {
    return (
        <div></div>
    );
}

const Navbar = ({creds = "guest"}: {creds: string}) => {
    const [query, setQuery] = useState("");

    return (
        <div>
            <nav>
                <div className="navCt" id="navCt">
                    <div className="navLeft">
                        <Link to="/home" className='link'>
                            <img className="navLogo" src="/Spotify_Logo_RGB_White.png"/>
                        </Link>
                        <div className="navSearch">
                            <Link to="/searchsortfilter" state={{ querySearch: query }} className='link'>
                                <img className="navSearchIcon" id="songqueryimg" src="/icons8-search-120-black.png"/>
                            </Link>
                            <input className="navSearchInput" type="text" id="querysong" placeholder="Search for artists, songs, or release year" onChange={e => setQuery(e.target.value)}/>
                        </div>
                    </div>
                    <div className="navRight">
                        {
                            creds === "admin" ?
                                <>
                                    <Link to="/adddata" className='link'>
                                        <div className="navItems">
                                            <img className="navIcon" src="/icons8-add-song-96.png"/>
                                            <span className="navText">Add Song</span>
                                        </div>
                                    </Link>
                                    <Link to="/adddata" className='link'>
                                        <div className="navItems">
                                            <img className="navIcon" src="/icons8-music-library-96.png"/>
                                            <span className="navText">Add Album</span>
                                        </div>
                                    </Link>
                                    <Link to="/listusers" className='link'>
                                        <div className="navItems">
                                            <img className="navIcon" src="/icons8-select-users-96.png"/>
                                            <span className="navText">Users</span>
                                        </div>
                                    </Link>
                                </>
                            :
                                <></>
                        }
                        <Link to="/albums" className='link'>
                            <div className="navItems">
                                <img className="navIcon" src="/icons8-music-library-96.png"/>
                                <span className="navText">Albums</span>
                            </div>
                        </Link>
                        <div className="navCollapse">
                            <div className="navItems">
                                <img className="navIcon" src="/icons8-user-100.png"/>
                                <span className="navText" id="unameuwu"></span>
                                <FaCaretDown />
                            </div>
                            <div className="navDrop">
                                <div className="navChild" onClick={() => loginout()} id="loginout">Log out</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;