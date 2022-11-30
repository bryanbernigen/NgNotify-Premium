import { useState, useEffect } from 'react';
import Footbar from '../reusables/footbar/footbar';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Twotone from './components/twotone';
import Pagination from '../reusables/pagination/pagination';
import './ListSubscription.css';

const ListSubscription = () => {
    const [uname, setUname] = useState("guest");
    const [name, setName] = useState("guest");
    const [isAdmin, setIsAdmin] = useState(false);
    const dataPerPage = 10;
    let totalPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [subsList, setSubsList] = useState<any[]>([]);

    useEffect(() => {
        setUname(localStorage.getItem("username") || "guest");
        setName(localStorage.getItem("name") || "guest");
        let admin = localStorage.getItem("isAdmin") === "true" ? true : false;
        setIsAdmin(admin);
        
        fetch("http://localhost:3000/songs/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(function(res) {
                if(res.ok) {
                    console.log("response ok");
                    return res.json();
                }
                // else {
                //     navigate("/login");
                // }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // use request
                console.log("sini");
                console.log(data.subsList);
                setSubsList(data.subsList);
            })
            .catch(err => console.log("error:", err));
    }, []);

    function appendSubscriptions() {
        let subsEl : any = [];
        for (let i = 0; i < subsList.length; i++) {
            console.log("ini subs nya", i);
            console.log(subsList[i]);
            subsEl.push(
                <>
                    <Twotone
                        picUser={subsList[i].user_pic}
                        picSinger={subsList[i].singer_pic}
                        nameUser={subsList[i].user_name}
                        nameSinger={subsList[i].singer_name}
                        status={subsList[i].status}
                        userID={subsList[i].user_id}
                        singerID={subsList[i].singer_id}
                    />
                </>
            );
        }
        return subsEl;
    }

    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={true} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={true} />
                <div className="userCt">
                    <div className="userTitle">Subscriptions</div>
                    <div className="homeCt">
                        { appendSubscriptions() }
                    </div>
                    <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
                <Footbar/>
            </div>
        </div>
    );
};

export default ListSubscription;