import { useState, useEffect } from 'react';
import Topbar from '../reusables/topbar/topbar';
import Sidebar from '../reusables/sidebar/sidebar';
import SongCard from './components/songCard/songCard';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import './Home.css'

const Home = () => {
    const [songs, setSongs] = useState<any[]>([{
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [flag, setFlag] = useState(false);

    var totalPageSong = songs.length/10;

    // useEffect(() => {
    //     // setup request
    //     // let bodyContent = JSON.stringify({
    //     //     userToken: localStorage.getItem("userToken"),
    //     // });

    //     // make request
    //     fetch("http://localhost:8000/api/songapi/querysong/"+currentPage+"/10/", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // use request
    //             console.log("sini");
    //             setSongs(data);
    //             totalPageSong = data['data']['pages'];
    //             setFlag(true);
    //             console.log(data);
    //             console.log(totalPageSong);
    //         })
    //         .catch(err => console.log("error:", err));
    // }, []);

    // useEffect(() => {
        function appendSongs() {
            let songsEl : any = [];
            for (let i = 0; i < songs.length; i++) {
                songsEl.push(
                    <SongCard
                        judul={songs[i].judul}
                        penyanyi={songs[i].penyanyi}
                        tanggal_terbit={songs[i].tanggal_terbit}
                        genre={songs[i].genre}
                        duration={songs[i].duration}
                        audio_path={songs[i].audio_path}
                        image_path={songs[i].image_path}
                        album_id={songs[i].album_id}
                    />
                );
                songsEl.style
            }
            return songsEl;
        }
    // }, []);

    const paginationRange = Array.from({length: totalPageSong+1}, (_, i) => i);

    console.log("masuk pagination ", currentPage, paginationRange?.length);
    console.log("song length ", songs.length);

    const onNext = () => {
        if (currentPage !== totalPageSong) {
            setCurrentPage(currentPage+1);
        }
    };

    const onPrevious = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage-1);
        }
    };

    const onChangePage = ({numpg}: {numpg: number}) => {
        setCurrentPage(numpg);
    }

    return (
        <div className='wrapper'>
            <Sidebar creds='admin'/>
            <div className='ct'>
                <Topbar />
                <div className="homeCt">
                    { appendSongs() }
                </div>
                <div className='paginationCt'>
                    <div className="page-item">
                        <div className="page-link" onClick={onPrevious}>
                            <FaAngleLeft className='pageNav'/>
                        </div>
                    </div>
                    {paginationRange.map((_e, i) => {
                        return(
                            <>
                                {
                                    i === currentPage ?
                                        <div className="pageCurr">{i+1}</div>
                                    :
                                        <div className="page" onClick={() => {onChangePage({numpg: i+1})}}>{i+1}</div>
                                }
                            </>
                        );
                    })}
                    <div className="page-item">
                        <div className="page-link" onClick={onNext}>
                            <FaAngleRight className='pageNav'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;