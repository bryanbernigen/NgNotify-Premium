import { useState, useEffect } from 'react';
import Topbar from '../reusables/topbar/topbar';
import Sidebar from '../reusables/sidebar/sidebar';
import SongCard from '../reusables/songCard/songCard';
import Pagination from '../reusables/pagination/pagination';
import Footbar from '../reusables/footbar/footbar';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ManageSong.css'

const ManageSong = () => {
    const [uname, setUname] = useState("guest");
    const dataPerPage = 10;
    let totalPage = 0;
    const [currentPage, setCurrentPage] = useState(1);
    const [songs, setSongs] = useState<any[]>([{
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 1,
    },
    {
        "Judul": "Anti fragile2",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 2,
    },
    {
        "Judul": "Anti fragile3",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 3,
    },
    {
        "Judul": "Anti fragile4",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 4,
    },
    {
        "Judul": "Anti fragile5",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 5,
    },
    {
        "Judul": "Anti fragile6",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 6,
    },
    {
        "Judul": "Anti fragile7",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": 232,
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "/sample-song-image.jpg",
        "album_id": 1,
        "song_id": 7,
    }]);

    useEffect(() => {
        fetch("http://localhost:8000/api/auth/info", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data);
                if (data['status']) {
                    setUname(data['data'].username);
                }
                else {
                    setUname("guest");
                }
            })
            .catch(err => console.log("error:", err));

        // setup request
        // let bodyContent = JSON.stringify({
        //     userToken: localStorage.getItem("userToken"),
        // });

        // make request
        fetch("http://localhost:8000/api/songapi/querysong/"+(currentPage-1)+"/10/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log("sini");
                setSongs(data);
                totalPage = data['data']['pages'];
                console.log(data);
                console.log(totalPage);
            })
            .catch(err => console.log("error:", err));
    }, []);

    function appendSongs() {
        let songsEl : any = [];
        for (let i = 0; i < songs.length; i++) {
            console.log("ini songs nya", i);
            console.log(songs[i]);
            songsEl.push(
                <SongCard
                    judul={songs[i].Judul}
                    penyanyi={songs[i].Penyanyi}
                    tanggal_terbit={new Date(songs[i].Tanggal_terbit)}
                    genre={songs[i].Genre}
                    duration={songs[i].Duration}
                    audio_path={songs[i].Audio_path}
                    image_path={songs[i].Image_path}
                    album_id={songs[i].album_id}
                    song_id={songs[i].song_id}
                />
            );
        }
        return songsEl;
    }
    
    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={false} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={false} />
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