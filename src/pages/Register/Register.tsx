import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [gender, setGender] = useState("");

    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [tried, setTried] = useState(false);

    const [debounce, setDebounce] = useState(0);
    const [status, setStatus] = useState("");
    const [usernameValid, setUsernameValid] = useState("");

    function checkEmail(){
        clearTimeout(debounce);
        setDebounce(setTimeout(function () {
            checkUniqueEmail();
        }, 500));
    }

    function checkUsername(){
        clearTimeout(debounce);
        setDebounce(setTimeout(function () {
            checkUniqueUsername();
        }, 500));
    }

    function checkUniqueEmail(){
        // make request
        fetch("http://localhost:3000/auth/uniqueemail/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data['status']);
                if(data['status']){
                    setStatus("true");
                }
                else{
                    setStatus("false");
                }
            })
            .catch(err => console.log("error:", err));
    }

    function checkUniqueUsername(){
        // make request
        fetch("http://localhost:3000/auth/uniqueusername/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data['status']);
                if(data['status']){
                    setUsernameValid("true");
                }
                else{
                    setUsernameValid("false");
                }
            })
            .catch(err => console.log("error:", err));
    }

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
        }
        else {
            console.log("get user success");
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

    const checkRegister = async() => {
        if (email === confirmEmail && status === "true" && usernameValid === "true") {
            setTried(true);
            const response = await fetch("http://localhost:3000/auth/register/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                    name: name,
                    image_path: imagePath,
                }),
            });
            
            const data = await response.json();

            if (!response.ok) {
                console.log("register fail");
                setRegistered(false);
            }
            else {
                console.log("register success");
                console.log(data);
                setRegistered(true);
                checkLogin();
            }
        }
    }


    return (
        <div className="registerCt">
            <div className="header">
                <img className="headerImg" src="/Spotify_Logo_RGB_Black.png"/>
            </div>
            <div className="registerPrompt">Sign up for free to start listening.</div>
            {/* <div className="failPrompt" id="failPrompt"></div> */}
            {
                !registered || tried ? 
                    <div className="loginFail">
                        <img src="/icons8-warning-67.png" />
                        <div className="incorrectUnamePass">Register failed, try again.</div>
                    </div> 
                :   <></>
            }
            <div className="registerFormCt">
                <form method="POST">
                    {/* EMAIL */}
                    <label className="registerFormLabel" htmlFor="email">What's your email?</label><br />
                    {   status === "true" ?
                            <input className="registerFormInput inputCorrect" type="email" id="email" name="email" placeholder="Enter your email." onInput={() => checkEmail()} onChange={(e) => setEmail(e.target.value)} />
                        : status === "false" ?
                            <input className="registerFormInput inputFalse" type="email" id="email" name="email" placeholder="Enter your email." onInput={() => checkEmail()} onChange={(e) => setEmail(e.target.value)} />
                        :   <input className="registerFormInput" type="email" id="email" name="email" placeholder="Enter your email." onInput={() => checkEmail()} onChange={(e) => setEmail(e.target.value)} />
                    }
                    <br />
                    <div className="invalidInput" id="invalidInput">
                        {   status === "true" ?
                                <>
                                    <img src="/icons8-checkmark-52.png" id="invalid1"/>
                                    <div className="incorrectUnamePass correctUnameInput" id="incorrect1">Email is available.</div>
                                </>
                            : status === "false" ?
                                <>
                                    <img src="/icons8-warning-67-red.png" id="invalid1"/>
                                    <div className="incorrectUnamePass incorrectUnameInput" id="incorrect1">Incorrect username or password.</div>
                                </>
                            :   <></>
                        }
                    </div>
                    <a className="registerFormLink" href="">Use phone number instead.</a><br /><br />
                    {/* EMAIL CONFIRMATION */}
                    <label className="registerFormLabel" htmlFor="emailconfirm">Confirm your email</label><br />
                    {
                        (email === confirmEmail && email.length > 0) ?
                            <input className="registerFormInput inputCorrect" type="email" id="emailconfirm" name="emailconfirm" placeholder="Enter your email again." onChange={(e) => setConfirmEmail(e.target.value)} />
                        : (email !== confirmEmail && email.length > 0) ?
                            <input className="registerFormInput inputFalse" type="email" id="emailconfirm" name="emailconfirm" placeholder="Enter your email again." onChange={(e) => setConfirmEmail(e.target.value)} />
                        :   <input className="registerFormInput" type="email" id="emailconfirm" name="emailconfirm" placeholder="Enter your email again." onChange={(e) => setConfirmEmail(e.target.value)} />
                    }
                    <br />
                    <div className="invalidInput" id="invalidInput">
                    {
                        (email === confirmEmail && email.length > 0) ?
                            <>
                                <img src="/icons8-checkmark-52.png" id="invalid1"/>
                                <div className="incorrectUnamePass correctUnameInput" id="incorrect2">Confirmation success.</div>
                            </>
                        : (email !== confirmEmail && email.length > 0) ?
                            <>
                                <img src="/icons8-warning-67-red.png" id="invalid1"/>
                                <div className="incorrectUnamePass incorrectUnameInput" id="incorrect2">Incorrect username or password.</div>
                            </>
                        :   <></>
                    }
                        {/* <img src="/icons8-warning-67-red.png" id="invalid2"/>
                        <div className="incorrectUnamePass" id="incorrect2">Confirm your correct email.</div> */}
                    </div><br />
                    {/* PASSWORD */}
                    <label className="registerFormLabel" htmlFor="password">Create a Password</label><br />
                    <input className="registerFormInput" type="password" id="password" name="password" placeholder="Create a Password." required onChange={(e) => setPassword(e.target.value)}/><br /><br />
                    {/* NAME */}
                    <label className="registerFormLabel" htmlFor="name">What is your name?</label><br />
                    <input className="registerFormInput" type="text" id="name" name="name" placeholder="Enter your name." required onChange={(e) => setName(e.target.value)}/><br /><br />
                    {/* USERNAME */}
                    <label className="registerFormLabel" htmlFor="uname">What should we call you?</label><br />
                    {
                        (usernameValid === "true" && username.length > 0) ?
                            <input className="registerFormInput inputCorrect" type="text" id="uname" name="uname" placeholder="Enter a username." onInput={() => checkUsername()} onChange={(e) => setUsername(e.target.value)} />
                        :   (!usernameValid && username.length > 0) ?
                            <input className="registerFormInput inputFalse" type="text" id="uname" name="uname" placeholder="Enter a username." onInput={() => checkUsername()} onChange={(e) => setUsername(e.target.value)} />
                        :   <input className="registerFormInput" type="text" id="uname" name="uname" placeholder="Enter a username." onInput={() => checkUsername()} onChange={(e) => setUsername(e.target.value)} />
                    }
                    <div className="invalidInput" id="invalidInput">
                    {
                        (usernameValid === "true" && username.length > 0) ?
                            <>
                                <img src="/icons8-checkmark-52.png" id="invalid3"/>
                                <div className="incorrectUnamePass correctUnameInput" id="incorrect3">Username is available.</div>
                            </>
                        :   (usernameValid === "false" && username.length > 0) ?
                            <>
                                <img src="/icons8-warning-67-red.png" id="invalid3"/>
                                <div className="incorrectUnamePass incorrectUnameInput" id="incorrect3">Incorrect username or password.</div>
                            </>
                        :   <></>
                    }
                    </div>
                    <div className="registerFormLink">This appears on your profile.</div><br /><br /><br />
                    {/* IMAGE_PATH */}
                    <label className="registerFormLabel" htmlFor="image">Upload your profile picture</label><br />
                    <input className="registerFormInput" type="text" id="image" name="imagepath" accept="image/*" onChange={(e) => setImagePath(e.target.value)}/><br /><br />
                    <img className="clippedImage" src={imagePath} /><br /><br />
                    {/* DATE OF BIRTH */}
                    <label className="registerFormLabel" htmlFor="DOB">What's your date of birth</label><br />
                    <input className="registerFormInput" type="date" id="DOB" name="DOB" placeholder="MM/DD/YYYY" onChange={(e) => setBirthdate(new Date(e.target.value))}/><br /><br />
                    {/* GENDER */}
                    <label className="registerFormLabel" htmlFor="gender">What's your gender?</label><br />
                    <div className="registerFormRadioMenu">
                        <div>
                            <input className="registerFormRadio" type="radio" id="Male" name="gender" value="Male" onChange={(e) => setGender("Male")} />
                            <label className="registerFormInputLabel" htmlFor="Male">Male</label>
                        </div>
                        <div>
                            <input className="registerFormRadio" type="radio" id="Female" name="gender" value="Female" onChange={(e) => setGender("Female")} />
                            <label className="registerFormInputLabel" htmlFor="Female">Female</label>
                        </div>
                        <div>
                            <input className="registerFormRadio" type="radio" id="Non-binary" name="gender" value="Non-binary" onChange={(e) => setGender("Non-binary")} />
                            <label className="registerFormInputLabel" htmlFor="Non-binary">Non-binary</label>
                        </div>
                        <div>
                            <input className="registerFormRadio" type="radio" id="Other" name="gender" value="Other" onChange={(e) => setGender("Other")} />
                            <label className="registerFormInputLabel" htmlFor="Other">Other</label>
                        </div>
                        <div>
                            <input className="registerFormRadio" type="radio" id="Prefer not to say" name="gender" value="Prefer not to say" onChange={(e) => setGender("Prefer not to say")} />
                            <label className="registerFormInputLabel" htmlFor="Prefer not to say">Prefer not to say</label>
                        </div>
                    </div>
                    
                    <br />
                    <br />

                    <input className="registerFormCheckBox" type="checkbox" id="marketingmsg" name="marketingmsg" value="receive" />
                    <label className="registerFormInputLabel" htmlFor="marketingmsg"> I would prefer not to receive marketing messages from Spotify</label><br />
                    <br />
                    <input className="registerFormCheckBox" type="checkbox" id="sharedata" name="sharedata" value="notshare" />
                    <label className="registerFormInputLabel" htmlFor="sharedata"> Share my registration data with Spotify's content providers for marketing purposes.</label><br /><br /><br />
                    
                    <div className="registerText">
                        By clicking on sign-up, you agree to Spotify's 
                        <a className="registerTextLink" href="">Terms and Conditions of Use</a>.
                    </div>

                    <div className="registerText">
                        To learn more about how Spotify collects, uses, shares and protects your personal data, please see 
                        <a className="registerTextLink" href="">Spotify's Privacy Policy</a>.
                        <br /><br />
                    </div>

                    <input className="registerFormBt" type="button" onClick={() => checkRegister()} value="Sign up" />

                    <div className="registerText">
                        <br />
                        Have an account?
                        <a className="registerTextLink" href="http://localhost:8080/pages/login/login.html">Log in</a>.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;