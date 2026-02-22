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

      window.location.href = "/verify-email";
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
    <div className="relative min-h-screen w-full bg-slate-50 flex items-center justify-center py-20 px-6 font-sans overflow-x-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-primary"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-2xl animate-slideDown">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8">
          <div className="p-10 md:p-14">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight mb-2">
                Join <span className="text-secondary">LuxeSphere</span>
              </h2>
              <p className="text-gray-400 font-medium">Create your account to experience world-class hospitality.</p>
            </div>

            <div className="space-y-8">
              {/* Name Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="John"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
              </div>

              {/* Email & Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="example@email.com"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Username</label>
                  <input
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    type="text"
                    placeholder="username123"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">WhatsApp</label>
                  <input
                    name="whatsApp"
                    value={formData.whatsApp}
                    onChange={handleChange}
                    type="text"
                    placeholder="+94 77 123 4567"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Phone Number</label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    type="text"
                    placeholder="+94 77 123 4567"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Password</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-gray-100 px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-primary font-medium"
                  />
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="bg-slate-50 border border-dashed border-gray-200 p-6 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Profile Picture</p>
                  <p className="text-[10px] text-gray-400">JPG, PNG or WEBP (Max 2MB)</p>
                </div>
                <input
                  name="image"
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  className="text-xs font-medium text-primary cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
              >
                {loading ? "Creating Account..." : "Register Now"}
              </button>
            </div>

            <p className="text-center mt-12 text-sm text-gray-400 font-medium">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-secondary font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold">
          &copy; {new Date().getFullYear()} LuxeSphere &mdash; Excellence in Hospitality
        </p>
      </div>
    </div>
  );
};

export default Register;
