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
    <section id="rooms" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-slideDown">
          <h2 className="text-primary text-4xl md:text-5xl font-display font-bold tracking-tight">
            Our Signature <span className="text-secondary">Suites</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light italic">
            "Choose the perfect stay for you: Standard for comfort, Deluxe for extra
            space, and Luxury for the ultimate indulgence."
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mb-10">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-secondary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Featured
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-display font-bold text-primary mb-3">
                  {room.name}
                </h4>
                <p className="text-gray-500 mb-6 line-clamp-2 font-light italic">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full py-4 border border-primary/20 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 tracking-wider uppercase text-xs">
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
