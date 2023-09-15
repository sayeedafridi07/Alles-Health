import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Define navigation links
  const links = [
    {
      name: "Home",
      path: "/dashboard",
    },
    {
      name: "My Profile",
      path: "/my-profile",
    },
    {
      name: "My Appointments",
      path: "",
    },
    {
      name: "My Prescriptions",
      path: "",
    },
    {
      name: "My Reports",
      path: "",
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 px-10">
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center">
          {/* Alles Health logo */}
          <img
            src="https://alleshealth.com/wp-content/uploads/2021/03/AllesHealth-1.png"
            alt="logo"
            className="w-40"
          />
        </div>
        <div className="hidden md:flex ">
          <ul className="flex items-center space-x-4">
            {/* Navigation links */}
            {links.map((link, index) => (
              <li
                key={index}
                className="text-md font-medium hover:text-gray-800 hover:border-b-2 hover:border-gray-800"
              >
                <Link
                  to={link.path}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="selft-end relative">
          <div className="flex items-center space-x-2 relative group">
            {user && (
              // User profile initial (e.g., "AB")
              <span className="text-gray-600 font-semibold text-md bg-gray-200 rounded-full p-4 border-2 border-gray-300">
                {user.firstName.charAt(0).toUpperCase() +
                  user.lastName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0 ring-2 ring-white"></div>
            <div className="bg-white rounded-md w-48 py-2 absolute top-10 right-0 shadow-sm z-20 hidden group-hover:block">
              {/* Dashboard link */}
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Dashboard
              </Link>
              {/* Logout button */}
              <button
                onClick={() => {
                  dispatch(logout(navigate));
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
