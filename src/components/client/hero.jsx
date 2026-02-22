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
          src="banner-hero.png"
          alt="Luxury Resort Aerial"
          className="w-full h-full object-cover brightness-[0.85]"
          style={{ animation: 'zoom-pan 30s infinite alternate linear' }}
        />
        {/* Vibrant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 via-primary/30 to-secondary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 px-6 max-w-5xl text-center pt-20 md:pt-0">
        <div className="space-y-4 md:space-y-6 animate-fadeInUp">
          <h1 className="text-white text-4xl sm:text-5xl md:text-8xl font-display font-extrabold tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
            Experience <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-yellow-400">Absolute</span> Luxury
          </h1>
          <p className="text-white/90 text-base md:text-2xl font-light max-w-3xl mx-auto tracking-wide leading-relaxed drop-shadow-md">
            Where Sophistication Meets Serenity. Discover the Ultimate in
            <span className="font-semibold text-secondary"> Coastal Elegance</span> and Refined Comfort.
          </p>
        </div>

        {/* Booking Bar */}
        <div className="glass-vibrant p-1.5 md:p-2 rounded-3xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-fadeInUp backdrop-blur-xl border border-white/30" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row items-stretch gap-2 bg-black/20 rounded-[1.25rem] p-2 md:p-3">

            {/* Check-in */}
            <div className="flex-1 flex flex-col items-start px-4 md:px-6 py-2 md:py-3 hover:bg-white/10 transition-all duration-300 rounded-xl group cursor-pointer border border-transparent hover:border-white/10">
              <label className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-secondary font-black mb-1 md:mb-1.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                Check-in
              </label>
              <input
                onChange={(e) => setFormData({ ...formData, checking: e.target.value })}
                type="date"
                className="bg-transparent text-white font-medium outline-none w-full cursor-pointer [color-scheme:dark] text-sm md:text-lg"
              />
            </div>

            <div className="hidden md:block w-px bg-white/20 my-4"></div>

            {/* Check-out */}
            <div className="flex-1 flex flex-col items-start px-4 md:px-6 py-2 md:py-3 hover:bg-white/10 transition-all duration-300 rounded-xl group cursor-pointer border border-transparent hover:border-white/10">
              <label className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-secondary font-black mb-1 md:mb-1.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                Check-out
              </label>
              <input
                onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                type="date"
                className="bg-transparent text-white font-medium outline-none w-full cursor-pointer [color-scheme:dark] text-sm md:text-lg"
              />
            </div>

            <div className="hidden md:block w-px bg-white/20 my-4"></div>

            {/* Category (Styled Custom Dropdown) */}
            <div className="flex-1 flex flex-col items-start px-4 md:px-6 py-2 md:py-3 hover:bg-white/10 transition-all duration-300 rounded-xl group cursor-pointer border border-transparent hover:border-white/10 relative">
              <label className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-secondary font-black mb-1 md:mb-1.5">Room Type</label>
              <div className="relative w-full">
                <select
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  value={formData.category || ""}
                  className="bg-transparent text-white font-medium outline-none w-full cursor-pointer appearance-none text-sm md:text-lg py-0 pr-8 relative z-10"
                >
                  <option value="" className="bg-[#0A192F] text-white">Select Type</option>
                  <option value="Standard Room" className="bg-[#0A192F] text-white">Standard Room</option>
                  <option value="Luxury Room" className="bg-[#0A192F] text-white">Luxury Room</option>
                  <option value="Deluxe Room" className="bg-[#0A192F] text-white">Deluxe Room</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => handelSubmit(formData)}
              className="bg-secondary hover:bg-yellow-500 text-primary font-black px-8 md:px-12 py-4 md:py-5 rounded-2xl transition-all duration-500 transform hover:scale-[1.05] hover:shadow-[0_10px_30px_rgba(197,160,89,0.5)] active:scale-95 text-base md:text-lg uppercase tracking-wider relative overflow-hidden group/btn mt-2 md:mt-0"
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">Discover More</span>
        <div className="w-6 h-11 border-2 border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
          <div className="w-1 h-3 bg-secondary rounded-full animate-mouse-scroll"></div>
        </div>
      </div>

      <style>{`
        @keyframes zoom-pan {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-2%); }
          100% { transform: scale(1.05) translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mouse-scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-mouse-scroll {
          animation: mouse-scroll 2s infinite;
        }
        .glass-vibrant {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
        }
      `}</style>
    </div>
  );
};

export default Hero;
