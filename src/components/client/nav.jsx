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
    <nav className="glass fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        {/* Brand */}
        <h3 className="font-display font-bold text-primary text-2xl tracking-tight">
          Luxe<span className="text-secondary">Sphere</span>
        </h3>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Rooms", "Facilities", "Gallery", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase() === "contact" ? "footer" : item.toLowerCase())}
              className="text-primary/80 font-medium hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Right Section (User / Login) */}
        <div className="hidden md:flex items-center gap-6">
          {token ? (
            <UserTag />
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary focus:outline-none transition-transform duration-300 active:scale-90"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-gray-100 flex flex-col px-6 py-6 space-y-4 shadow-xl`}
      >
        {["Rooms", "Facilities", "Gallery", "Contact"].map((item) => (
          <button 
            key={item}
            onClick={() => handleNavClick(item.toLowerCase() === "contact" ? "footer" : item.toLowerCase())}
            className="text-primary font-medium text-lg text-left hover:text-secondary transition-colors"
          >
            {item}
          </button>
        ))}

        <div className="pt-4 border-t border-gray-100">
          {token ? (
            <UserTag />
          ) : (
            <Link
              to="/login"
              className="block w-full text-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ClientNav;
