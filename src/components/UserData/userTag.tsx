import axios from "axios";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserTag = () => {
  const [name, setName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setName(parsedUser.userName);
    }

    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.user?.userName) {
            setName(res.data.user.userName);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
        })
        .catch((err) => console.log(err));
    } else {
      setName("");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setName("");
    window.location.reload();
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowMenu(false);
  };

  return (
    <div className="relative inline-block text-white">
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 border border-white/20 rounded-lg cursor-pointer transition-all duration-300 group"
      >
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-sm text-primary group-hover:text-secondary transition-colors">
          {name}
        </span>
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-slideDown">
          <button
            onClick={handleProfile}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-all"
          >
            <User size={18} className="text-secondary" /> Profile
          </button>
          <div className="h-px bg-gray-100 my-1 mx-2"></div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      {/* Optional overlay to close dropdown when clicking outside */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 z-40"
        ></div>
      )}
    </div>
  );
};

export default UserTag;
