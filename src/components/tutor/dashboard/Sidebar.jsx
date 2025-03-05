import React, { useState, useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { House, Person, Book, Star, Calendar, Clock, CreditCard, People } from "react-bootstrap-icons";
import "../../../assets/css/sidebar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Sidebar = ({ setActiveComponent }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const sidebarRef = useRef(null);
    const Navigate = useNavigate();

    // Toggle mở/đóng submenu
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    // Đóng menu khi bấm ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sidebar p-3 bg-light vh-100" ref={sidebarRef}>
     
            <ListGroup variant="flush">

                {/* Dashboard Dropdown */}
             
                   
        
                <ListGroup.Item action href="#">
                  
                </ListGroup.Item>                        
                        <ListGroup.Item onClick={() => setActiveComponent("all")}>    
                            <House className="me-2" /> Trang chủ
                        </ListGroup.Item>
                        <ListGroup.Item onClick={() => setActiveComponent("profile")}>
                            <Person className="me-2" /> Hồ sơ của tôi
                        </ListGroup.Item>

                        <ListGroup.Item action href="#">
                            <Star className="me-2" /> Đánh giá
                        </ListGroup.Item>
                        <ListGroup.Item onClick={() => setActiveComponent("schedule")}>
                            <Calendar className="me-2" /> Lịch
                        </ListGroup.Item>
                        <ListGroup.Item onClick={() => setActiveComponent("studentslist")}>
                            <People className="me-2" /> Danh sách
                        </ListGroup.Item>
                        <ListGroup.Item onClick={() => setActiveComponent("coursetList")}>
                            <CreditCard className="me-2" /> Lịch sử giao dịch
                        </ListGroup.Item>
                   
               

                {/* My Profile */}

            </ListGroup>
        </div>
    );
};

export default Sidebar;
