import axios from "axios";
import React, { useEffect, useState } from "react";
import { CalendarCheck2 } from "lucide-react"; // optional icon for date

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const email = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/byEmail/${email}`
      )
      .then((res) => {
        setBookings(res.data.bookings || []);
      })
      .catch((err) => console.error(err));
  }, [email]);

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">No bookings found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking History</h2>

      {bookings.map((booking) => (
        <div
          key={booking.bookingId}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Room ID: {booking.roomId}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : booking.status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <CalendarCheck2 size={16} className="text-orange-500" />
              <span>Start: {new Date(booking.start).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarCheck2 size={16} className="text-red-500" />
              <span>End: {new Date(booking.end).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="font-medium">Note:</span> {booking.note || "-"}
            </div>
            <div>
              <span className="font-medium">Reason:</span>{" "}
              {booking.reson || "-"}
            </div>

            <div>
              <span className="font-medium">Booked on:</span>{" "}
              {new Date(booking.timeStamp).toLocaleString()}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className={`px-6 py-2 rounded-full font-medium shadow-sm active:scale-95 transition-all duration-200
      ${
        booking.status === "pending"
          ? "bg-red-500 text-white hover:bg-red-600 hover:shadow-md cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
              disabled={booking.status !== "pending"}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
