import { useState, useEffect } from 'react';
import Topbar from '../reusables/topbar/topbar';
import Sidebar from '../reusables/sidebar/sidebar';
import SongCard from '../reusables/songCard/songCard';
import Pagination from '../reusables/pagination/pagination';
import Footbar from '../reusables/footbar/footbar';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ManageSong.css'

const ManageSong = () => {
    const [uname, setUname] = useState("guest");
    const [isAdmin, setIsAdmin] = useState(false);
    const dataPerPage = 10;
    let totalPage = 0;
    const [currentPage, setCurrentPage] = useState(1);
    const [songs, setSongs] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setUname(localStorage.getItem("username") || "guest");
        let admin = localStorage.getItem("isAdmin") === "true" ? true : false;
        setIsAdmin(admin);

        // make request
        fetch("http://localhost:3000/songs/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(function(res) {
                if(res.ok) {
                    console.log("response ok");
                    return res.json();
                }
                else {
                    navigate("/login");
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // use request
                console.log(data.data);
                setSongs(data.data);
                totalPage = data.data.length;
                console.log(totalPage);
            })
            .catch(err => console.log("error:", err));
    }, []);

    function appendSongs() {
        let songsEl : any = [];
        for (let i = 0; i < songs.length; i++) {
            console.log(songs[i]);
            songsEl.push(
                <SongCard
                    judul={songs[i].judul}
                    penyanyi={songs[i].namapenyanyi}
                    audio_path={songs[i].audio_path}
                    image_path={songs[i].image_path}
                    penyanyi_id={songs[i].penyanyi_id}
                    song_id={songs[i].song_id}
                    set_song ={setSongs}
                />
            );
        }
        return songsEl;
    }
    
    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={isAdmin} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={isAdmin} />
                <div className="userCt">
                    <div className="userTitle">Manage Songs</div>
                    <div className="manipButtons">
                        <Link to="/addsong">
                            <button className="manipButton"><FaPlus /> Add Song</button>
                        </Link>
                        <Link to="/editsong">
                            <button className="manipButton"><FaEdit /> Edit Song</button>
                        </Link>
                    </div>
                    <div className="homeCt">
                        { appendSongs() }
                    </div>
                    <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default ManageSong;