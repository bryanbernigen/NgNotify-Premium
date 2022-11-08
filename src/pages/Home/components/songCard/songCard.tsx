import * as React from 'react';
import { Link } from 'react-router-dom';
import './songCard.css';

const SongCard = ({ judul = 'No Song Found', penyanyi = 'Unknown', tanggal_terbit = new Date("2000-01-01"), genre = 'Unknown', duration = 0, audio_path = "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image_path = "https://www.alfaromeo.it/content/dam/moc/common/404-error/mobile/mobile_404.png", album_id = 0 }:
                    { judul: string, penyanyi: string, tanggal_terbit: Date, genre: string, duration: number, audio_path: string, image_path: string, album_id: number }) => {
    return (
        <div>
            <Link to="/detailSong" state={{ judul: judul, penyanyi: penyanyi, tanggal_terbit: tanggal_terbit, genre: genre, duration: duration, audio_path: audio_path, image_path: image_path, album_id: album_id }} className='link'>
                <div className="card" >
                    <img src={image_path} className="cardImage" />
                    <div className="songTitle">{judul}</div>
                    <div className="singer">{penyanyi}</div>
                    <div className="dateGenre">
                        <div className="date">{tanggal_terbit.getFullYear()}</div>
                        <div className="genre">{genre}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SongCard;