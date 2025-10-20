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
        className="flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-xl shadow-md hover:bg-gray-700 cursor-pointer transition-all duration-300"
      >
        <span className="font-medium text-sm tracking-wide">
          👋 Hi, <span className="font-semibold text-orange-400">{name}</span>
        </span>
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <button
            onClick={handleProfile}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 transition-all"
          >
            <User size={16} /> Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-red-600/60 transition-all"
          >
            <LogOut size={16} /> Logout
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
