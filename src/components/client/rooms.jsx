import axios from "axios";
import React, { useEffect, useState } from "react";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/category/")
      .then((res) => {
        setRooms(res.data.categories);
        // console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="rooms" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4 animate-fadeInUp">
          <h2 className="text-primary text-3xl md:text-5xl font-display font-bold tracking-tight">
            Our Signature <span className="text-secondary">Suites</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-light italic">
            "Choose the perfect stay for you: Standard for comfort, Deluxe for extra
            space, and Luxury for the ultimate indulgence."
          </p>
          <div className="w-16 md:w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-6 md:mt-10">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-secondary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Featured
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h4 className="text-xl md:text-2xl font-display font-bold text-primary mb-2 md:mb-3">
                  {room.name}
                </h4>
                <p className="text-gray-500 mb-4 md:mb-6 line-clamp-2 md:line-clamp-none font-light italic text-sm md:text-base">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {room.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full py-4 bg-white border border-primary/20 text-primary font-bold rounded-2xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 tracking-wider uppercase text-[10px] md:text-xs">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
