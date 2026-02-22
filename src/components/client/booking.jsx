import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import CustomNav from "./custom-nav";

const Booking = () => {
  const location = useLocation();
  const { checking = "", checkout = "", category = "" } = location.state || {};
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email) {
      setEmail(user.email);
    } else {
      console.log("No user found or email missing");
    }
  }, []);

  const [formData, setFormData] = useState({
    checking,
    checkout,
    category,
    rooms: [],
  });

  // check booking dates
  useEffect(() => {
    if (formData.checking && formData.checkout) {
      axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/booking/filter-date",
        {
          start: formData.checking,
          end: formData.checkout,
        }
      );
    }
  }, [formData.checking, formData.checkout]);

  // Fetch rooms when page loads
  useEffect(() => {
    if (checking && checkout && category) {
      fetchAvailableRooms({ checking, checkout, category });
    }
  }, [checking, checkout, category]);

  // Fetch rooms when user selects a new category
  useEffect(() => {
    if (formData.category && formData.category !== category) {
      fetchAvailableRooms(formData);
    }
  }, [formData.category]);

  const fetchAvailableRooms = (data) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/filter-available`,
        {
          start: data.checking,
          end: data.checkout,
          category: data.category,
        }
      )
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          rooms: res.data.rooms || [],
        }));
      })
      .catch((err) => {
        toast.error("Failed to load available rooms!");
        console.error(err);
      });
  };

  const handelSubmit = (data) => {
    if (!data.category || !data.checking || !data.checkout) {
      toast.error("Please select all fields!");
      return;
    }
    fetchAvailableRooms(data);
  };

  const handelBooking = (room) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/`, {
      roomId: room.roomId,
      email: email,
      start: formData.checking,
      end: formData.checkout,
    }).then(
      (res) => {
        toast.success("Booking Created successfully");
      }
    ).catch(err => {
      toast.error("Booking failed. Please try again.");
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <CustomNav />
      {/* Premium Header */}
      <div className="relative h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="banner-booking.png"
            alt="Luxury Room View"
            className="w-full h-full object-cover blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-slate-50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-20 flex flex-col items-center">
          <div className="text-center space-y-4 mb-10 animate-fadeInUp">
            <h2 className="text-white text-4xl md:text-6xl font-display font-black tracking-tight drop-shadow-lg">
              Find Your <span className="text-secondary">Perfect</span> Stay
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Luxury is in each detail. Select your dates and discover the ultimate comfort.
            </p>
          </div>

          {/* Premium Search Panel */}
          <div className="glass-vibrant p-2 md:p-3 rounded-[2rem] w-full max-w-5xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-fadeInUp backdrop-blur-xl border border-white/30">
            <div className="flex flex-col md:flex-row items-stretch gap-2 bg-black/20 rounded-[1.5rem] p-2 md:p-3">
              {/* Check-in */}
              <div className="flex-1 flex flex-col items-start px-6 py-3 hover:bg-white/10 transition-all duration-300 rounded-xl group cursor-pointer border border-transparent hover:border-white/10">
                <label className="text-[11px] uppercase tracking-[0.2em] text-secondary font-black mb-1.5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                  Check-in
                </label>
                <input
                  type="date"
                  value={formData.checking}
                  onChange={(e) => setFormData({ ...formData, checking: e.target.value })}
                  className="bg-transparent text-white font-medium outline-none w-full cursor-pointer [color-scheme:dark] text-lg"
                />
              </div>

              <div className="hidden md:block w-px bg-white/20 my-4"></div>

              {/* Check-out */}
              <div className="flex-1 flex flex-col items-start px-6 py-3 hover:bg-white/10 transition-all duration-300 rounded-xl group cursor-pointer border border-transparent hover:border-white/10">
                <label className="text-[11px] uppercase tracking-[0.2em] text-secondary font-black mb-1.5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                  Check-out
                </label>
                <input
                  type="date"
                  value={formData.checkout}
                  onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                  className="bg-transparent text-white font-medium outline-none w-full cursor-pointer [color-scheme:dark] text-lg"
                />
              </div>

              <div className="hidden md:block w-px bg-white/20 my-4"></div>

              {/* Category Select */}
              <div className="flex-1 flex flex-col items-start px-6 py-3 hover:bg-white/10 transition-all duration-300 rounded-xl group cursor-pointer border border-transparent hover:border-white/10 relative">
                <label className="text-[11px] uppercase tracking-[0.2em] text-secondary font-black mb-1.5">Room Type</label>
                <div className="relative w-full">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-transparent text-white font-medium outline-none w-full cursor-pointer appearance-none text-lg py-0 pr-8"
                  >
                    <option value="" disabled className="bg-primary text-white">Select Type</option>
                    <option value="Standard Room" className="bg-primary text-white">Standard Room</option>
                    <option value="Luxury Room" className="bg-primary text-white">Luxury Room</option>
                    <option value="Deluxe Room" className="bg-primary text-white">Deluxe Room</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={() => handelSubmit(formData)}
                className="bg-secondary hover:bg-yellow-500 text-primary font-black px-12 py-5 rounded-2xl transition-all duration-500 transform hover:scale-[1.05] shadow-lg text-lg uppercase tracking-wider group/btn whitespace-nowrap"
              >
                Search Rooms
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Display Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h3 className="text-primary text-3xl font-display font-bold">Available <span className="text-secondary">Accommodations</span></h3>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">
              Showing Results for: <span className="text-primary">{formData.category || "All Categories"}</span>
            </p>
          </div>
          <div className="h-1 w-24 bg-secondary rounded-full hidden md:block mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {formData.rooms?.length > 0 ? (
            formData.rooms.map((room, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.image[0]}
                    alt={room.category}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase">
                    ID: {room.roomId}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-secondary text-primary px-4 py-1.5 rounded-xl text-xs font-black shadow-lg">
                    ${room.price}/night
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-display font-bold text-primary mb-2">{room.category}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase tracking-tighter">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {room.maxGuests} Guests Max
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-light italic mb-6 line-clamp-3">
                    {room.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <button
                      onClick={() => handelBooking(room)}
                      className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-secondary hover:text-primary transition-all duration-300 tracking-wider uppercase text-xs shadow-md"
                    >
                      Book This Room
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No available rooms found for the selected criteria.</p>
              <p className="text-gray-300 text-sm">Try changing your dates or room category.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Booking;
