import React, { useState } from 'react';
import '../assets/css/profile.css';

const ProfileSettings = () => {
    const [profileImage, setProfileImage] = useState('/assets/img/default-avatar.png');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            <h1>Account Settings</h1>
            <div className="profile-image-section">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <label className="upload-button">
                    Upload photo
                    <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>
            </div>
            <div className="profile-form">
                <label>First name *</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                
                <label>Last name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />

                <button className="save-button">Save changes</button>
            </div>
        </div>
    );
};

export default ProfileSettings;
