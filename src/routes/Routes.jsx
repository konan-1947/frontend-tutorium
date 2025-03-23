import React from "react";
import { Routes, Route } from "react-router-dom";

// Import các trang dành cho User
import TutorRegister from "../pages/tutor/BecomeTutor";
import Home from "../pages/Home";
import Auth from "../pages/Auth";

import Detail from "../pages/learner/TutorDetail";
import Booking from "../components/learner/booking/ScheduleLearner";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import Howtosignup from "../pages/tutor/HowtoSignUp";
import ProfileLearner from "../pages/learner/Profilelearner";
import Cashing from "../components/learner/booking/Cash";
import SearchTutor from "../pages/learner/SearchTutor";
import ChooseCustomLearnerInfo from "../pages/learner/ChooseCustomLearnerInfo";
import ForgotPassword from "../pages/ForgotPasswordPage";
import ResetPassword from "../pages/ResetPasswordPage";
import VerifyLearner from "../pages/learner/Verify"
// Import Admin (trang `App.js` của bạn)
import Admin from "../pages/admin/Admin";
import Error404 from "../pages/Error404";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes dành cho Learer */}
      <Route path="/learner/verifylearner" element={<VerifyLearner />} />
      <Route path="/learner/choosecustominfo" element={<ChooseCustomLearnerInfo />} />
      <Route path="/learner/booking" element={<Booking />} />
      <Route path="/learner/cashing" element={<Cashing />} />
      <Route path="/learner/profile" element={<ProfileLearner />} />
      <Route path="/find" element={<SearchTutor />} />
      <Route path="/learner/detailTutor/:userid" element={<Detail />} />
      <Route path="/cashing" element={<Cashing />} />
      {/* Routes dành cho Admin */}
      <Route path="/admin/*" element={<Admin />} /> {/* Gọi Admin như 1 component */}
      {/* Routes dành cho Tutor */}
      <Route path="/tutorregister" element={<TutorRegister />} />
      <Route path="/howtosignup" element={<Howtosignup />} />
      <Route path="/tutor/dashboard/*" element={<TutorDashboard />} />
      {/* Routes chung*/}
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/error404" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
