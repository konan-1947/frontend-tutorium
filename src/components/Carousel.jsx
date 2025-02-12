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
                                <img className='carousel-image' src='https://cdn.openart.ai/published/TpMyCOsIEDaMexNkx5RS/JVBJx16G_i47Y_1024.webp' alt="First slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Adof Hitler</h3>
                                    <h5>Gia sư Hoả Thuật, Mỹ Thuật</h5>
                                    <p>"Das ist es, was ich tun muss"</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item data-aos="fade-left">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src='https://media.discordapp.net/attachments/1017704744103460929/1338940776792592576/Z.png?ex=67ace945&is=67ab97c5&hm=30a3d9c11ff05c26677f4071711ac2fd7ddde72054f9c88a771e5d31fa2ad95b&=&format=webp&quality=lossless&width=345&height=228' alt="Second slide" />
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
                                <img className='carousel-image' src='https://atosa.asia/wp-content/uploads/2023/10/chat-gpt-1.jpg' alt="Third slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Gia sư GPT</h3>
                                    <h5>Vua của GIA SƯ</h5>
                                    <p>"Biết tuốt nhưng không nói nhiều – trừ khi được hỏi!"</p>
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
