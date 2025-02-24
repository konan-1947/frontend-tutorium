import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Login.css';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        console.log("Toggling password visibility");
        setPasswordVisible(!passwordVisible);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        console.log("Toggling confirm password visibility");
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="login-container">
            <h2 className="text-center fw-bold">Sign Up</h2>
            <p className="text-center">
                Already have an account? <a href="#">Log in</a>
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
                        <button className="input-group-text password-toggle" onClick={togglePasswordVisibility} type="button">
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="mb-3 text-start">
                    <label>Confirm Password</label>
                    <div className="input-group">
                        <input 
                            type={confirmPasswordVisible ? "text" : "password"} 
                            className="form-control password-input" 
                            placeholder="Confirm your password"
                        />
                        <button className="input-group-text password-toggle" onClick={toggleConfirmPasswordVisibility} type="button">
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="d-flex align-items-center my-3 text-start">
                    <input type="checkbox" className="form-check-input me-2" id="agreeTerms" />
                    <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
                    </label>
                </div>
                <button className="btn btn-primary w-100" style={{ backgroundColor: '#ff66a3', border: 'none' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
