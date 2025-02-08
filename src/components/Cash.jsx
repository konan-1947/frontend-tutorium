import React from 'react';
import '../assets/css/cash.css';
import TutorImage from '../assets/img/tur.jpg';

const Cashing = () => {
    return (
        <div className="cashing-container">
            <div className="order-summary">
                <div className="tutor-info">
                    <img src={TutorImage} alt="Tutor" className="tutor-img" />
                    <div>
                        <h2 className="tutor-name">Cristina P.</h2>
                        <p>English - Verified - Professional</p>
                    </div>
                </div>
                <p><strong>Sunday, February 9 at 01:30</strong></p>
                <p className="time-note">Time is based on your location</p>
                <hr />
                <h3>Your order</h3>
                <p>25-min lesson: <span className="price">$9.60</span></p>
                <p>Processing fee: <span className="price">$0.30</span></p>
                <h3>Total: <span className="total-price">$9.90</span></h3>
                <a href="#" className="promo-code">Have a promo code?</a>
                <div className="refund-policy">
                    <p>✅ Free replacement or refund</p>
                    <p>Try another tutor for free or get a refund</p>
                </div>
            </div>
            <div className="payment-section">
                <h2>Choose how to pay</h2>
                <div className="payment-options">
                    <button className="payment-btn">💳 Card</button>
                    <button className="payment-btn">💰 PayPal</button>
                </div>
                <input type="text" placeholder="1234 1234 1234 1234" className="input-field" />
                <div className="card-details">
                    <input type="text" placeholder="MM/YY" className="input-field small" />
                    <input type="text" placeholder="CVC" className="input-field small" />
                </div>
                <label className="checkbox-container">
                    <input type="checkbox" /> Save this card for future payments
                </label>
                <button className="confirm-btn">Confirm payment · $9.90</button>
                <p className="payment-note">By pressing the "Confirm payment" button, you agree to the <a href="#">Refund and Payment Policy</a></p>
                <p className="secure-text">It’s safe to pay. All transactions are protected by SSL encryption.</p>
            </div>
        </div>
    );
};

export default Cashing;
