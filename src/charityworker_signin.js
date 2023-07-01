import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import validation from './SignInValidation';
import axios from 'axios';
import {encrypt} from 'n-krypta';
import "./signin.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';


function CharityWorkerSignin(){
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [isNotVerify,setVerification] = useState(true);

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    
    const email = values.email;
    const password = values.password;
    const secretKey = "12345678123456781234567812345678";


    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleChange =() => {
        setVerification(false);
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(validation(values));
        const encrypted_email = encrypt(email,secretKey);

        if(errors.email === "" && errors.password === ""){
            axios.post("http://localhost:4000/charityworkerSignIn",{encrypted_email,password})
            .then(res => {
                if(res.data === "Success"){
                    navigate("/home");
                }else{
                    alert("No record existed");
                }
            })
            .catch(err => console.log(err));
        }
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
                    <input type='email' placeholder='Email' name="email" onChange={handleInput} className='signin_input'/>
                     <p className='errorMsg'>{errors.email && <span className='text-danger'>{errors.email}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type={type} placeholder='Password' name="password" onChange={handleInput} className='signin_input'/>
                    <span className='charityworker_signin_eyeoff' onClick={handleToggle}><Icon icon={icon} size={22}/></span>
                    <p className='errorMsg'>{errors.password && <span className='text-danger'>{errors.password}</span>}</p>
                </p>
                <div className='changepassword'><Link to="/changepassword" className='changepassword_link'>Forget Password?</Link></div>
                <div className='ReCAPTCHA'>
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='btn_signin' disabled={isNotVerify}>Sign In</button>
                <div className='SignUpLink'>Not have an account yet?  <Link to="/signup" className='signup'>Create Account</Link></div>
            </form>
            </div>
        </div>
    )
}

export default CharityWorkerSignin;