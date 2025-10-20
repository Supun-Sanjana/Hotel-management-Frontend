import React, { useEffect, useState } from "react";
import UploadImage from "../../utils/Upload";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUserName(user.userName);
      setImage(user.image);
    }
  }, []);

  const handleSave = async () => {
  try {
    setLoading(true);
    // Upload the image first (wait for the URL)
    let imgUrl = image;

    // If user uploaded a new file, upload it
    if (image instanceof File) {
      setLoading(true);
      imgUrl = await UploadImage(image);
    }

    // Save data to DB
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/update/${email}`,
      {
        firstName,
        lastName,
        userName,
        image: imgUrl, // ✅ now it's a proper string
      }
    );
    setLoading(false);

    toast.success("User updated successfully");
    console.log(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setShowModal(false);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Update failed");
  }finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500 shadow-sm">
          <img
            src={
              image ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            alt={firstName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-semibold text-gray-800">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-500">@{userName}</p>

        {/* Divider */}
        <div className="w-16 h-1 bg-orange-500 rounded-full my-3"></div>

        {/* Info Section */}
        <div className="space-y-3 text-left w-full">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">First Name</span>
            <span className="text-gray-800">{firstName}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Last Name</span>
            <span className="text-gray-800">{lastName}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Username</span>
            <span className="text-gray-800">{userName}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Email</span>
            <span className="text-gray-800">{email}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>

      {/* === Edit Profile Modal === */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Edit Profile
            </h2>

            <div className="space-y-4 text-left">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      image
                         }
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition flex items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

