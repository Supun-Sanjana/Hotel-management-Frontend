import React from "react";
import {
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Heart,
  Key,
  BarChart2,
  Briefcase,
  Car,
  Users
} from "lucide-react";

const facilities = [
  { name: "Free Wi-Fi", icon: <Wifi size={20} /> },
  { name: "Coffee/Tea", icon: <Coffee size={20} /> },
  { name: "Flat Screen TV", icon: <Tv size={20} /> },
  { name: "Air Conditioning", icon: <AirVent size={20} /> },
  { name: "Spa & Wellness", icon: <Heart size={20} /> },
  { name: "Safe Storage", icon: <Key size={20} /> },
  { name: "Business Center", icon: <Briefcase size={20} /> },
  { name: "Bar/Lounge", icon: <BarChart2 size={20} /> },
  { name: "Free Parking", icon: <Car size={20} /> },
  { name: "24-Hour Reception", icon: <Users size={20} /> },
];

const Facilities = () => {
  return (
    <section id="facilities" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4 animate-fadeInUp">
          <h2 className="text-primary text-3xl md:text-5xl font-display font-bold tracking-tight">
            World-Class <span className="text-secondary">Amenities</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light">
            We offer a wide range of facilities to ensure your stay is as comfortable and luxurious as possible.
          </p>
          <div className="w-16 md:w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-6 md:p-8 bg-slate-50 rounded-2xl border border-gray-100 transition-all duration-300 hover:bg-primary hover:scale-[1.05] hover:shadow-xl group cursor-default"
            >
              <div className="text-secondary mb-3 md:mb-4 p-2.5 md:p-3 bg-white rounded-xl shadow-sm group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                {React.cloneElement(facility.icon, { size: window.innerWidth < 768 ? 18 : 20 })}
              </div>
              <p className="text-primary font-bold text-[10px] md:text-sm text-center uppercase tracking-widest group-hover:text-white transition-colors">
                {facility.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
