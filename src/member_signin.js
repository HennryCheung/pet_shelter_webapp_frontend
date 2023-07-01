import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from './member_signinValidation';
import { encrypt } from 'n-krypta';
import { GoogleLogin } from 'react-google-login';
import "./signin.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

function MemberSignIn(){
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    
    const username = values.username;
    const password = values.password;
    const secretKey = "12345678123456781234567812345678";

    const [isNotVerify,setVerification] = useState(true);

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const clientId = "698962701202-v9qqu7b05m7pdfg7e1gg2qst86hal169.apps.googleusercontent.com";

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(validation(values));

        const encrypted_username = encrypt(username,secretKey);

        if(errors.username === "" && errors.password === ""){
            axios.post("http://localhost:4000/memberSignIn",{encrypted_username,password})
            .then(res => {
                if(res.data === "success"){
                    navigate("/memberhome");
                }else{
                    alert("No record existed");
                }
            })
            .catch(err => console.log(err));
        }
    }

    const onSuccess = (res) => {
        console.log("Sign In Success! Current user: ", res.profileObj);
        navigate("/memberhome");
    }

    const onFailure = (res) => {
        console.log("Sign In Faile!",res);
    }

    const handleChange =() => {
        setVerification(false);
    }

    
    const handleToggle=()=>{
        if(type === "password"){
            setType("text");
            setIcon(eye);
        }else{
            setType("password");
            setIcon(eyeOff);
        }
    }

    return(
        <div className="container">
            <div className="image">
                <img src="/images/cat3.jpg" alt=""/>
                <img src="/images/cat4.jpg" alt="" className="cat4"/>
            </div>
            <div className="signin_container">
            <h1>Sign In</h1>
            <form action='' onSubmit={handleSubmit}>
                <p className='input_field'>
                    <input type='text' name="username" onChange={handleInput} placeholder='username' className='signin_input'/>
                    <p className='errorMsg'>{errors.username && <span className='text-danger'>{errors.username}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type={type} name="password" onChange={handleInput} placeholder='password' className='signin_input'/>
                    <span className='member_signin_eyeoff' onClick={handleToggle}><Icon icon={icon} size={22}/></span>
                    <p className='errorMsg'>{errors.password && <span className='text-danger'>{errors.password}</span>}</p>
                </p>
                <div className='memberchangepassword'><Link to="/memberchangepassword" className='memberchangepassword_link'>Forget Password?</Link></div>
                <div className='ReCAPTCHA'>
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='btn_signin' disabled={isNotVerify}>Sign In</button>
                <div id='signInButton'>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText='Sign In with Google'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} 
                    />
                </div>
                <div className='SignUpLink'>Not have an account yet?  <Link to="/membersignup" className='signup'>Create Account</Link></div>
            </form>
            </div>
        </div>
    )
}

export default MemberSignIn;