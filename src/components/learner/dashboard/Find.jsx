import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/find.css';
import '../../../assets/css/schedule.css';
import { FaStar, FaHeart, FaChevronLeft, FaChevronRight, FaRegClock } from 'react-icons/fa';
import Tur from '../../../assets/img/tur.jpg';
import { Dialog, DialogContent, DialogTitle } from "./Dialog";
import { Button } from "./ButtonPopup";
import { useNavigate } from 'react-router-dom';
const TutorCard = () => {
    const [open, setOpen] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(0);
    const timeSlots = {
        night: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"],
        morning: ["05:00", "05:30", "06:00", "06:30", "07:00", "07:30"],
        evening: ["21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
    };
    const navigate = useNavigate();
    const getWeekDates = () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + currentWeek * 7);
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            return date;
        });
    };

    return (
        <div className='Container-card'>
            <div className="tutor-card border p-3 rounded container">
                <div className="row align-items-center">
                    <div className="col-md-2 tutor-image text-center">
                        <img onClick={() => navigate("/details")} src={Tur} alt="Tutor" className="tutor-avatar rounded img-fluid" />
                    </div>
                    <div className="col-md-7">
                        <div className="d-flex align-items-center">
                            <h4 className="fw-bold mb-0">Jayde B.</h4>
                            <span className="ms-2">🇺🇸</span>
                            <span className="badge bg-primary ms-2">Professional</span>
                        </div>
                        <p className="text-muted mt-1">English • 3 active students • 1 lesson</p>
                        <p className="text-muted">Speaks: English (Native), French (Beginner)</p>
                        <p className="tutor-description"><strong>Learn English in a way that suits your unique & individual style and goals!!!</strong> 🌟 Hi there! My name is Jayde. 👋</p>
                        <a href="#" className="text-decoration-none">Read more</a>
                    </div>
                    <div className="col-md-3 text-end tutor-price-rating">
                        <div className="row">
                            <div className="col-6 text-start">
                                <p className="mb-1 tutor-rating"><FaStar className="text-warning" /> <strong>5</strong></p>
                                <p className="text-muted">1 review</p>
                            </div>
                            <div className="col-6 text-end">
                                <p className="fw-bold tutor-price">$30</p>
                                <p className="text-muted">50-min lesson</p>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 text-end">
                                <FaHeart className="text-dark tutor-favorite" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 text-end">
                        <Button className="btn btn-pink me-2" onClick={() => setOpen(true)}>Book trial lesson</Button>
                        <button className="btn btn-outline-secondary">Send message</button>
                    </div>
                </div>
            </div>
            {open && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close" onClick={() => setOpen(false)}>✖</button>
                        <DialogContent>
                            <DialogTitle>Book a Trial Lesson</DialogTitle>
                            <div className="popup-header">
                                <button className="popup-arrow" onClick={() => setCurrentWeek(currentWeek - 1)}><FaChevronLeft /></button>
                                <span>{getWeekDates()[0].toDateString()} - {getWeekDates()[6].toDateString()}</span>
                                <button className="popup-arrow" onClick={() => setCurrentWeek(currentWeek + 1)}><FaChevronRight /></button>
                            </div>
                            <div className="popup-timeslots">
                                {Object.entries(timeSlots).map(([period, slots]) => (
                                    <div key={period} className="timeslot-section">
                                        <h3><FaRegClock className="me-2" />{period.charAt(0).toUpperCase() + period.slice(1)}</h3>
                                        <div className="timeslot-buttons">
                                            {slots.map((slot) => (
                                                <Button key={slot} variant="outline">{slot}</Button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
                        </DialogContent>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TutorCard;
