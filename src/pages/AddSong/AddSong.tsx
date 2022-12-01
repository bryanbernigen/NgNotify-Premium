import { useEffect, useState } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Footbar from '../reusables/footbar/footbar';
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

    const addASong = async() => {
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
        }
        else {
            console.log("add song success");
            console.log(data);
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
        console.log("https://docs.google.com/uc?export=download&id=" + audio_path.match(/(\/d\/)([-a-zA-Z0-9]+)(\/)/)![2]);
        audio.addEventListener('loadedmetadata', function() {
            let durasi = Math.round(audio.duration);
            let minute = Math.floor(durasi / 60);
            let second = Math.floor(durasi % 60);
            setDuration(minute + '.' + second);
            setSekon(Math.round(audio.duration));
        });
    };

    // function formatTime(time: number){
    //     var date = new Date(0);
    //     date.setSeconds(time); // specify value for SECONDS here
    //     var timeString = date.toISOString().substring(11, 19);
    //     if(timeString[0] == "0" && timeString[1] == "0"){
    //         if(timeString[3] == "0" && timeString[4] == "0"){
    //             return timeString.substring(6,8);
    //         }
    //         else{
    //             return timeString.substring(3,8);
    //         }
    //     }
    //     else{
    //         return timeString;
    //     }
    // }

    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={isAdmin} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={isAdmin} />
                <div className="userCt">
                    <div className="userTitle">Add Song</div>
                    <form className="formAdd">
                        <label className="formLabel" htmlFor="songtitle">Song Title</label><br />
                        <input className="formInputText" type="text" name="songtitle" placeholder="Pink Venom" onChange={(e) => setSongTitle(e.target.value)}/><br />
                        <br />
                        <label className="formLabel" htmlFor="singer">Singer</label><br />
                        <input className="formInputText" type="text" name="singer" value={name} disabled/><br />
                        <br />
                        <label className="formLabel" htmlFor="duration">Duration</label><br />
                        <input className="formInputText" type="number" name="duration" value={duration} disabled /><br />
                        <br />
                        <label className="formLabel" htmlFor="audioupload1">Audio Path<br /></label>
                        <input className="formInputText" type="text" name="audiopath" onChange={(e) => {autoEditDuration({audio_path: e.target.value}); setAudioPath(e.target.value)}} /><br />
                        <br />
                        <label className="formLabel" htmlFor="imageupload3">Image Path<br /></label>
                        <input className="formInputText" type="text" name="imagepath" onChange={(e) => {setUploadedImg(e.target.value); setImagePath(e.target.value)}} /><br /><br />
                        <img className="clippedImage" src={uploadedImg}></img>
                        <br /><br /><br />

                        <input className="formBt" type="button" onClick={() => addASong()} value="Add Song" />
                    </form>
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default AddSong;