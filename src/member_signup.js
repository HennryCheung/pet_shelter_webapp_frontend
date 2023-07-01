import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from './member_signupValidation';
import {encrypt} from 'n-krypta';
import { GoogleLogin } from 'react-google-login';
import "./signup.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

function MemberSignUp(){
    const [values, setValues] = useState({
        id: '',
        userName: '',
        email: '',
        password: ''
    })

    const Id = values.id;
    const userName = values.userName;
    const email = values.email;
    const password = values.password;
    const secretKey = "12345678123456781234567812345678";
    
    const clientId = "698962701202-v9qqu7b05m7pdfg7e1gg2qst86hal169.apps.googleusercontent.com";

    const [isNotVerify,setVerification] = useState(true);

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(validation(values));

        const encrypted_username = encrypt(userName,secretKey);
        const encrypted_email = encrypt(email,secretKey);
        //console.log("username:" + encrypted_username);
        //console.log("email:" + encrypted_email);

        if(errors.userName === "" && errors.email === "" && errors.password === ""){
            axios.post("http://localhost:4000/checkMemberExist",encrypted_username)
                .then(res => {
                    if(res.data === "found"){
                        console.log("the username is existed");
                    }else if(res.data === "not found"){
                        axios.post("http://localhost:4000/memberSignUp",{Id,encrypted_username,encrypted_email,password})
                        .then(res => {
                            if(res.data.registered){
                                navigate("/membersignin");
                            }else{
                                alert("register fail");
                            }
                        })
                        .catch(err => console.log(err));
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

    return (
        <div className="container">
            <div className="image">
                <img src="/images/cat1.jpg" alt=""/>
                <img src="/images/cat2.jpg" alt="" className="cat2"/>
            </div>
            <div className="signup_container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <p className='input_field'>
                    <input type='text' name="userName" placeholder="username" onChange={handleInput} className='signup_input'/>
                    <p className='errorMsg'>{errors.userName && <span className='text-danger'>{errors.userName}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type='email' name="email" onChange={handleInput} placeholder='email' className='signup_input'/>
                    <p className='errorMsg'>{errors.email && <span className='text-danger'>{errors.email}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type={type} name="password" onChange={handleInput} placeholder='password' className='signup_input'/>
                    <span className='member_signup_eyeoff' onClick={handleToggle}><Icon icon={icon} size={22}/></span>
                    <p className='errorMsg'>{errors.password && <span className='text-danger'>{errors.password}</span>}</p>
                </p>
                <div className='ReCAPTCHA'>
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='btn_signup' disabled={isNotVerify}>Create Account</button>
                <div id='signInButton'>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText='Sign Up with Google'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} 
                    />
                </div>
                <div className="SignInLink">Already have an account? <Link to="/membersignin" lassName='signin'>Sign In</Link></div>
            </form>
            </div>
        </div>
    )
}

export default MemberSignUp;