import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS
import Tur from '../../assets/img/tur.jpg';
import Tutor1 from '../../assets/img/tutor1.jpg';
import Tutor2 from '../../assets/img/tutor2.jpg';
import Tutor3 from '../../assets/img/tutor3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Carousel.css';

const BootstrapCarousel = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Khởi tạo AOS với thời gian animation 1s
    }, []);

    return (
        <div>
            <div className='caro-section' data-aos="fade-up">
                <div className='title-text'>
                    <h1>Tìm ngay <span className="text-effect"> Gia sư </span> cho bạn.</h1>
                </div>
                <p className='d-flex justify-content-center lead'>Với hơn 30.000 gia sư và hơn 1 triệu học viên, chúng tôi hiểu rõ về việc giảng dạy.</p>
            </div>
            <div className='carousel-section' data-aos="fade-up">
                <Carousel fade className='carousel-container'>
                    <Carousel.Item data-aos="fade-right">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src={Tutor1} alt="First slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Nguyễn Hữu Quân</h3>
                                    <h5>Gia sư Toán</h5>
                                    <p>"Toán khó hãy để thầy Quân lo"</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item data-aos="fade-left">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src={Tutor2} alt="Second slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Nguyễn Văn Hường</h3>
                                    <h5>Gia sư hoá</h5>
                                    <p>"Hãy bắt đầu từ những điều đơn giản nhất!"</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item data-aos="fade-up">
                        <div className='carousel-content'>
                            <div className='image-container'>
                                <img className='carousel-image' src={Tutor3} alt="Third slide" />
                            </div>
                            <div className='text-container'>
                                <div>
                                    <h3>Vũ Mỹ Huyền</h3>
                                    <h5>Giáo viên tiếng anh</h5>
                                    <p>"Giáo dục là làm cho con người tìm thấy chính mình "</p>
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
