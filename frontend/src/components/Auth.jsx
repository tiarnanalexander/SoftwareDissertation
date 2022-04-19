import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import data from '../data/University.json';
import { Navbar } from './index';
import { useLocation} from "react-router-dom"

const cookies = new Cookies();
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatarURL: '',
    institution: '',
    course: '',
}

const Auth = () => {

    const location = useLocation();

    const prevState = () => {
        if(!location.state){
            return false
        }
        return location.state
    }

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(prevState);
    const [emailCheck, setCheckEmail] = useState(false);
    const [mail, setMail] = useState("");
    const [errors, setErrors] = useState("");
    const [loginError, setLoginError] = useState("");
    const [usernameError, setUsernameError] = useState("")
   
    const handleChange = async (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoginError("");
        setErrors("")
        setUsernameError("")
        
    }, [])

    const options = () => {
        if (mail === "uwe") {
            return (
                <select name="course" id="course" onChange={e => { handleChange(e) }} required>
                    <option value="">Select Your Course</option>
                    <option value="Maths">Maths</option>
                    <option value="Computing">Computer Science</option>
                    <option value="Software">Software Engineering</option>
                    <option value="Philosophy">Philosophy</option>
                </select>

            )
        }
        else {
            return (
                <select name="course" id="course" onChange={e => { handleChange(e) }} required>
                    <option value="">Select Your Course</option>
                    <option value="Economics">Economics</option>
                    <option value="Biology">Biology</option>
                    <option value="Sociology">Sociology</option>
                    <option value="Philosophy">Philosophy</option>
                </select>

            )
        }
    }


    const handleEmail = (e) => {

        setCheckEmail(false)
        if (e.target.value === "uwe") {

            setMail("uwe");
            setCheckEmail(true)
        }
        if (e.target.value === "bristol") {
            setMail("Bristol University");
            setCheckEmail(true)
        }

    }

    const validate = (e) => {
        setErrors(" ")
        if (e.target.value != undefined) {
            if (form.password != e.target.value) {
                setErrors("Password does not match");

            }
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        setErrors("");
        setUsernameError("");
        
        const { username, password, email, avatarURL, institution, course } = form;


        //Change to localhost:5000/auth if dev
        const URL = 'http://localhost:5000/auth';



        try {
            const { data: { token, userId, hashedPassword, fullName, university } } 
            = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, email, avatarURL, 
                institution, course
            })

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);
            cookies.set('university', university);
            


            if (isSignup) {
                cookies.set('email', email);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
                cookies.set('institution', institution);
                cookies.set('course', course);
            }

            window.location.reload();

        }
        catch (err) {

            if (!err?.response) {
                setLoginError('No Server Response');
            } else if (err.response?.status === 400) {
                setLoginError('Incorrect Username or Password');
            } else if (err.response?.status === 401) {
                setLoginError('Incorrect Username or Password');
            }
            else if (err.response?.status === 409) {
                setUsernameError('Username already taken');

            } else {
                setLoginError('Login Failed');
            }

        }



    }
    const switchMode = () => {
        setLoginError("");
        setErrors("")
        setUsernameError("")
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }


    //   data.Universities.map(e => {
    //       setCourse(e['Bristol University'].Courses[1].name);


    // })

    return (
        <div className='auth_form_background'>
            <Navbar />
            <div className="auth__form-container">
                <div className={isSignup ? 'auth__form-container_fields' : 'auth__form-container_fields_signin'}>
                    <div className={isSignup ? 'auth__form-container_fields-content' : 'auth__form-container_fields-content_signin'}>
                        <p>{isSignup ? 'Sign Up' : 'Sign in'}</p>
                        <form onSubmit={handleSubmit}>
                            {isSignup && (
                                <div className={'auth__form-container_fields-content_input'}>
                                    <label htmlFor="fullName"> Full Name </label>
                                    <input
                                        name="fullName"
                                        type="text"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            )}
                            <div className={isSignup ? 'auth__form-container_fields-content_input' : 'auth__form-container_fields-content_input_signin'}>
                                <label htmlFor="fullName"> username </label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="error">{usernameError}</label>
                            </div>

                            <div className={isSignup ? 'auth__form-container_fields-content_input' : 'auth__form-container_fields-content_input_signin'}>
                                <label htmlFor="password"> Password </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="error"> {errors} {loginError}</label>
                            </div>
                            {isSignup && (
                                <div className={'auth__form-container_fields-content_input'}>
                                    <label htmlFor="confirmPassword"> Confirm Password </label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={e => { handleChange(e); validate(e) }}
                                        required
                                    />
                                </div>

                            )}
                            {isSignup && (
                                <div className={'auth__form-container_fields-content_input'}>
                                    <label htmlFor="email"> Email </label>
                                    <input
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            )}
                            {isSignup && (
                                <div className={'auth__form-container_fields-content_input'}>
                                    <label htmlFor="institution"> Institution </label>
                                    <select name="institution" id="institution" onChange={e => { handleChange(e); handleEmail(e) }} required>
                                        <option value="" selected disabled >Select Your University</option>
                                        <option value="uwe">University of West of England (Bristol)</option>
                                        <option value="bristol">Bristol University</option>
                                    </select>
                                </div>

                            )}
                            {isSignup && emailCheck && (
                                <div className={'auth__form-container_fields-content_input w-72'}>
                                    <label htmlFor="course">Course</label>
                                    {options()}
                                </div>

                            )}
                            {isSignup && emailCheck && (
                                <div className="auth__form-container_fields-content_input avatar-url_box">
                                    <label htmlFor="avatarURL"> Avatar URL </label>
                                    <input
                                        name="avatarURL"
                                        type="text"
                                        placeholder="Enter an image URL"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            )}
                            {isSignup && emailCheck && (


                                <div className="verify_box">

                                    <input
                                        name="verify"
                                        type="checkbox"
                                        placeholder="Username"
                                        required
                                    />

                                    <label>
                                        I confirm I am a student at {mail}
                                    </label>
                                    <label htmlFor="error">{loginError}</label>
                                </div>


                            )}

                            <div className="auth__form-container_fields-content_button">
                                <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                            </div>
                        </form>
                        <div className="auth__form-container_fields-account">
                            <p>
                                {isSignup
                                    ? "Already have an account?" : "Don't have an account?"}
                                <span onClick={switchMode}>
                                    {isSignup ? ' Sign In' : ' Sign Up'}
                                </span>
                            </p>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Auth
