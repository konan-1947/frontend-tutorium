import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Login.css';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        console.log("Toggling password visibility");
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container">
            <h2 className="text-center fw-bold">Log in</h2>
            <p className="text-center">
                <a href="#">Sign up as a student</a> or <a href="#">Sign up as a tutor</a>
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
                            style={{ paddingRight: '2.5rem' }}
                        />
                        <div className="input-group-text password-toggle" onClick={togglePasswordVisibility}>
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
                <button className="btn btn-primary w-100" style={{ backgroundColor: '#ff66a3', border: 'none' }}>Log in</button>
            </form>
            <div className="d-flex align-items-center my-3 text-start">
                    <input type="checkbox" className="form-check-input me-2" id="agreeTerms" />
                    <label className="form-check-label" htmlFor="agreeTerms">
                        By clicking Log in or Continue with, you agree to Preply <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
                    </label>
                </div>
        </div>
    );
};

export default LoginPage;
	
