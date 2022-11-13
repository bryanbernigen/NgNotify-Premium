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

    const checkLogin = () => {
        // setup request
        // let bodyContent = JSON.stringify({
        //     userToken: localStorage.getItem("userToken"),
        // });

        // make request
        fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data);
                if (data['status']) {
                    console.log("login success");
                    setLogin(true);
                    if (data['data'].isAdmin) {
                        navigate('/listsubscription');
                    } else {
                        navigate('/managesong');
                    }
                }
                else {
                    console.log("login fail");
                    setLogin(false);
                }
            })
            .catch(err => console.log("error:", err));
    };

    function closeModal() {
        setOpenModal(false);
    }

    return (
        <div className="loginCt">
            <div className="header">
                <img className="headerImg" src="/Spotify_Logo_RGB_Black.png"/>
                <hr/>
            </div>
            <div className="login">
                <div className="loginPrompt">To continue, log in to Spotify.</div>
                {
                    login ? 
                        <div className="loginFail">
                            <img src="/icons8-warning-67.png" />
                            <div className="incorrectUnamePass">Incorrect username or password.</div>
                        </div> 
                    :   <div></div>
                }
                <a className="loginPhone link" href="">CONTINUE WITH PHONE NUMBER</a>
                <div className="loginOr">
                    <hr/>
                    <div className="loginOrText">OR</div>
                    <hr/>
                </div>
                <div className="loginFormCt">
                    <form method="POST">
                        <label className="loginFormLabel" htmlFor='emailid'>Email address or username</label><br />
                        <input className="loginFormInput" type="text" id="emailid" name="emailid" placeholder="Email address or username" onChange={(e) => setEmail(e.target.value)} /><br />
                        <label className="loginFormLabel" htmlFor="password">Password</label><br />
                        <input className="loginFormInput" type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/><br /><br />
                        <div className="loginFormForgot" onClick={() => {setOpenModal(true)}}>Forgot your password?</div>
                        <Modal isOpen={isOpenModal} onRequestClose={closeModal} className="mymodal" overlayClassName="myoverlay">
                            <div className='modalText'>Try to remember it next time!</div>
                        </Modal>
                        <br /><br />
                        <input className="loginFormBt" type="button" onClick={() => checkLogin()} value="LOG IN" />
                    </form>
                </div>
                <hr/>
                <div className="loginSignupText">Don't have an account?</div>
                <Link className="loginSignupBt link" to="/register">SIGN UP FOR SPOTIFY</Link>
                <div id="redirect"></div>
            </div>
        </div>
    );
};

export default Login;