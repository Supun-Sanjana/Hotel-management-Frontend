import  { useState } from "react";
import UploadImage from "../../../utils/Upload";
import axios from "axios";
import toast from "react-hot-toast";

const GalleryModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoad(true);
    try {
      const uploadedUrl = await UploadImage(image);

      const galleryItem = {
        name,
        description,
        imageUrl: uploadedUrl,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/gallery",
        { item: galleryItem },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Gallery item added successfully");
      setShowModal(false);
      setLoad(false);
    } catch (err) {
      toast.error("Failed to save gallery item");
      setLoad(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="w-[400px] bg-white rounded-2xl p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add Gallery Item</h2>

        <input
          type="text"
          placeholder="Item name"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="w-full p-2 mb-5 border rounded"
          onChange={handleFileChange}
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
            {load ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
