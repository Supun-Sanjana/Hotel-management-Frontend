import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBooking();
  }, []);

  const getAllBooking = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/booking/get-all")
      .then((res) => {
        setBookings(res.data.list);
      })
      .catch((err) => console.error(err));
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/update-status/${bookingId}`,
        { status: newStatus }
      );
      toast.success(`Status updated to ${newStatus}`);
      getAllBooking(); // refresh after update
      console.log(bookingId);

    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Bookings</h2>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Room ID</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-teal-50 transition-colors"
              >
                <td className="px-6 py-4">{booking.bookingId}</td>
                <td className="px-6 py-4">{booking.roomId}</td>
                <td className="px-6 py-4">{booking.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.start).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(booking.end).toLocaleDateString()}
                </td>


                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        booking.bookingId,
                        booking.status === "pending" ? "confirmed" : "pending"
                      )
                    }
                    className="px-2 py-1 rounded bg-teal-600 text-white text-xs"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => console.log("Edit", booking.bookingId)}
                    className="px-2 py-1 rounded bg-gray-300 text-gray-800 text-xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
