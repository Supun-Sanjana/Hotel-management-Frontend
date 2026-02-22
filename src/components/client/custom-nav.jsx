import React, { useState } from "react";
import UserTag from "../UserData/userTag";
import { Link, useNavigate } from "react-router-dom";

const CustomNav = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className="glass fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center py-3 md:py-4">
        {/* Brand */}
        <h3
          onClick={navigateToHome}
          className="cursor-pointer font-display font-bold text-primary text-xl md:text-2xl tracking-tight"
        >
          Luxe<span className="text-secondary">Sphere</span>
        </h3>

        {/* Right Section (User / Login) */}
        <div className="flex items-center gap-4 md:gap-6">
          {token ? (
            <UserTag />
          ) : (
            <Link
              to="/login"
              className="px-5 md:px-6 py-2 md:py-2.5 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomNav;
