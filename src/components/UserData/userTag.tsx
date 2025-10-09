import axios from 'axios';
import { useEffect, useState } from 'react';

const UserTag = () => {
  const [name, setName] = useState("");
  const token = localStorage.getItem('token');

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
    <div className='text-white'>
      <h1>{name}</h1>
      {token && (
        <button onClick={handleLogout}>logout</button>
      )}
    </div>
  );
};

export default UserTag;
