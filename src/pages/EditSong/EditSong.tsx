import { useEffect, useState } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Footbar from '../reusables/footbar/footbar';
import Modal from 'react-modal';
import './EditSong.css';

const EditSong = () => {
    const [uname, setUname] = useState("guest");
    const [name, setName] = useState("guest");
    const [isAdmin, setIsAdmin] = useState(false);
    const [songs, setSongs] = useState<any[]>([]);
    const [song_id, setSong_id] = useState(0);
    const [songTitle, setSongTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [sekon, setSekon] = useState(0);
    const [audioPath, setAudioPath] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [modalmsg, setModalmsg] = useState("");

    const [isOpenModal, setOpenModal] = useState(false);
    function closeModal() {
        setOpenModal(false);
    }

    useEffect(() => {
        setUname(localStorage.getItem("username") || "guest");
        setName(localStorage.getItem("name") || "guest");
        let admin = localStorage.getItem("isAdmin") === "true" ? true : false;
        setIsAdmin(admin);

        fetch("http://localhost:3000/songs/?penyanyi_id="+localStorage.getItem("user_id"), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(function(res) {
                if(res.ok) {
                    // console.log("response ok");
                    if (res.status === 444) {
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                    }
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            }            )
            .then(data => {
                // use request
                // console.log(data.data);
                setSongs(data.data);
            })
            .catch(err => console.log("error:", err));
    }, []);

    function autoFill({song_id}: {song_id: number}) {
        // console.log("autofill");
        // console.log(songs);
        // console.log(song_id);
        for (let i=0; i < songs.length; i++) {
            if (songs[i].song_id == song_id) {
                // console.log("you")
                setSongTitle(songs[i].judul);
                setAudioPath(songs[i].audio_path);
                setImagePath(songs[i].image_path);
                autoEditDuration({audio_path: songs[i].audio_path});
            }
        }
    }

    function autoEditDuration({audio_path = ""}: {audio_path: string}) {
        let audio = new Audio("https://docs.google.com/uc?export=download&id=" + audio_path.match(/(\/d\/)([-a-zA-Z0-9]+)(\/)/)![2]);
        // console.log("https://docs.google.com/uc?export=download&id=" + audio_path.match(/(\/d\/)([-a-zA-Z0-9]+)(\/)/)![2]);
        audio.addEventListener('loadedmetadata', function() {
            let durasi = Math.round(audio.duration);
            let minute = Math.floor(durasi / 60);
            let second = Math.floor(durasi % 60);
            setDuration(minute + '.' + second);
            setSekon(Math.round(audio.duration));
        });
    };
    
    const editASong = async() => {
        if (songTitle !== "" && audioPath !== "" && imagePath !== "") {
            const response = await fetch("http://localhost:3000/songs/edit", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    song_id: song_id,
                    judul: songTitle,
                    audio_path: audioPath,
                    image_path: imagePath,
                    duration: sekon,
                })
            });
            
            const data = await response.json();

            if (!response.ok) {
                console.log("edit song fail");
                setModalmsg("Edit song failed.");
                setOpenModal(true);
            }
            else {
                console.log("edit song success");
                setModalmsg("Song edited successfully.");
                setOpenModal(true);
                // console.log(data);
            }

            if (response.status === 444) {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }
        else {
            setModalmsg("Please fill all the fields.");
            setOpenModal(true);
        }
    };

    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={false} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={false} />
                <div className="editsongCt">
                    <div className="userTitle">Edit Song</div>
                    <br />
                    <form className="formEdit">
                        <label className="formLabelWhite" htmlFor="songidInput">Song ID</label><br />
                        <select className="formInputSelect" value={song_id} >{song_id}
                            {
                                songs.map((song) => {
                                    return <option className='options' value={song.song_id} key={song.song_id} onClick={() => {autoFill({song_id: song.song_id})}} >{song.song_id + ". " + song.judul}</option>
                                })
                            }
                        </select>
                        <br /><br />
                        <label className="formLabelWhite" htmlFor="songtitle">Song Title</label><br />
                        <input className="formInputText" type="text" name="songtitle" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} /><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="singer">Singer</label><br />
                        <input className="formInputText" type="text" name="singer" value={name} disabled/><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="duration">Duration</label><br />
                        <input className="formInputText" type="number" name="duration" value={duration} disabled /><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="audioupload1">Audio Path<br /></label>
                        <input className="formInputText" type="text" name="audiopath" value={audioPath} onChange={(e) => {autoEditDuration({audio_path: e.target.value}); setAudioPath(e.target.value)}} /><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="imageupload3">Image Path<br /></label>
                        <input className="formInputText" type="text" name="imagepath" value={imagePath} onChange={(e) => setImagePath(e.target.value)} /><br /><br /><br />
                        <img className="clippedImage" src={imagePath}></img>
                        <br /><br /><br />

                        <input className="formBt" type="button" onClick={() => editASong()} value="Edit Song" />
                    </form>
                    <Modal isOpen={isOpenModal} onRequestClose={closeModal} className="mymodal" overlayClassName="myoverlay">
                        <div className='modalText'>{modalmsg}</div>
                        <div className='modalButtons'>
                            <div className='modalButton' >OK</div>
                        </div>
                    </Modal>
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default EditSong;