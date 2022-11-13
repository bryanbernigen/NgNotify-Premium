import { useEffect, useState } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Footbar from '../reusables/footbar/footbar';
import './EditSong.css';

const EditSong = () => {
    const [uname, setUname] = useState("guest");
    const [songs, setSongs] = useState<any[]>([]);
    const [song_id, setSong_id] = useState(0);
    const [songTitle, setSongTitle] = useState("");
    const [singer, setSinger] = useState("");
    const [dateRelease, setDateRelease] = useState(new Date("2000-01-01"));
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [audioPath, setAudioPath] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [lyrics, setLyrics] = useState([]);

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
        fetch("http://localhost:8000/api/songapi/showallsongs", {
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
                setSongs(data['data']);
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

    function autoFill({song_id}: {song_id: number}) {
        console.log("autofill")
    }

    return (
        <div>
            <Sidebar creds={uname} isAdmin={false} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={false} />
                <div className="userCt">
                    <div className="userTitle">Edit Song</div>
                    <form className="form">
                        <label className="formLabel" htmlFor="songidInput">Song ID</label><br />
                        <select className="formInputText">{song_id}
                            {
                                songs.map((song) => {
                                    return <option value={song.song_id}
                                        onClick={() => {setSong_id(song.song_id); autoFill({song_id: song.song_id})}}>{song.song_id + ". " + song.judul}</option>
                                })
                            }
                        </select>
                        <br /><br />
                        <label className="formLabel" htmlFor="songtitle">Song Title</label><br />
                        <input className="formInputText" type="text" name="songtitle" placeholder={songTitle} /><br />
                        <br />
                        <label className="formLabel" htmlFor="singer">Singer</label><br />
                        <input className="formInputText" type="text" name="singer" value={singer} disabled/><br />
                        <br />
                        <label className="formLabel" htmlFor="tanggalterbit">Date Released</label><br />
                        <input className="formInputText" type="date" name="tanggalterbit" value={dateRelease.toString()} disabled/><br />
                        <br />
                        <label className="formLabel" htmlFor="genre">Genre</label><br />
                        <input className="formInputText" type="text" name="genreas" value={genre} disabled/><br />
                        <br />
                        <label className="formLabel" htmlFor="duration">Duration</label><br />
                        <input className="formInputText" type="number" name="duration" value={duration} disabled /><br />
                        <br />
                        <label className="formLabel" htmlFor="audioupload1">Audio Path<br /></label>
                        <input className="formInputText" type="text" name="audiopath" placeholder={audioPath} onChange={(e) => {autoEditDuration({audio_path: e.target.value})}} /><br />
                        <br />
                        <label className="formLabel" htmlFor="imageupload3">Image Path<br /></label>
                        <input className="formInputText" type="text" name="imagepath" value={imagePath} disabled/><br /><br /><br />
                        <img className="clippedImage" src={imagePath}></img>
                        <br /><br /><br />
                        <label className="formLabel" htmlFor="genre">Lyric</label><br /><br />
                        <textarea className="formInputText" name="Lyric" rows={10} value={lyrics} disabled></textarea><br /><br />

                        <input className="formBt" type="button" onClick={() => addSong()} value="Add Song" />
                    </form>
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default EditSong;