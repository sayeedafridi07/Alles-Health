import React, { useState } from "react";
import alleshealthvideo from "../assets/video.mp4";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../redux/slices/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...formData,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 min-w-full min-h-full object-cover"
        style={{ width: "100%", height: "100%" }}
      >
        <source src={alleshealthvideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <img
            src="https://alleshealth.com/wp-content/uploads/2021/03/AllesHealth-1.png"
            className="w-32 mx-auto"
            alt="Alles Health"
          />
          <h1 className="text-3xl font-bold" style={{ color: "#3BA5DC" }}>Welcome</h1>
          <p className="text-gray-600">Sign up for more services</p>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder="Input your first name"
              required=""
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-600 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder="Input your last name"
              required=""
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder="Input your email here"
              required=""
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder="Input your password here"
              required=""
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 mt-7 right-0 flex items-center pr-2 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder="Confirm your password here"
              required=""
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 mt-7 right-0 flex items-center pr-2 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </div>
          <div className="mb-4">
            <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;