import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import UserTag from "../UserData/userTag";

const ClientNav = ({ onScrollTo }) => {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section) => {
    onScrollTo[section]();
    setIsOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <nav className="bg-orange-900/80 backdrop-blur-md shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center py-3">
        {/* Brand */}
        <h3 className="font-bold text-white text-2xl">LuxeSphere</h3>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-15">
          <button
            onClick={() => handleNavClick("rooms")}
            className="text-white hover:text-orange-300 transition cursor-pointer"
          >
            Rooms
          </button>
          <button
            onClick={() => handleNavClick("facilities")}
            className="text-white hover:text-orange-300 transition cursor-pointer"
          >
            Facilities
          </button>
          <button
            onClick={() => handleNavClick("gallery")}
            className="text-white hover:text-orange-300 transition cursor-pointer"
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick("footer")}
            className="text-white hover:text-orange-300 transition cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Right Section (User / Login) */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-orange-900/95 text-white px-6 py-4 space-y-3 animate-slideDown">
          <button onClick={() => handleNavClick("rooms")}>Rooms</button>
          <button onClick={() => handleNavClick("facilities")}>Facilities</button>
          <button onClick={() => handleNavClick("gallery")}>Gallery</button>
          <button onClick={() => handleNavClick("footer")}>Contact</button>

          {token ? (
            <div className="mt-3">
              <UserTag />
            </div>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center px-5 py-2 bg-orange-600 rounded-xl shadow-md hover:bg-orange-700 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default ClientNav;
