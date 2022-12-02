import * as React from 'react';
import { Link } from "react-router-dom";
import { useDebounce } from 'usehooks-ts';
import './sidebar.css'

const Sidebar = ({ creds = 'guest', isAdmin = false }: { creds: string, isAdmin: boolean }) => {
    return (
        <div className="sidebar">
            <div className="sidebarTop">
                <Link to={isAdmin === true ? "/listsubscription" : "/managesong"} className='link'>
                    <img className="sidebarLogo" src="/Spotify_Logo_RGB_White.png"/>
                </Link>
            </div>
            <div className="sidebarMiddleWrap">
                <div className="sidebarBottom">
                    <Link to={ isAdmin === true ? "/listsubscription" : "/managesong" } className='link'>
                        <div className="sidebarItems">
                            <img className="sidebarIcon" src="/icons8-home-144.png"/>
                            <span className="sidebarText">Home</span>
                        </div>
                    </Link>
                    {
                        isAdmin === false ? 
                            <>
                                <Link to="/addsong" className='link'>
                                    <div className="sidebarItems">
                                        <img className="sidebarIcon" src="/icons8-add-song-96.png"/>
                                        <span className="sidebarText">Add Song</span>
                                    </div>
                                </Link>
                                <Link to="/editsong" className='link'>
                                    <div className="sidebarItems">
                                        <img className="sidebarIcon" src="/icons8-music-library-96.png"/>
                                        <span className="sidebarText">Edit Song</span>
                                    </div>
                                </Link>
                            </>
                        :   
                            <></>
                    }
                </div>
            </div>
            <div className="sidebarBottomWrap">
                <div className="sidebarBottom">
                    <div className="sidebarItems">
                        <img className="sidebarIcon" src="/icons8-add-new-100.png"/>
                        <span className="sidebarText">Create Playlist</span>
                    </div>
                    <div className="sidebarItems">
                        <img className="spc" src="/icons8-love-90.png"/>
                        <span className="sidebarText">Liked Songs</span>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default Sidebar;