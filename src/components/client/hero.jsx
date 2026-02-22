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
          className={`${t.visible ? "animate-enter" : "animate-leave"
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
    <div className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="hero_gpt.png"
          alt="Luxury Hotel"
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          style={{ animation: 'zoom-fade 20s infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-6 max-w-5xl text-center">
        <div className="space-y-4 animate-slideDown">
          <h1 className="text-white text-5xl md:text-7xl font-display font-bold tracking-tight drop-shadow-2xl">
            Experience <span className="text-secondary">Absolute</span> Luxury
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto tracking-wide">
            Discover a world of elegance and comfort in the heart of the city.
            Your journey to extraordinary stays begins here.
          </p>
        </div>

        {/* Booking Bar */}
        <div className="glass p-2 md:p-3 rounded-2xl w-full shadow-2xl animate-slideDown shadow-black/20" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row items-stretch gap-2 bg-white/10 rounded-xl p-2">

            {/* Check-in */}
            <div className="flex-1 flex flex-col items-start px-4 py-2 hover:bg-white/5 transition-colors rounded-lg group">
              <label className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Check-in</label>
              <input
                onChange={(e) => setFormData({ ...formData, checking: e.target.value })}
                type="date"
                className="bg-transparent text-white outline-none w-full cursor-pointer [color-scheme:dark]"
              />
            </div>

            <div className="hidden md:block w-px bg-white/10 my-2"></div>

            {/* Check-out */}
            <div className="flex-1 flex flex-col items-start px-4 py-2 hover:bg-white/5 transition-colors rounded-lg group">
              <label className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Check-out</label>
              <input
                onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                type="date"
                className="bg-transparent text-white outline-none w-full cursor-pointer [color-scheme:dark]"
              />
            </div>

            <div className="hidden md:block w-px bg-white/10 my-2"></div>

            {/* Category */}
            <div className="flex-1 flex flex-col items-start px-4 py-2 hover:bg-white/5 transition-colors rounded-lg group">
              <label className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Room Type</label>
              <select
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                value={formData.category || ""}
                className="bg-transparent text-white outline-none w-full cursor-pointer appearance-none"
              >
                <option value="" className="bg-primary text-white">Select Type</option>
                <option value="Standard Room" className="bg-primary text-white">Standard Room</option>
                <option value="Luxury Room" className="bg-primary text-white">Luxury Room</option>
                <option value="Deluxe Room" className="bg-primary text-white">Deluxe Room</option>
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={() => handelSubmit(formData)}
              className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll"></div>
        </div>
      </div>

      <style>{`
        @keyframes zoom-fade {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
