import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './onetone.css';

const Onetone = ({uname, creator_id, creator_name, creator_pic}: {uname: string, creator_id: number, creator_name: string, creator_pic: string}) => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        // console.log("onetone.tsx: creator_id: " + creator_id);
        // console.log("onetone.tsx: creator_name: " + creator_name);
        // console.log("onetone.tsx: creator_pic: " + creator_pic);
        console.log(clicked);
        // fetch("http://localhost:8000/api/usersubs/", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: uname,
        //         creator_id: creator_id,
        //     }),
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // use request
        //         console.log("onetone.tsx: data: " + data);
        //     })
        //     .catch(err => console.log("error:", err));
    }, []);
    return (
        <div className="onetone">
            { clicked 
                ? <div className="onetoneOverlay" onClick={() => setClicked(!clicked)} style={{"--artist_pic": "url("+creator_pic+")"} as React.CSSProperties} ></div>
                : <img className="onetoneImg" src={creator_pic} alt={creator_name} onClick={() => setClicked(!clicked)}/>
            }
            
            {/* <div className="onetoneCt">
                <img className="onetoneImg" src={creator_pic} alt={creator_name} />
                <div className="onetoneOverlay">
                    <FaSearch className='onetoneIcon'/>
                </div>
            </div> */}
            <div className="onetoneName">{creator_name}</div>
        </div>
    );
};

export default Onetone;