import { useState, useEffect } from 'react';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';
import './ListUsers.css';

const ListUsers = () => {
    const [users, setUsers] = useState([
        {
            "user_id": 1,
            "email": "hai@gmail.com",
            "username": "hai",
            "isAdmin": false,
        },
        {
            "user_id": 1,
            "email": "hai@gmail.com",
            "username": "hai",
            "isAdmin": false,
        },
        {
            "user_id": 1,
            "email": "hai@gmail.com",
            "username": "hai",
            "isAdmin": false,
        },
    ])

    useEffect(() => {
        // setup request
        // let bodyContent = JSON.stringify({
        //     userToken: localStorage.getItem("userToken"),
        // });

        // make request
        fetch("http://localhost:8000/api/userapi/showalluser", {
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
                setUsers(data);
            })
            .catch(err => console.log("error:", err));
    }, []);

    function appendUsers() {
        let header = ['user_id', 'email', "username", "isAdmin"];
        return (
            <table className='tableUser'>
                <thead>
                    <tr>
                        { header.map((h) => {
                            return (<th>{h}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return(
                                <tr key={user.user_id}>
                                    { header.map((h) => {
                                        return(<td>user[h]</td>)
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    return (
        <div className='wrapper'>
            <Sidebar creds='admin'/>
            <div className='ct'>
                <Topbar />
                <div className="userCt">
                    <div className="userTitle">List of Users</div>
                    { appendUsers() }
                </div>
            </div>
        </div>
    );
};

export default ListUsers;