import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [tried, setTried] = useState(false);

    const getCreds = async() => {
        const response = await fetch("http://localhost:3000/user", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            console.log("get user fail");
            setLogin(false);
        }
        else {
            if (response.status === 444) {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
            console.log("get user success");
            setLogin(true);
            console.log(data['user']);
            localStorage.setItem("user_id", data['user'].user_id);
            localStorage.setItem("username", data['user'].username);
            localStorage.setItem("email", data['user'].email);
            localStorage.setItem("name", data['user'].name);
            localStorage.setItem("isAdmin", data['user'].isAdmin);
            console.log(localStorage.getItem("isAdmin"));
            if (data['user'].isAdmin) {
                console.log("admin");
                navigate('/listsubscription');
            }
            else {
                console.log("singer");
                navigate('/managesong');
            }
        }
    };

    const checkLogin = async() => {
        setTried(true);
        const response = await fetch("http://localhost:3000/auth/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                emailuser: email,
                password: password,
            }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            console.log("login fail");
        }
        else {
            console.log("login success");
            console.log(data);
            localStorage.setItem("accessToken", data['accessToken']);
            getCreds();
        }
    };

    function closeModal() {
        setOpenModal(false);
    };

    return (
        <div className="loginCt">
            <div className="header">
                <img className="headerImg" src="/Spotify_Logo_RGB_Black.png"/>
                <hr/>
            </div>
            <div className="login">
                <div className="loginPrompt">To continue, log in to Spotify.</div>
                {
                    login || !tried ? 
                        <></>
                    :   <div className="loginFail">
                            <img src="/icons8-warning-67.png" />
                            <div className="incorrectUnamePass">Incorrect username or password.</div>
                        </div>
                }
                <a className="loginPhone link" href="">CONTINUE WITH PHONE NUMBER</a>
                <div className="loginOr">
                    <hr className='loginOrHr'/>
                    <div className="loginOrText">OR</div>
                    <hr className='loginOrHr'/>
                </div>
                <div className="loginFormCt">
                    <form method="POST" className="form">
                        <label className="loginFormLabel" htmlFor='emailid'>Email address or username</label><br />
                        <input className="loginFormInput" type="text" name="emailid" placeholder="Email address or username" onChange={(e) => setEmail(e.target.value)} /><br />
                        <label className="loginFormLabel" htmlFor="password">Password</label><br />
                        <input className="loginFormInput" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <div className="loginFormForgot" onClick={() => {setOpenModal(true)}}>Forgot your password?</div>
                        <br /><br />
                        <input className="loginFormBt" type="button" onClick={() => checkLogin()} value="LOG IN" />
                    </form>
                </div>
                <Modal isOpen={isOpenModal} onRequestClose={closeModal} className="mymodal" overlayClassName="myoverlay">
                    <div className='modalText'>Try to remember it next time!</div>
                </Modal>
                <hr className='hrbawahbutton'/>
                <div className="loginSignupText">Don't have an account?</div>
                <Link className="loginSignupBt link" to="/register">SIGN UP FOR SPOTIFY</Link>
                <div id="redirect"></div>
            </div>
        </div>
    );
};

export default Login;