import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // eye icons (lucide-react)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/v1/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.user.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch(() => {
        setError("Invalid email or password.");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="relative h-screen w-full bg-[url('/login.png')] bg-cover bg-center flex justify-center items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative bg-white/20 p-8 rounded-2xl w-[90%] max-w-md backdrop-blur-lg shadow-lg flex-col flex items-center">
        <h2 className="text-white text-3xl font-bold mb-6">Login</h2>

        {error && (
          <p className="bg-red-500/70 text-white p-2 rounded mb-4 text-center w-full">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="w-full">
          <label className="text-white text-sm">Email Address</label>
          <input
            type="email"
            placeholder="example@email.com"
            className=" w-full placeholder:text-gray-500 bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {/* Password with toggle */}
        <div className="w-full mt-4 relative">
          <label className="text-white text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full placeholder:text-gray-500 bg-white/30 p-3 rounded-md mt-2 focus:outline focus:outline-white pr-10"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11  text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Button */}
        <button
          className="cursor-pointer w-full bg-white text-black font-semibold p-3 rounded-md mt-8 hover:bg-gray-200 transition disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6 w-full">
          <hr className="flex-grow border-white/30" />
          <span className="mx-2 text-white">or</span>
          <hr className="flex-grow border-white/30" />
        </div>

        {/* Register Link */}
        <p className="text-center text-white">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold underline hover:text-gray-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
