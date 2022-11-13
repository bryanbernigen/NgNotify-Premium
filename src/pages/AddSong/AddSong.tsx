import { useEffect, useState } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Footbar from '../reusables/footbar/footbar';
import './AddSong.css';

const AddSong = () => {
    const [uname, setUname] = useState("guest");
    const [album_id, setAlbum_id] = useState(0);
    const [albums, setAlbums] = useState<any[]>([]);
    const [song_id, setSong_id] = useState(0);
    const [songTitle, setSongTitle] = useState("");
    const [singer, setSinger] = useState("");
    const [dateRelease, setDateRelease] = useState(new Date("2000-01-01"));
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [audioPath, setAudioPath] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [lyrics, setLyrics] = useState([]);
    const [uploadedImg, setUploadedImg] = useState("");

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
        //"http://localhost:8000/api/songapi/showallsongs"
        fetch("http://localhost:8000/api/albumapi/showallalbum", {
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
                setAlbums(data['data']);
            })
            .catch(err => console.log("error:", err));
    }, []);

    function addSong() {
        console.log("add Song");
    };

    function autoEditDuration({audio_path = ""}: {audio_path: string}) {
        let audio = new Audio(audio_path);
        audio.addEventListener('loadedmetadata', function() {
            setDuration(audio.duration);
        });
    };

    return (
        <div>
            <Sidebar creds={uname} isAdmin={false} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={false} />
                <div className="userCt">
                    <div className="userTitle">Add Song</div>
                    <form className="form">
                        <label className="formLabel" htmlFor="albumid">Album ID</label><br />
                        <select className="formInputText">{album_id}
                            {
                                albums.map((album) => {
                                    return <option value={album.album_id}
                                        onClick={() => setAlbum_id(album.album_id)}>{album.album_id + ". " + album.judul}</option>
                                })
                            }
                        </select>
                        <br /><br />
                        <label className="formLabel" htmlFor="songidInput">Song ID</label><br />
                        <input className="formInputText" type="number" name="songidInput" placeholder="auto generated" disabled /><br />
                        <br />
                        <label className="formLabel" htmlFor="songtitle">Song Title</label><br />
                        <input className="formInputText" type="text" name="songtitle" placeholder="Pink Venom" /><br />
                        <br />
                        <label className="formLabel" htmlFor="singer">Singer</label><br />
                        <input className="formInputText" type="text" name="singer" value={singer} disabled/><br />
                        <br />
                        <label className="formLabel" htmlFor="tanggalterbit">Date Released</label><br />
                        <input className="formInputText" type="date" name="tanggalterbit" placeholder="DD/MM/YYYY" /><br />
                        <br />
                        <label className="formLabel" htmlFor="genre">Genre</label><br />
                        <input className="formInputText" type="text" name="genreas" placeholder="Pop" /><br />
                        <br />
                        <label className="formLabel" htmlFor="duration">Duration</label><br />
                        <input className="formInputText" type="number" name="duration" placeholder="0" disabled /><br />
                        <br />
                        <label className="formLabel" htmlFor="audioupload1">Audio Path<br /></label>
                        <input className="formInputText" type="text" name="audiopath" onChange={(e) => {autoEditDuration({audio_path: e.target.value})}} /><br />
                        <br />
                        <label className="formLabel" htmlFor="imageupload3">Image Path<br /></label>
                        <input className="formInputText" type="text" name="imagepath" onChange={(e) => setUploadedImg(e.target.value)} /><br /><br /><br />
                        <img className="clippedImage" src={uploadedImg}></img>
                        <br /><br /><br />
                        <label className="formLabel" htmlFor="genre">Lyric</label><br /><br />
                        <textarea className="formInputText" name="Lyric" rows={10}></textarea><br /><br />

                        <input className="formBt" type="button" onClick={() => addSong()} value="Add Song" />
                    </form>
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default AddSong;