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
    <div className="mt-10 px-5">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">
        Hotel Facilities
      </h2>
      <div className="mx-20 lg:mx-70">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-orange-600 mb-2">{facility.icon}</div>
            <p className="text-orange-700 text-sm text-center">{facility.name}</p>
          </div>
        ))}
      </div>
      </div>
      
    </div>
  );
};

export default Facilities;
