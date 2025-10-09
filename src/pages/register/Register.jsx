import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import UploadImage from "../../utils/Upload";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsApp: "",
    phoneNumber: "",
    image: null,
  });

  // const [register] = useForm()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const imageUrl = await UploadImage(formData.image);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        type: formData.type,
        image: imageUrl, 
      });

      setSuccess("Registration successful!");

      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="relative h-screen w-full bg-[url('/hero_gpt.png')] bg-cover bg-center flex justify-center items-center">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/20 p-8 rounded-2xl w-[90%] max-w-lg backdrop-blur-lg shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* First & Last Name */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-white text-sm">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="John"
              className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
            />
          </div>
          <div className="w-1/2">
            <label className="text-white text-sm">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Doe"
              className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="text-white text-sm">Email Address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@email.com"
            className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
          />
        </div>

        {/* Username */}
        <div className="mt-4">
          <label className="text-white text-sm">Username</label>
          <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            type="text"
            placeholder="username123"
            className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
          />
        </div>

        {/* WhatsApp & Phone */}
        <div className="flex gap-4 mt-4">
          <div className="w-1/2">
            <label className="text-white text-sm">WhatsApp</label>
            <input
              name="whatsApp"
              value={formData.whatsApp}
              onChange={handleChange}
              type="text"
              placeholder="+94771234567"
              className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
            />
          </div>
          <div className="w-1/2">
            <label className="text-white text-sm">Phone Number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="text"
              placeholder="+94771234567"
              className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
            />
          </div>
        </div>

        {/* Passwords */}
        <div className="flex gap-4 mt-4">
          <div className="w-1/2">
            <label className="text-white text-sm">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
            />
          </div>
          <div className="w-1/2">
            <label className="text-white text-sm">Confirm Password</label>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white text-black"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="mt-4">
          <label className="text-white text-sm">Profile Picture</label>
          <input
            name="image"
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="w-full bg-white/30 p-2 rounded-md mt-2 focus:outline focus:outline-white text-white"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer w-full bg-white text-black font-semibold p-3 rounded-md mt-8 hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-white/30" />
          <span className="mx-2 text-white">or</span>
          <hr className="flex-grow border-white/30" />
        </div>

        <p className="text-center text-white">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold underline hover:text-gray-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
