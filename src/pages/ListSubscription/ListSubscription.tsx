import { useState, useEffect } from 'react';
import Footbar from '../reusables/footbar/footbar';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Pagination from '../reusables/pagination/pagination';
import './ListSubscription.css';
import Row from './components/row/row';
import { useDebounce } from 'usehooks-ts';

const ListSubscription = () => {
    const [uname, setUname] = useState("guest");
    const [name, setName] = useState("guest");
    const [isAdmin, setIsAdmin] = useState(false);
    const dataPerPage = 10;
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [subsList, setSubsList] = useState<any[]>([]);
    const debouncedValue = useDebounce<string>(uname, 2000);

    useEffect(() => {
        setUname(localStorage.getItem("username") || "guest");
        setName(localStorage.getItem("name") || "guest");
        let admin = localStorage.getItem("isAdmin") === "true" ? true : false;
        setIsAdmin(admin);
        
        fetch("http://localhost:3000/subscription/?page="+currentPage+"&limit=10", {
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
                        localStorage.removeItem("username");
                        localStorage.removeItem("name");
                        localStorage.removeItem("isAdmin");
                        window.location.href = "/login";
                    }
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // use request
                // console.log("hai bryan");
                // console.log(data.subsList);
                setSubsList(data.subsList);
                setTotalPage(data.pages);
                // console.log(totalPage);
            })
            .catch(err => console.log("error:", err));
    }, [debouncedValue, currentPage]);

    function appendSubscriptions() {
        let subsEl : any = [];
        subsEl.push (
            <div className='headerSubs' style={{"--bgcolor": "rgba(0, 0, 0, 0.3)" } as React.CSSProperties} >
                <div className='rowTextBold no1'>#</div>
                <div className='rowTextBold no2'>Username</div>
                <div className='rowTextBold no3'>Singer</div>
            </div>
        );
        for (let i = 0; i < subsList.length; i++) {
            // console.log(subsList[i]);
            subsEl.push(
                <Row
                    nameUser = {subsList[i].nama_subscriber}
                    nameSinger = {subsList[i].nama_penyanyi}
                    status = {subsList[i].status}
                    userID = {subsList[i].subscriber_id}
                    singerID = {subsList[i].creator_id}
                    num = {i+1}
                    subsList = {subsList}
                    setSubsList = {setSubsList}
                />
            );
        }
        return subsEl;
    }

    return (
        <div className='wrapper'>
            <Sidebar creds={uname} isAdmin={isAdmin} />
            <div className='ct'>
                <Topbar creds={uname} isAdmin={isAdmin} />
                <div className="listCt">
                    <div className="userTitle">Subscriptions</div>
                    <br />
                    <div className="listCt">
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