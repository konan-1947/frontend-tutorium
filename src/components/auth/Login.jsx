import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Login.css';
import { useLogin } from '../../hooks/auth/login';
import { useRegister } from '../../hooks/auth/register';

const LoginPage = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [overlayActive, setOverlayActive] = useState(false);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const toggleOverlayColor = () => {
    setOverlayActive((prev) => !prev);
  };

  const handleToggle = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setFadeClass("fade-in");
    }, 300);
    setTimeout(() => {
      setIsSignUpActive((prev) => !prev);
    }, 200);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    loginMutation.mutate({ email, password });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get('username'),
      displayname: formData.get('displayname'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    registerMutation.mutate(data);
  };

  return (
    <div className={`login-container ${isSignUpActive ? "right-panel-active" : ""}`}>
      <div className="form-container sign-in-container">
        <div className="form w-100">
          <h2 className="text-center fw-bold">Đăng nhập</h2>
          <div className="social-login">
            <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
              <FaGoogle className="me-2" /> Tiếp tục với Google
            </button>
          </div>
          <div className="separator d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2">hoặc</span>
            <hr className="flex-grow-1" />
          </div>
          <form className="text-login" onSubmit={handleSubmitLogin}>
            <div className="mb-3 text-start">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email của bạn"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label>Mật khẩu</label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Mật khẩu của bạn"
                  required
                />
                <div
                  className="input-group-text password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {loginMutation.isError && (
              <p className="text-danger">{loginMutation.error.message}</p>
            )}
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
      <div className="form-container sign-up-container">
        <div className="form w-100">
          <h2 className="text-center fw-bold">Đăng ký</h2>
          <div className="social-login">
            <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
              <FaGoogle className="me-2" /> Tiếp tục với Google
            </button>
          </div>
          <div className="separator d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2">hoặc</span>
            <hr className="flex-grow-1" />
          </div>
          <form onSubmit={handleSubmitRegister}>
            <div className="mb-3 text-start">
              <label>Tên người dùng</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Tên người dùng của bạn"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label>Tên hiển thị</label>
              <input
                type="text"
                name="displayname"
                className="form-control"
                placeholder="Tên hiển thị của bạn"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email của bạn"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label>Mật khẩu</label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="form-control password-input"
                  placeholder="Tạo mật khẩu"
                  required
                />
                <div
                  className="input-group-text password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {registerMutation.isError && (
              <p className="text-danger">{registerMutation.error.message}</p>
            )}
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
        </div>
      </div>
      <div className={`overlay-container ${overlayActive ? "overlay-active" : ""}`}>
        <div className={`overlay ${fadeClass}`}>
          <div className="text-wrapper">
            <h2 className="fade-text">{isSignUpActive ? "Chào mừng quay lại!" : "Chào bạn, người bạn thân!"}</h2>
            <p className="fade-text">
              {isSignUpActive ? "Nếu bạn đã có tài khoản, hãy đăng nhập ngay." : "Nhập thông tin của bạn và bắt đầu hành trình với chúng tôi"}
            </p>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                handleToggle();
                toggleOverlayColor();
              }}
            >
              {isSignUpActive ? "Đăng nhập" : "Đăng ký"}
            </button>
          </div>
        </div>
        <div className="overlay-fade"></div>
      </div>
    </div>
  );
};

export default LoginPage;
