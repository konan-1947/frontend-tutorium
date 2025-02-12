import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import Login from "../pages/Auth";
import Navbar from "../components/Navbar";
import Find from "../pages/FindTutor";
import NavBarAfter from "../components/NavbarAfter";
function User() {
  return (
    <Router>


      <Routes>
        <Route path="/find" element={<Find />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default User;
