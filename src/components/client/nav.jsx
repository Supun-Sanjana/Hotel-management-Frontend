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
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center py-3 md:py-4">
        {/* Brand */}
        <h3 className="font-display font-bold text-primary text-xl md:text-2xl tracking-tight">
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
          className="md:hidden text-primary focus:outline-none transition-all duration-300 active:scale-90 p-2 hover:bg-black/5 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? "max-h-[80vh] opacity-100 shadow-2xl" : "max-h-0 opacity-0"
          } bg-white/95 backdrop-blur-2xl border-t border-gray-100 flex flex-col px-8 py-8 space-y-6`}
      >
        {["Rooms", "Facilities", "Gallery", "Contact"].map((item, idx) => (
          <button
            key={item}
            onClick={() => handleNavClick(item.toLowerCase() === "contact" ? "footer" : item.toLowerCase())}
            className={`text-primary font-bold text-2xl text-left hover:text-secondary transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-4'}`}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {item}
          </button>
        ))}

        <div className="pt-6 border-t border-gray-100 mt-2">
          {token ? (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm font-medium">Logged in as</span>
              <UserTag />
            </div>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center px-6 py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-primary/90 active:scale-[0.98] transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login to Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ClientNav;
