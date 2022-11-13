import { useState, useEffect } from 'react';
import Footbar from '../reusables/footbar/footbar';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import { FaCircle, FaPlay, FaRegHeart, FaHeart, FaEllipsisH } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './DetailSong.css'

const DetailSong = () => {
    const location = useLocation();
    const judul = location.state.judul;
    const penyanyi = location.state.penyanyi;
    const tanggal_terbit = location.state.tanggal_terbit;
    const genre = location.state.genre;
    const duration = location.state.duration;
    const audio_path = location.state.audio_path;
    const image_path = location.state.image_path;
    const album_id = location.state.album_id;
    const song_id = location.state.song_id;

    const [uname, setUname] = useState("guest");
    const [lyrics, setLyrics] = useState([]);
    const [albumName, setAlbumName] = useState("");

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

        fetch("http://localhost:8000/api/songapi/getsong?song_id="+song_id, {
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
                    setLyrics(data['data'].lyric);
                }
                else {
                    setLyrics([]);
                }
            })
            .catch(err => console.log("error:", err));

        fetch("http://localhost:8000/api/albumapi/getalbum?album_id="+album_id, {
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
                    setAlbumName(data['data'].judul);
                }
                else {
                    setAlbumName(judul);
                }
            })
            .catch(err => console.log("error:", err));
    }, []);

    return (
        <div>
            <Sidebar creds={uname} isAdmin={false} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={false} />
                <div className="detAlbumCt">
                    <div className="heroCt">
                        <img className="albumPoster" src={image_path} />
                        <div className="albumDesc">
                            <div className="albumText">SONG</div>
                            <div className="albumTitle">{judul}</div>
                            <div className="albumInfo">
                                <span className="albumInfoComp">{penyanyi}</span>
                                <FaCircle />
                                <span className="albumInfoComp">{tanggal_terbit.getFullYear()}</span>
                                <FaCircle />
                                <span className="albumInfoComp">{Math.ceil(duration/60)}:{duration%60}</span>
                                <FaCircle />
                                <span className="albumInfoComp">{genre}</span>
                            </div>
                        </div>
                    </div>
                    <div className="detAlbumFunc">
                        <div className="detAlbumFuncMid">
                            <FaPlay className='play'/>
                            <FaRegHeart className='like'/>
                            <FaEllipsisH className='ellipsis'/>
                        </div>
                    </div>
                    <div className="detSongLyrics">
                        <div className="detSongTitle">Lyrics</div>
                        <div className="songLyrics">{
                            lyrics.map((lyric, index) => {
                                return <div key={index}>{lyric}</div>
                            })
                        }</div>
                    </div>
                    <div className="detSongSinger">
                        <img className="musicPlayerPoster" src={image_path} />
                        <div className="detSongSingerCt">
                            <div className="detSongSingerTitle">Artist</div>
                            <div className="musicPlayerSinger detSongSingerName">{penyanyi}</div>
                        </div>
                    </div>
                    <div className="detSongAlbum">
                        <img className="musicPlayerPoster" src={image_path} />
                        <div className="detSongSingerCt">
                            <div className="detSongSingerTitle">from the Album</div>
                            <div className="musicAlbum">{albumName}</div>
                        </div>
                    </div>
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default DetailSong;