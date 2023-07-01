import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import validation from "./SignUpValidation";
import axios from 'axios';
import {encrypt} from 'n-krypta';
import "./signup.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

function CharityWorkerSignup(){
    const [values, setValues] = useState({
        workerID: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const workerID = values.workerID;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const email = values.email;
    const password = values.password;
    const secretKey = "12345678123456781234567812345678";

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
        const encrypted_workerID = encrypt(workerID,secretKey);
        const encrypted_firstname = encrypt(firstName,secretKey);
        const encrypted_lastname = encrypt(lastName,secretKey);
        const encrypted_email = encrypt(email,secretKey);

        if(errors.workerID === "" && errors.firstName === "" && errors.lastName === "" && errors.email === "" && errors.password === ""){
            axios.post("http://localhost:4000/charityworkerSignUp",{encrypted_workerID,encrypted_firstname,encrypted_lastname,encrypted_email,password})
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err));
        }
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
            <form action='' onSubmit={handleSubmit}>
                <p className='input_field'>
                    <input type='text' placeholder='Worker ID' name="workerID" onChange={handleInput} className='signup_input'/>
                     <p className='errorMsg'>{errors.workerID && <span className='text-danger'>{errors.workerID}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type='text' placeholder='First name' name="firstName" onChange={handleInput} className='signup_input'/>
                     <p className='errorMsg'>{errors.firstName && <span className='text-danger'>{errors.firstName}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type='text' placeholder='Last name' name="lastName" onChange={handleInput} className='signup_input'/>
                     <p className='errorMsg'>{errors.lastName && <span className='text-danger'>{errors.lastName}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type='email' placeholder='Email' name="email" onChange={handleInput} className='signup_input'/>
                      <p className='errorMsg'>{errors.email && <span className='text-danger'>{errors.email}</span>}</p>
                </p>
                <p className='input_field'>
                    <input type={type} placeholder='Password' name="password" onChange={handleInput} className='signup_input'/>
                    <span className='signup_eyeoff' onClick={handleToggle}><Icon icon={icon} size={22}/></span>
                     <p className='errorMsg'>{errors.password && <span className='text-danger'>{errors.password}</span>}</p>
                </p>
                <div className='ReCAPTCHA'>
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='btn_signup'  disabled={isNotVerify}>Create Account</button>
                <div className="SignInLink">Already have an account? <Link to="/" className='signin'>Sign In</Link></div>
            </form>
            </div>
        </div>
    )
}

export default CharityWorkerSignup;