import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import AccessDenied from "../pages/AccessDenied";
import AdminDashboard from "../pages/AdminDashboard";
import SignUpPage from "../pages/signUp/SignUpPage";
import SignInPage from "../pages/signIn/SignInPage";
import ForgotPasswordPage from "../pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import CoursesDashboard from "../pages/courses/CoursesDashboard";
import CourseDetailPage from "../pages/course/CourseDetailPage";
import ViewProfilePage from "../pages/profile/ViewProfilePage";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<CoursesDashboard />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/profile" element={<ViewProfilePage />} />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Routing;
