import React, { useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Otp from "./components/Otp";
import Dashboard from "./components/Dashboard";
import MyProfile from "./components/MyProfile";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { logout } from "./services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    // Check if a token is available in localStorage
    const token = localStorage.getItem("token");

    // If no token is found, log the user out and redirect to login page
    // if (!token) {
    //   dispatch(logout(navigate));
    // }

    // Log the token to console for debugging
    console.log(token);
  }, [navigate]);

  return (
    <Routes>
      {/* Route for the login page */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Route for the signup page */}
      <Route path="/signup" element={<Signup />} />

      {/* Route for the email verification page */}
      <Route path="/verify-email" element={<Otp />} />

      {/* Route for the dashboard */}
      <Route
        path="/dashboard"
        element={
          <React.Fragment>
            {/* Header component */}
            <Header />

            {/* Main content with Sidebar */}
            <main className="flex">
              <Sidebar userName={user?.firstName} />
              <div className="flex-1 bg-white p-10 ml-60 space-y-5">
                <Dashboard />
              </div>
            </main>
          </React.Fragment>
        }
      />

      {/* Route for the user's profile */}
      <Route
        path="/my-profile"
        element={
          <React.Fragment>
            {/* Header component */}
            <Header />

            {/* Main content with Sidebar */}
            <main className="flex">
              <Sidebar userName={user?.firstName} />
              <div className="flex-1 bg-white p-10 ml-60 space-y-5">
                <MyProfile />
              </div>
            </main>
          </React.Fragment>
        }
      />
    </Routes>
  );
}

export default App;
