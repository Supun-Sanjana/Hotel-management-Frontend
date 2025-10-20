import React, { useState } from "react";
import UserTag from "../UserData/userTag";
import { Link, useNavigate } from "react-router-dom";

const CustomNav = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const navigateToHome=()=>{
    navigate("/")
  }
  return (
    <div>
      <nav className="bg-orange-900/80 backdrop-blur-md shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-5 flex gap-8 justify-between items-center py-3">
          {/* Brand */}
          <h3 
          onClick={navigateToHome}
          className="cursor-pointer font-bold text-white text-xl sm:text-2xl">LuxeSphere</h3>

          {/* Right Section (User / Login) */}
          <div className=" md:flex items-center gap-5">
            {token ? (
              <UserTag />
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CustomNav;
