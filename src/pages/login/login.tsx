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
    <div className="relative h-screen w-full bg-slate-50 flex items-center justify-center overflow-hidden font-sans">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl"></div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-lg px-6 animate-slideDown">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-10 md:p-14">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight mb-2">
                Luxe<span className="text-secondary">Sphere</span>
              </h1>
              <p className="text-gray-400 font-medium text-sm">Welcome back. Please enter your details.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-8 flex items-center gap-3 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="admin@luxesphere.com"
                  className="w-full bg-slate-50 border border-gray-100 px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-primary" id="remember" />
                  <label htmlFor="remember" className="text-xs text-gray-400 font-medium cursor-pointer">Remember me</label>
                </div>
                <a href="#" className="text-xs text-secondary font-bold hover:underline">Forgot Password?</a>
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </button>
            </div>

            <p className="text-center mt-10 text-sm text-gray-400 font-medium">
              New to LuxeSphere?{" "}
              <Link
                to={"/register"}
                className="text-secondary font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold">
          &copy; {new Date().getFullYear()} LuxeSphere Excellence
        </p>
      </div>
    </div>
  );
};

export default Login;
