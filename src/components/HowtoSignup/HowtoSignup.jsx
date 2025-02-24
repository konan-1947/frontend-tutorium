import "../../assets/css/HowtoSignUp.css"; // Import CSS
import React from "react";
import { useNavigate } from "react-router-dom";
const HowtoSignUp = () => {
  const Navigate = useNavigate();
  
  return (
    
    <div className="howto-signup-container">
      <div className="signup-content">
        <h1 className="title">
          Make a living by teaching the largest community of learners worldwide
        </h1>

        {/* Step Progress */}
        <div className="steps-container">
          <div className="step completed">
            <span className="step-number">✔</span>
            <h3>Sign up</h3>
            <p>to create your tutor profile</p>
          </div>
          <div className="step active">
            <span className="step-number">2</span>
            <h3>Get approved</h3>
            <p>by our team in 5 business days</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Start earning</h3>
            <p>by teaching students all over the world!</p>
          </div>
        </div>

        {/* Register Button */}
        <button className="register-button" onClick={() => Navigate ("/TutorRegister")}>Finish registration</button>

        {/* Benefits Section */}
        <div className="benefits-container">
          <div className="benefit">
            <h2>Set your own rate</h2>
            <p>
              Choose your hourly rate and change it anytime. On average, English
              tutors charge $15-25 per hour.
            </p>
          </div>
          <div className="benefit">
            <h2>Teach anytime, anywhere</h2>
            <p>
              Decide when and how many hours you want to teach. No minimum time
              commitment or fixed schedule. Be your own boss!
            </p>
          </div>
          <div className="benefit">
            <h2>Grow professionally</h2>
            <p>
              Attend professional development webinars and get tips to upgrade
              your skills. You’ll get all the help you need from our team to grow.
            </p>
          </div>
        </div>
      </div>

    

    </div>
  );
};

export default HowtoSignUp;
