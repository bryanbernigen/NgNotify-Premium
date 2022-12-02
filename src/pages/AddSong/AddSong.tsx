import { useEffect, useState } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Footbar from '../reusables/footbar/footbar';
import Modal from 'react-modal';
import './AddSong.css';

const AddSong = () => {
    const [uname, setUname] = useState("guest");
    const [name, setName] = useState("guest");
    const [isAdmin, setIsAdmin] = useState(false);
    const [songTitle, setSongTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [sekon, setSekon] = useState(0);
    const [audioPath, setAudioPath] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [uploadedImg, setUploadedImg] = useState("");
    const [modalmsg, setModalmsg] = useState("");

    const [isOpenModal, setOpenModal] = useState(false);
    function closeModal() {
        setOpenModal(false);
    }

    const addASong = async() => {
        if (songTitle !== "" && audioPath !== "" && imagePath !== "") {
            const response = await fetch("http://localhost:3000/songs/add", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    judul: songTitle,
                    audio_path: audioPath,
                    image_path: imagePath,
                    duration: sekon,
                })
            });
            
            const data = await response.json();

            if (!response.ok) {
                console.log("add song fail");
                setModalmsg("Add song failed.");
                setOpenModal(true);
            }
            else {
                console.log("add song success");
                setModalmsg("Song added successfully.");
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

    useEffect(() => {
        setUname(localStorage.getItem("username") || "guest");
        setName(localStorage.getItem("name") || "guest");
        let admin = localStorage.getItem("isAdmin") === "true" ? true : false;
        setIsAdmin(admin);
    }, []);

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

    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={isAdmin} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={isAdmin} />
                <div className="addsongCt">
                    <div className="userTitle">Add Song</div>
                    <br />
                    <form className="formAdd">
                        <label className="formLabelWhite" htmlFor="songtitle">Song Title</label><br />
                        <input className="formInputText" type="text" name="songtitle" placeholder="Pink Venom" onChange={(e) => setSongTitle(e.target.value)}/><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="singer">Singer</label><br />
                        <input className="formInputText" type="text" name="singer" value={name} disabled/><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="duration">Duration</label><br />
                        <input className="formInputText" type="number" name="duration" value={duration} disabled /><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="audioupload1">Audio Path<br /></label>
                        <input className="formInputText" type="text" name="audiopath" onChange={(e) => {autoEditDuration({audio_path: e.target.value}); setAudioPath(e.target.value)}} /><br />
                        <br />
                        <label className="formLabelWhite" htmlFor="imageupload3">Image Path<br /></label>
                        <input className="formInputText" type="text" name="imagepath" onChange={(e) => {setUploadedImg(e.target.value); setImagePath(e.target.value)}} /><br /><br />
                        <img className="clippedImage" src={uploadedImg}></img>
                        <br /><br /><br />

                        <input className="formBt" type="button" onClick={() => addASong()} value="Add Song" />
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

export default AddSong;