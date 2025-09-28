import axios from 'axios';
import { useEffect, useState } from 'react';

const UserTag = () => {
  const [name, setName] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    // 1. Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setName(parsedUser.userName);
    }

    // 2. If token exists, fetch fresh user data
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
      setName(""); // ✅ clear state if no token
    }
  }, [token]); // reruns when token changes       json variable isn't work

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ clear user too
    setName(""); // ✅ clear state
  };

  return (
    <div>
      <h1>hi {name}</h1>
      {token && (
        <button onClick={handleLogout}>logout</button>
      )}
    </div>
  );
};

export default UserTag;
