import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient và QueryClientProvider
import ProtectedRoute from "../components/auth/checkLoginSession";

// Import các trang dành cho User
import TutorRegister from "../pages/tutor/BecomeTutor";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Detail from "../pages/learner/TutorDetail";
import Booking from "../pages/learner/Schedules";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import Howtosignup from "../pages/tutor/HowtoSignUp";
import ProfileLearner from "../pages/learner/Profilelearner";
import Cashing from "../components/learner/booking/Cash";
import SearchTutor from "../pages/learner/SearchTutor";
import ChooseCustomLearnerInfo from "../pages/learner/ChooseCustomLearnerInfo";
import ForgotPassword from "../pages/ForgotPasswordPage";
import ResetPassword from "../pages/ResetPasswordPage";
import VerifyLearner from "../pages/learner/Verify";

// Import Admin
import Admin from "../pages/admin/Admin";
import Error404 from "../pages/Error404";
import Help from "../pages/Help";
import AddTutorSchedule from "../components/tutor/schedules/AddTutorSchedules";
import ListAllContracts from "../components/learner/profile/ListAllContract";
import ListPendingBooking from "../components/tutor/dashboard/ListPendingBooking";
import Message from "../pages/Chat";
import MessageWithUser from "../pages/MessageWithUser";
import Oops from "../pages/Oops";

// Tạo một instance của QueryClient
const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Routes công khai - Không cần đăng nhập */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/howtosignup" element={<Howtosignup />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/help" element={<Help />} />

        {/* Routes dành cho Learner - Yêu cầu role 'learner' */}
        <Route
          path="/learner/listallcontracts"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <ListAllContracts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verifylearner"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <VerifyLearner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learner/choosecustominfo"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <ChooseCustomLearnerInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learner/bookingcontracts/:username"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learner/cashing"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <Cashing />
            </ProtectedRoute>
          }
        />


        <Route
          path="/learner/profile"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <ProfileLearner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find"
          element={

            <SearchTutor />

          }
        />
        <Route
          path="/learner/detailTutor/:username"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <Detail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashing"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <Cashing />
            </ProtectedRoute>
          }
        />

        {/* Routes dành cho Tutor - Yêu cầu role 'tutor' */}
        <Route
          path="/tutorregister"
          element={

            <TutorRegister />

          }
        />
        <Route
          path="/tutor/listpendingbooking"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <ListPendingBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/addschedule"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <AddTutorSchedule />
            </ProtectedRoute>
          }
        />

        {/* Routes dành cho Admin - Yêu cầu role 'admin' */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={[ "admin"]}>
            <Admin />
</ProtectedRoute>
          }
        />

        {/* Routes chung - Yêu cầu đăng nhập nhưng không giới hạn role */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute allowedRoles={["learner", "tutor", "admin"]}>
              <Message />
            </ProtectedRoute>
          }
        />
        {/* Route dành cho chat */}
        <Route path="/oops" element={<Oops />} />
        <Route path="/messages/:username" element={<MessageWithUser />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRoutes;