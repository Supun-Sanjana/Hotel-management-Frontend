import axios from "axios";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

const UserTag = () => {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

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

  return (
    <div className="flex items-center gap-3 bg-gray-800/40 px-4 py-2 rounded-xl text-white shadow-md hover:bg-gray-700 transition-all duration-300">
      <span className="font-medium text-sm tracking-wide">
        👋 Hi, <span className="font-semibold text-blue-400">{name}</span>
      </span>
      {token && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm bg-red-600/50 hover:bg-red-700 px-3 py-1 rounded-lg transition-all duration-300"
        >
          <LogOut size={16} />
          Logout
        </button>
      )}
    </div>
  );
};

export default UserTag;
