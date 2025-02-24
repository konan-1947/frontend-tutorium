import React from "react";
import "../../../assets/css/StepAbout.css";
import Form from 'react-bootstrap/Form';

const StepAbout = ({ nextStep }) => {
    return (
        <div className="step-about">
            <h2>About</h2>
            <p>Start creating your public tutor profile.</p>
            <form>
                <label>First Name</label>
                <input type="text" placeholder="Your first name" />

                <label>Last Name</label>
                <input type="text" placeholder="Your last name" />

                <label>Email</label>
                <input type="email" placeholder="Your email" />

                <label>Country of Birth</label>
                <select>
                    <option>Aland Islands</option>
                    <option>Vietnam</option>
                </select>

                <label>Subject you teach</label>
                <select>
                    <option>English</option>
                    <option>Math</option>
                </select>
                <Form.Label htmlFor="exampleColorInput">Chọn màu da của bạn</Form.Label>
                <Form.Control
                    type="color"
                    id="exampleColorInput"
                    defaultValue="#563d7c"
                    title="Choose your color"
                />
                <button type="button" onClick={nextStep}>
                    Save and Continue
                </button>
            </form>
        </div>
    );
};

export default StepAbout;
