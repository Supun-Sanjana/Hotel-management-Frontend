import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/get-all")
      .then((res) => {
        setUsers(res.data.list); 
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleToggle = async (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, disabled: !u.disabled } : u
      )
    );

    try {
      await axios.patch(
        import.meta.env.VITE_BACKEND_URL + `/api/v1/${id}/toggle`
      );
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Users</h2>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">WhatsApp</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Email Verified</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Disabled</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-teal-50 transition-colors">
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.type}</td>
                <td className="px-6 py-4">{user.whatsApp}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">
                  {user.emailVerified ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Not Verified
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggle(user._id)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                      user.disabled ? "bg-gray-400" : "bg-teal-500"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.disabled ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
