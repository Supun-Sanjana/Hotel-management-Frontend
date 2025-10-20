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
      console.log("User email:", user.email);
      setEmail(user.email);
    } else {
      console.log("No user found or email missing");
    }
  }, []); //empty  dependency array -> runs only once

  const [formData, setFormData] = useState({
    checking,
    checkout,
    category,
    rooms: [],
  });

  //check booking dates
  useEffect(() => {
    axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/v1/booking/filter-date",
      {
        start: formData.checking,
        end: formData.checkout,
      }
    );
  }, [checking, checkout]);

  // ✅ Fetch rooms when page loads (based on category from Home)
  useEffect(() => {
    if (checking && checkout && category) {
      fetchAvailableRooms({ checking, checkout, category });
    }
  }, [checking, checkout, category]);

  // ✅ Fetch rooms when user selects a new category from dropdown
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
    console.log(room.roomId);
    console.log(formData.checking);
    console.log(formData.checkout);
    console.log(email);

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/`, {
      roomId: room.roomId,
      email: email,
      start: formData.checking,
      end: formData.checkout,
    }).then(
        ()=>{
            toast.success("Booking Created successfully")
        }
    );
  };

  return (
    <>
    <CustomNav/>
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
        <p className="text-xl font-semibold text-gray-700">
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
                  <p className="text-gray-600 text-sm">
                    Room Number : {room.roomId}
                  </p>
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

                    <button
                      onClick={() => handelBooking(room)}
                      className="px-6 py-2 hover:bg-orange-300 duration-400 cursor-pointer bg-orange-200 rounded-full"
                    >
                      Book
                    </button>
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
