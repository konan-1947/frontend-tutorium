import React from "react";
import { Routes, Route } from "react-router-dom";

// Import các trang dành cho User
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import FindTutor from "../pages/FindTutor";
import Detail from "../pages/Detail";
import Cashing from "../pages/Cashing";
import TutorDashboard from "../pages/TutorDashboard";

// Import Admin (trang `App.js` của bạn)
import Admin from "../pages/Admin"; 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes dành cho User */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/find" element={<FindTutor />} />
      <Route path="/details" element={<Detail />} />
      <Route path="/cashing" element={<Cashing />} />
      <Route path="/tutordashboard/*" element={<TutorDashboard />} />

      {/* Routes dành cho Admin */}
      <Route path="/admin/*" element={<Admin />} /> {/* Gọi Admin như 1 component */}
    </Routes>
  );
};

export default AppRoutes;
