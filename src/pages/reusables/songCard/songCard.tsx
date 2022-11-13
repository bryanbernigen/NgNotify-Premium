import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import './songCard.css';

const SongCard = ({ judul = 'No Song Found', penyanyi = 'Unknown', tanggal_terbit = new Date("2000-01-01"), genre = 'Unknown', duration = 0, audio_path = "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image_path = "https://www.alfaromeo.it/content/dam/moc/common/404-error/mobile/mobile_404.png", album_id = 0, song_id = 0 }:
                    { judul: string, penyanyi: string, tanggal_terbit: Date, genre: string, duration: number, audio_path: string, image_path: string, album_id: number, song_id: number }) => {
    function deleteSong({song_id, album_id}: {song_id: number, album_id: number}) {
        console.log("delete song");
        fetch("", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                song_id: song_id,
                album_id: album_id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data['status']);
                if (data['status']) {
                    console.log("delete success");
                }
                else {
                    console.log("delete fail");
                }
            })
            .catch(err => console.log("error:", err));
    }

    return (
        <div>
            <Link to="/detailsong" state={{ judul: judul, penyanyi: penyanyi, tanggal_terbit: tanggal_terbit, genre: genre, duration: duration, audio_path: audio_path, image_path: image_path, album_id: album_id, song_id: song_id }} className='link'>
                <div className="card" >
                    <img src={image_path} className="cardImage" />
                    <div className="songTitle">{judul}</div>
                    <div className="singer">{penyanyi}</div>
                    <div className="dateGenre">
                        <div className="date">{tanggal_terbit.getFullYear()}</div>
                        <div className="genre">{genre}</div>
                    </div>
                    <FaTrashAlt className='deleteBt' onClick={() => deleteSong({song_id: song_id, album_id: album_id})} />
                </div>
            </Link>
        </div>
    );
}

export default SongCard;