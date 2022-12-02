import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './songCard.css';

const SongCard = ({ judul = 'No Song Found', penyanyi = 'Unknown', audio_path = "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image_path = "https://www.alfaromeo.it/content/dam/moc/common/404-error/mobile/mobile_404.png", penyanyi_id = 0, song_id = 0, set_song }:
                    { judul: string, penyanyi: string, audio_path: string, image_path: string, penyanyi_id: number, song_id: number, set_song: any }) => {
    const navigate = useNavigate();

    const getSongs = async() => {
        const response = await fetch("http://localhost:3000/songs/?penyanyi_id="+localStorage.getItem("user_id"), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        
        const data = await response.json();

        if (!response.ok) {
        }
        else {
            set_song(data.data);
        }
    };

    function deleteSong({song_id}: {song_id: number}) {
        fetch("http://localhost:3000/songs/delete", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                song_id: song_id,
            }),
        })
            .then(function(res) {
                if(res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // use request
                getSongs();
            })
            .catch(err => console.log("error:", err));
    }

    return (
        <div>
            <div className="card" >
                <img src={image_path} className="cardImage" />
                <div className="songTitle">{judul}</div>
                <div className="singer">{penyanyi}</div>
                <FaTrashAlt className='deleteBt' onClick={() => deleteSong({song_id: song_id})} />
            </div>
        </div>
    );
}

export default SongCard;