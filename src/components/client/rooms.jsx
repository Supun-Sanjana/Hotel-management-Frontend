import axios from "axios";
import React, { useEffect, useState } from "react";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/category/")
      .then((res) => {
        setRooms(res.data.categories);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-15 px-5">
      <h2 className="my-5 text-gray-700 text-3xl font-bold text-center drop-shadow-lg">
        LuxeSphere Rooms
      </h2>

      <h3 className="text-gray-700 text-xl font-semibold text-center drop-shadow-lg mb-10">
        Choose the perfect stay for you: Standard for comfort, Deluxe for extra
        space, and Luxury for the ultimate indulgence.
      </h3>

      <div className="mx-20 lg:mx-70">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {room.name}
                </h4>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-200 text-orange-700 px-2 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
