import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Hero = () => {
  const [formData, setFormData] = useState({
    checking: "",
    checkout: "",
    category: "",
  });

  const navigate = useNavigate();


const handelSubmit = (data) => {
  if (!data.category || !data.checking || !data.checkout) {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            {/* ⚠️ Icon */}
            <div className="flex-shrink-0 pt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-.01-10a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
            </div>

            {/* 📝 Message */}
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Missing Information
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Please select check-in date, check-out date, and category.
              </p>
            </div>
          </div>
        </div>

        {/* ❌ Dismiss button */}
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-700 hover:text-orange-900 focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      </div>
    ));
  } else {
    navigate("/booking", { state: data });

  }
};


  return (
    <div className="relative w-full h-[650px] flex flex-col items-center justify-center">
      {/* Background Image */}
      <img
        src="hero_gpt.png"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for darkening the background */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text and Inputs */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h2 className="text-white text-5xl font-bold text-center drop-shadow-lg  mt-50  sm:mt-0">
          Welcome to LuxeSphere
        </h2>

        <div className="bg-white/30 p-4 rounded-2xl flex-col justify-center items-center flex ">
          {/* Input Fields */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col bg-white/60 p-2 rounded-md">
              <label className="pb-2 pl-2 ">Checkin date</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, checking: e.target.value })
                }
                type="date"
                placeholder="First Field"
                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="flex flex-col bg-white/60 p-2 rounded-md">
              <label className="pb-2 pl-2 ">Checkout date</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, checkout: e.target.value })
                }
                type="date"
                placeholder="First Field"
                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="flex flex-col bg-white/60 p-2 rounded-md">
              <label className="pb-2 pl-2 ">Category</label>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                value={formData.category || ""}
                name=""
                id=""
                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Standard Room">Standard Room</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handelSubmit(formData)}
            className="bg-orange-900 text-white px-10 py-3 rounded-lg my-4 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
