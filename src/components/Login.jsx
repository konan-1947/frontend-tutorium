import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Login.css';


const LoginPage = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [fadeClass, setFadeClass] = useState("fade-in");
    const [overlayActive, setOverlayActive] = useState(false); // Thêm state cho overlay

    const handleToggle = () => {
        setFadeClass("fade-out");
        console.log("Toggle clicked");
        setTimeout(() => {
            setFadeClass("fade-in");

        }, 300); // Delay phù hợp với transition trong CSS
        setTimeout(() => {
            setIsSignUpActive((prev) => !prev);
        }, 200);
    }


    const toggleOverlayColor = () => {
        setOverlayActive(prev => !prev); // Toggle class overlay-active
    };

    return (
        <div className={`login-container ${isSignUpActive ? "right-panel-active" : ""}`}>
            {/* Sign In Form */}
            <div className="form-container sign-in-container">
                <div className="form">
                    <h2 className="text-center fw-bold">Log in</h2>
                    <p className="text-center">

                    </p>
                    <div className="social-login">
                        <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
                            <FaGoogle className="me-2" /> Continue with Google
                        </button>
                    </div>
                    <div className="separator d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2">or</span>
                        <hr className="flex-grow-1" />
                    </div>
                    <form className='text-login'>
                        <div className="mb-3 text-start">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Your email" />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Your password"
                                />
                                <div className="input-group-text password-toggle" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <a href="#" className="text-decoration-none">Forgot your password?</a>
                        </div>
                        <div className="form-check my-3 text-start">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button className="btn btn-primary w-100">Log in</button>
                    </form>
                </div>
            </div>

            {/* Sign Up Form */}
            <div className="form-container sign-up-container">
                <div className="form">
                    <h2 className="text-center fw-bold">Sign Up</h2>
                    <p className="text-center">
                        Already have an account? <a href="#" onClick={() => setIsSignUpActive(false)}>Log in</a>
                    </p>
                    <div className="social-login">
                        <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
                            <FaGoogle className="me-2" /> Continue with Google
                        </button>
                    </div>
                    <div className="separator d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2">or</span>
                        <hr className="flex-grow-1" />
                    </div>
                    <form>
                        <div className="mb-3 text-start">
                            <label>Full Name</label>
                            <input type="text" className="form-control" placeholder="Your full name" />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Your email" />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control password-input"
                                    placeholder="Create a password"
                                />
                                <div className="input-group-text password-toggle" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary w-100">Sign Up</button>
                    </form>
                </div>
            </div>

            {/* Overlay Panel */}
            <div className={`overlay-container ${overlayActive ? "overlay-active" : ""}`} >
               
                    <div className={`overlay ${fadeClass}`}>
                 
                        <div className="text-wrapper ">
                            
                            <h2 className="fade-text">{isSignUpActive ? "Welcome Back!" : "Hello, Friend!"}</h2>
                            <p className="fade-text">
                                {isSignUpActive ? "If you already have an account, log in now." : "Enter your details and start your journey with us"}
                            </p>
                            <button className="btn btn-outline-light" onClick={() => { handleToggle(); toggleOverlayColor(); }}>
                                {isSignUpActive ? "Sign In" : "Sign Up"}
                            </button>

                        </div>
                    </div>
               
                <div className='overlay-fade'>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
