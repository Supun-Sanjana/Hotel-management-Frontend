import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/Upload";
import toast from "react-hot-toast";

const UpdateRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/rooms";
  }

  const room = location.state;
  const token = localStorage.getItem("token");

  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    roomId: room.roomId,
    category: room.category,
    maxGuests: room.maxGuests,
    available: room.available,
    price: room.price,
    image: room.image || [],
    description: room.description,
    notes: room.notes,
  });

  const [newImage, setNewImage] = useState(null);

  // 🔹 Fetch categories for dropdown
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/category/")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // 🔹 Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Handle file selection
  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // 🔹 Handle update
  const handleSave = async () => {
    setLoad(true);

    try {
      let uploadedImage = formData.image;

      // Upload new image if selected
      if (newImage) {
        const uploadedUrl = await UploadImage(newImage);
        uploadedImage = [uploadedUrl];
      }

      const updatedRoom = {
        ...formData,
        image: uploadedImage,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/room/${formData.roomId}`,
        updatedRoom,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Room updated successfully!");
      navigate("/admin/rooms");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed!");
    }

    setLoad(false);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[450px] pb-5 bg-white rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Update Room</h2>

        {/* Room ID */}
        <input
          type="text"
          placeholder="Room ID"
          className="w-full p-2 border rounded mb-3"
          value={formData.roomId}
          disabled
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Max Guests */}
        <input
          type="number"
          name="maxGuests"
          placeholder="Max Guests"
          className="w-full p-2 border rounded mb-3"
          value={formData.maxGuests}
          onChange={handleChange}
          min={1}
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded mb-3"
          value={formData.price}
          onChange={handleChange}
        />

        {/* Available */}
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available
        </label>

        {/* Image Upload */}
        <input
          type="file"
          className="w-full p-2 border rounded mb-3"
          accept="image/*"
          onChange={handleFileChange}
        />

        {formData.image.length > 0 && (
          <img
            src={formData.image[0]}
            alt="room"
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes"
          className="w-full p-2 border rounded mb-3"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <button
          onClick={handleSave}
          className="px-4 py-2 w-full bg-teal-600 text-white rounded flex justify-center"
        >
          {load ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateRoom;
