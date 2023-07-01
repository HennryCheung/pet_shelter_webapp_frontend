import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { encrypt } from 'n-krypta';
import './changepassword.css';
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

function CharityWorkerChangePassword(){
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const email = values.email;
    const password = values.password;
    const [new_password, setNewPassword] = useState("");
    const [confirm_new_password, setCofirmNewPassword] = useState("");
    const secretKey = "12345678123456781234567812345678";

    const [isNotVerify,setVerification] = useState(true);

    const [password_type, setPasswordType] = useState("password");
    const [password_icon, setPasswordIcon] = useState(eyeOff);

    const [newpassword_type, setNewPasswordType] = useState("password");
    const [newpassword_icon, setNewPasswordIcon] = useState(eyeOff);


    const [confirmnewpassword_type, setConfirmNewPasswordType] = useState("password");
    const [confirmnewpassword_icon, setConfirmNewPasswordIcon] = useState(eyeOff);
   
    const [found, setFound] = useState("");
    const [error, setError] = useState("");
    const password_pattern = /^(?=.*\b)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log(email);
        const encrypted_email = encrypt(email,secretKey);
        //console.log(encrypted_email);

        //check email
        axios.post("http://localhost:4000/charityworker",{encrypted_email,password})
            .then(res => {
                if(res.data.found){
                    setFound("true");
                    console.log("found");
                }else{
                    setFound("false");
                    console.log("not found");
                }
            })
            .catch(err => console.log(err));
        
        if(found === "true"){
            if(!password_pattern.test(new_password)){
                setError("Password that contains 8 numbers or letters must be started with uppercase letter");
            }else if(new_password !== confirm_new_password){
                setError("The new password is not the same as the confirmed new password")
            }else{
                axios.post("http://localhost:4000/charityworkerChangePassword",{encrypted_email,confirm_new_password})
                    .then(res => {
                        if(res.data.updated){
                            navigate("/");
                        }else{
                            alert("not changed");
                        }
                    })
                    .catch(err => console.log(err));
            }
        }else if(found === "false"){
            setError("The worker is not found or the password is incorrect");
        }
    }

    const handleChange =() => {
        setVerification(false);
    }

    const handlePasswordToggle = () => {
        if(password_type === "password"){
            setPasswordType("text");
            setPasswordIcon(eye);
        }else{
            setPasswordType("password");
            setPasswordIcon(eyeOff);
        }
    }

    const handleNewPasswordToggle = () => {
        if(newpassword_type === "password"){
            setNewPasswordType("text");
            setNewPasswordIcon(eye);
        }else{
            setNewPasswordType("password");
            setNewPasswordIcon(eyeOff);
        }
    }

    const handleConfirmNewPasswordToggle = () => {
        if(confirmnewpassword_type === "password"){
            setConfirmNewPasswordType("text");
            setConfirmNewPasswordIcon(eye);
        }else{
            setConfirmNewPasswordType("password");
            setConfirmNewPasswordIcon(eyeOff);
        }
    }

    return(
        <div className="container">
             <div className="image">
                <img src="/images/cat3.jpg" alt=""/>
                <img src="/images/cat4.jpg" alt="" className="cat6"/>
            </div>
            <div className="changepassword_container">
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <input type='email' name='email' placeholder="email" onChange={handleInput} className='changepassword_input' required/>
                </p>
                <p>
                    <input type={password_type} name='password' placeholder="password" onChange={handleInput} className='changepassword_input' required/>
                    <span className='password_eye' onClick={handlePasswordToggle}><Icon icon={password_icon} size={22}/></span>
                </p>
                <p>
                    <input type={newpassword_type} name='new_password' onChange={(e) => setNewPassword(e.target.value)} placeholder='new password' className='changepassword_input' required/>
                    <span className='newpassword_eye' onClick={handleNewPasswordToggle}><Icon icon={newpassword_icon} size={22}/></span>
                </p>
                <p>
                    <input type={confirmnewpassword_type} name='confirm_new_password' placeholder="confirm new password" onChange={(e) => setCofirmNewPassword(e.target.value)} className='changepassword_input' required/>
                    <span className='confirmnewpassword_eye' onClick={handleConfirmNewPasswordToggle}><Icon icon={confirmnewpassword_icon} size={22}/></span>
                </p>
                <p className='errorMsg'>{error}</p>
                <div className='ReCAPTCHA'>
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={handleChange}
                    />
                </div>
                <p><button type='submit' className='btn_changepassword' disabled={isNotVerify}>Change password</button></p>
            </form>
            </div>
        </div>
    )
}

export default CharityWorkerChangePassword;