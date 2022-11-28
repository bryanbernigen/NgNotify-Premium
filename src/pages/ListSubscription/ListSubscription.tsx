import { useState, useEffect } from 'react';
import Footbar from '../reusables/footbar/footbar';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import Twotone from './components/twotone';
import Pagination from '../reusables/pagination/pagination';

const ListSubscription = () => {
    const [uname, setUname] = useState("guest");
    const dataPerPage = 10;
    let totalPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [subsList, setSubsList] = useState<any[]>([{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },{
            "user_id": 1,
            "user_name": "User1",
            "user_pic": "url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Irene_Bae_at_GMP-KIX_Airport_on_January_22%2C_2020.png)",
            "singer_id": 1,
            "singer_name": "Singer1",
            "singer_pic": "url(https://picsum.photos/id/1014/800/800?grayscale)",
            "status": 0,
        },
        {
            "user_id": 2,
            "user_name": "User2",
            "user_pic": "url(https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg)",
            "singer_id": 2,
            "singer_name": "Singer2",
            "singer_pic": "url(https://picsum.photos/id/1074/800/800)",
            "status": 0,
        },
    ]);

    useEffect(() => {
        fetch("http://localhost:8000/api/auth/info", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data);
                if (data['status']) {
                    setUname(data['data'].username);
                }
                else {
                    setUname("guest");
                }
            })
            .catch(err => console.log("error:", err));
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
        <div className='body'>
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