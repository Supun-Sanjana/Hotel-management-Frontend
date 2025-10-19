import { useState, useEffect } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import RoomModal from "./RoomModal";
import axios from "axios";
import toast from "react-hot-toast";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login";

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/room/")
        .then((res) => {
          setRooms(res.data.list);
          setLoaded(true);
        })
        .catch(() => toast.error("Failed to load rooms"));
    }
  }, [loaded]);

  const handleDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/v1/room/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Room deleted successfully");
        setRooms(rooms.filter((room) => room._id !== id));
        setLoaded(false);
      })
      .catch(() => toast.error("Failed to delete room"));
  };

  const handleEdit = (room) => {
    setShowModal(true);
  };
  return (
    <div className="w-full p-6 min-h-screen">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Rooms</h2>

      {/* Floating button */}
      <button
        className="cursor-pointer fixed bottom-6 right-6 p-2 rounded-full text-white text-5xl w-12 h-12 flex items-center justify-center bg-teal-600"
        onClick={() => setShowModal(true)}
      >
        <Plus />
      </button>

      {/* Modal */}
      <RoomModal showModal={showModal} setShowModal={setShowModal} />

      {/* Room cards */}
      <div className="grid grid-cols-3 gap-6 mt-6">
  {rooms.map((room) => (
    <div
      key={room._id}
      className="relative bg-white shadow-md rounded-xl overflow-hidden group"
    >
      {/* Room image */}
      <img
        src={room.image[0] || null}
        alt={room.category}
        className="w-full h-40 object-cover"
      />

      {/* Action icons */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
          onClick={() => handleEdit(room)}
        >
          <Edit size={16} className="text-teal-600" />
        </button>
        <button
          className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
          onClick={() => handleDelete(room.roomId)}
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>

      {/* Room info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{room.category}</h3>
        <h3 className="text-md font-semibold">{room.roomId}</h3>
        <p className="text-sm text-gray-600">Price: ${room.price}</p>
        <p className="text-sm text-gray-600">Max Guests: {room.maxGuests}</p>
        <p className="text-sm text-gray-600">
          Available: {room.available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Rooms;
