import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS
import Tur from '../assets/img/tur.jpg';
import Tutor1 from '../assets/img/tutor1.jpg';
import Tutor2 from '../assets/img/tutor2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Carousel.css';

const BootstrapCarousel = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Khởi tạo AOS với thời gian animation 1s
    }, []);

    return (
        <div>
            <div className='caro-section' data-aos="fade-up">
                <div className='title-text'>
                    <h1>Find the <span className="text-effect"> right tutor </span> for you.</h1>
                </div>
                <p className='d-flex justify-content-center lead'>With over 30,000 tutors and 1M+ learners, we know language learning.</p>
            </div>
            <div className='carousel-section' data-aos="fade-up">
                <Carousel fade className='carousel-container'>
                    <Carousel.Item data-aos="fade-right">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src={Tur} alt="First slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Nhật Mingg</h3>
                                    <h5>Gia sư Valorant, Game</h5>
                                    <p>"Người bị gia sư đăng dí"</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item data-aos="fade-left">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src={Tutor1} alt="Second slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Anh Lương</h3>
                                    <h5>Gia sư TFT</h5>
                                    <p>"tôi bel"</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item data-aos="fade-up">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src={Tutor2} alt="Third slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Nguyễn Đình Đăng</h3>
                                    <h5>Gia sư code</h5>
                                    <p>"tôi chưa bao h gánh nhóm lz như này"</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default BootstrapCarousel;
