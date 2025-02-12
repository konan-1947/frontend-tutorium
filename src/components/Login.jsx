import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Login.css';
import useLogin from '../hooks/auth/login';
import useRegister from '../hooks/auth/register';

const LoginPage = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fadeClass, setFadeClass] = useState("fade-in");
    const [overlayActive, setOverlayActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerData, setRegisterData] = useState({
        username: '',
        displayname: '',
        email: '',
        password: ''
    });
    const { login, loading, error } = useLogin();
    const { register, loading: registerLoading, error: registerError } = useRegister();

    const handleToggle = () => {
        setFadeClass("fade-out");
        console.log("Toggle clicked");
        setTimeout(() => {
            setFadeClass("fade-in");
        }, 300);
        setTimeout(() => {
            setIsSignUpActive((prev) => !prev);
        }, 200);
    };

    const toggleOverlayColor = () => {
        setOverlayActive(prev => !prev);
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        await register(registerData);
    };

    return (
        <div className={`login-container ${isSignUpActive ? "right-panel-active" : ""}`}>
            <div className="form-container sign-in-container">
                <div className="form">
                    <h2 className="text-center fw-bold">Log in</h2>
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
                    <form className='text-login' onSubmit={handleSubmitLogin}>
                        <div className="mb-3 text-start">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Password</label>
                            <div className="input-group">
                                <input type={passwordVisible ? "text" : "password"} className="form-control" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <div className="input-group-text password-toggle" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button className="btn btn-primary w-100" type="submit" disabled={loading}>{loading ? "Logging in..." : "Log in"}</button>
                    </form>
                </div>
            </div>
            <div className="form-container sign-up-container">
                <div className="form">
                    <h2 className="text-center fw-bold">Sign Up</h2>
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
                    <form onSubmit={handleSubmitRegister}>
                        <div className="mb-3 text-start">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Your username" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} required />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Display Name</label>
                            <input type="text" className="form-control" placeholder="Your display name" value={registerData.displayname} onChange={(e) => setRegisterData({ ...registerData, displayname: e.target.value })} required />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Your email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
                        </div>
                        <div className="mb-3 text-start">
                            <label>Password</label>
                            <div className="input-group">
                                <input type="password" className="form-control password-input" placeholder="Create a password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
                            </div>
                        </div>
                        {registerError && <p className="text-danger">{registerError}</p>}
                        <button className="btn btn-primary w-100" type="submit" disabled={registerLoading}>{registerLoading ? "Signing up..." : "Sign Up"}</button>
                    </form>
                </div>
            </div>
            <div className={`overlay-container ${overlayActive ? "overlay-active" : ""}`}>
                <div className={`overlay ${fadeClass}`}>
                    <div className="text-wrapper ">
                        <h2 className="fade-text">{isSignUpActive ? "Welcome Back!" : "Hello, Friend!"}</h2>
                        <p className="fade-text">{isSignUpActive ? "If you already have an account, log in now." : "Enter your details and start your journey with us"}</p>
                        <button className="btn btn-outline-light" onClick={() => { handleToggle(); toggleOverlayColor(); }}>
                            {isSignUpActive ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </div>
                <div className='overlay-fade'></div>
            </div>
        </div>
    );
};

export default LoginPage;
