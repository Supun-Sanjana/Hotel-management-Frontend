import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UploadImage from "../../../utils/Upload";

const RoomModal = ({ showModal, setShowModal, refreshRooms }) => {
  if (!showModal) return null;
  const [category, setCategory] = useState([]);

  useEffect(() => {
    
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/category/")
      .then((res) => {
        setCategory(res.data);
        console.log(res.data);
      });

    
  },[]);

  const [formData, setFormData] = useState({
    category: "",
    maxGuests: 3,
    available: true,
    price: "",
    image: [""], // will store URLs after upload
    description: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // handle text/number/checkbox changes
  const handleChange = (e, index) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "available") {
      setFormData({ ...formData, available: checked });
    } else if (name === "image" && files) {
      // upload the file
      const file = files[0];
      if (!file) return;

      toast.promise(
        UploadImage(file).then((url) => {
          const images = [...formData.image];
          images[index] = url;
          setFormData({ ...formData, image: images });
        }),
        {
          loading: "Uploading...",
          success: "Image uploaded!",
          error: "Upload failed!",
        }
      );
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImageField = () =>
    setFormData({ ...formData, image: [...formData.image, ""] });
  const removeImageField = (index) =>
    setFormData({
      ...formData,
      image: formData.image.filter((_, i) => i !== index),
    });

  const handleSave = async () => {
    if (!formData.category || !formData.price) {
      toast.error("Category and Price are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/room/create-room",
        formData,
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Room created successfully!");
      setShowModal(false);
      setFormData({
        category: "",
        maxGuests: 3,
        available: true,
        price: "",
        image: [""],
        description: "",
        notes: "",
      });

      if (refreshRooms) refreshRooms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Room creation failed!");
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="w-[500px] bg-white rounded-2xl p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add Room</h2>

        <input
          type="text"
          placeholder="Category *"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <label htmlFor="">Max Guests</label>
        <input
          type="number"
          placeholder="Max Guests"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          min={1}
        />

        <label className="flex items-center space-x-2 mb-3">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="h-5 w-5"
          />
          <span>Available</span>
        </label>

        <input
          type="number"
          placeholder="Price *"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block font-medium mb-1">Images</label>
        {formData.image.map((img, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleChange(e, index)}
              className="flex-1 border px-3 py-2 rounded-lg"
            />
            {img && (
              <img
                src={img}
                alt="preview"
                className="w-12 h-12 object-cover rounded"
              />
            )}
            {formData.image.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="text-red-500 font-bold px-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="text-teal-600 font-semibold mb-3"
        >
          + Add Image
        </button>

        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          placeholder="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-600 text-white rounded flex justify-center"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
