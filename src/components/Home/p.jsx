import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { useGetCategories } from '../../hooks/category/getCategories';

const Hero1 = () => {
  const navigate = useNavigate();
  const { mutate: getCategories, data: categories, isLoading, error } = useGetCategories();

  React.useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleClick = () => {
    navigate('/find');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Tạo mảng gấp đôi bằng cách nối mảng gốc với chính nó
  const doubledCategories = categories?.data ? [...categories.data, ...categories.data] : [];

  return (
    <section className="hero1-section">
      <div className="hero1-content">
        <div className="text1-content">
          <h1>Đa dạng lĩnh vực</h1>
          <p>Khám phá những điều thú vị và dịch vụ tuyệt vời</p>
          <button className="cta1-button" onClick={handleClick}>Bắt đầu</button>
        </div>

        <div className="carousel1-container">
          <div className="carousel1-wrapper">
            <div className="gradient1-overlay gradient1-top"></div>
            <div className="gradient1-overlay gradient1-bottom"></div>
            <div className="gradient1-overlay gradient1-left"></div>
            <div className="gradient1-overlay gradient1-right"></div>
            <div className="skewed1-carousel">
              {doubledCategories.map((category, index) => (
                <div className="carousel1-item" key={`${category.categoryid}-${index}`} onClick={handleClick}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    className="icon"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p >{category.categoryname}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero1;