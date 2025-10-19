import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const { checking = "", checkout = "", category = "" } = location.state || {};

  const [formData, setFormData] = useState({
    checking,
    checkout,
    category,
    rooms: [],
  });

  // ✅ Fetch rooms when page loads (based on category from Home)
  useEffect(() => {
    if (category) {
      fetchRooms(category);
    }
  }, [category]);

  // ✅ Fetch rooms when user selects a new category from dropdown
  useEffect(() => {
    if (formData.category && formData.category !== category) {
      fetchRooms(formData.category);
    }
  }, [formData.category]);

  const fetchRooms = (selectedCategory) => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/room/byCategory/${selectedCategory}`
      )
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          rooms: res.data.rooms,
        }));
      })
      .catch(() => {
        toast.error("Failed to load rooms!");
      });
  };

  const handelSubmit = (data) => {
    if (!data.category || !data.checking || !data.checkout) {
      toast.error("Please select all fields!");
      return;
    }
    fetchRooms(data.category);
  };

  return (
    <>
      <div className="relative z-10 flex flex-col items-center gap-8 bg-orange-900/80 p-20">
        <h2 className="text-white text-4xl font-bold text-center drop-shadow-lg">
          Booking
        </h2>

        {/* Search Panel */}
        <div className="bg-white/30 p-4 rounded-2xl flex-col justify-center items-center flex">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Checkin Date */}
            <div className="flex flex-col bg-white/60 p-2 rounded-md">
              <label className="pb-2 pl-2">Checkin date</label>
              <input
                type="date"
                value={formData.checking}
                onChange={(e) =>
                  setFormData({ ...formData, checking: e.target.value })
                }
                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Checkout Date */}
            <div className="flex flex-col bg-white/60 p-2 rounded-md">
              <label className="pb-2 pl-2">Checkout date</label>
              <input
                type="date"
                value={formData.checkout}
                onChange={(e) =>
                  setFormData({ ...formData, checkout: e.target.value })
                }
                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-col bg-white/60 p-2 rounded-md">
              <label className="pb-2 pl-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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

      {/* Room Display Section */}
      <div className="flex-1 my-10 mx-5 lg:mx-70">
        <p className="text-xl ml-10">
          Category : {formData.category || "Not selected"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {formData.rooms?.length > 0 ? (
            formData.rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
              >
                <div>
                  <img
                    src={room.image[0]}
                    alt={room.category}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-bold">{room.category}</h3>
                  <p className="text-gray-600 text-sm">Room Number : {room.roomId}</p>
                  <p className="mb-3 text-gray-600 text-sm">
                    Max Guest : {room.maxGuests}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {room.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="font-medium text-teal-600">
                      Price: ${room.price}/night
                    </p>

                    <button className="px-6 py-2 hover:bg-orange-300 duration-400 cursor-pointer bg-orange-200 rounded-full">Book</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-4">
              No rooms found for selected category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;
