import { useState, useEffect } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Footbar from '../reusables/footbar/footbar';
import Pagination from '../reusables/pagination/pagination';
import Onetone from './onetone/onetone';
import './UserSubscribe.css'

const UserSubscribe = () => {
    const [uname, setUname] = useState("guest");
    const dataPerPage = 10;
    let totalPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [artistList, setArtistList] = useState<any[]>([{
            "creator_id": 1,
            "creator_name": "Creator1",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 2,
            "creator_name": "Creator2",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 3,
            "creator_name": "Creator3",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 4,
            "creator_name": "Creator4",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 5,
            "creator_name": "Creator5",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 6,
            "creator_name": "Creator6",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 7,
            "creator_name": "Creator7",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 8,
            "creator_name": "Creator8",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 9,
            "creator_name": "Creator9",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 10,
            "creator_name": "Creator10",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 11,
            "creator_name": "Creator11",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
        {
            "creator_id": 12,
            "creator_name": "Creator12",
            "creator_pic": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg",
        },
    ]);

    const [query, setQuery] = useState('');

    useEffect(() => {
        // INI BISA UNCOMMENT
        // fetch("http://localhost:8000/api/auth/info", {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // use request
        //         console.log(data);
        //         if (data['status']) {
        //             setUname(data['data'].username);
        //         }
        //         else {
        //             setUname("guest");
        //         }
        //     })
        //     .catch(err => console.log("error:", err));

        // setup request
        // let bodyContent = JSON.stringify({
        //     userToken: localStorage.getItem("userToken"),
        // });

        // make request
        // fetch(, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // use request
        //         console.log(data);
        //         setSubsList(data);
        //     })
        //     .catch(err => console.log("error:", err));

        // fetch("http://localhost:8000/api/searchusersubs/"+query, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // use request
        //         setArtistList(data)
        //     })
        //     .catch(err => console.log("error:", err));
    }, []);

    function appendChoices() {
        let choicesEl : any = [];
        for (let i = 0; i < artistList.length; i++) { // BE also implement pagination
            console.log("ini artist nya", i);
            console.log(artistList[i]);
            choicesEl.push(
                <>
                    <Onetone 
                        uname={uname}
                        creator_id={artistList[i].creator_id}
                        creator_name={artistList[i].creator_name}
                        creator_pic={artistList[i].creator_pic}
                    />
                </>
            );
        }
        return choicesEl;
    }

    return (
        <div className='body'>
            <Sidebar creds={uname} isAdmin={true} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={true} />
                <div className="userCt">
                    <div className="prompt">Choose 3 or more artist you like.</div>
                    <div className="navSearch">
                        <div className='link'>
                            <img className="navSearchIcon" src="/icons8-search-120.png" />
                        </div>
                        <input className="navSearchInput" type="text" id="querysong" placeholder="Search for artists, songs, or release year" onChange={(e) => setQuery(e.target.value)}/>
                    </div>
                    <div className="homeCt">
                        { appendChoices() }
                    </div>
                    <div className='paginationWrapper'>
                        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                    <button className='doneBt'>DONE</button>
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default UserSubscribe;