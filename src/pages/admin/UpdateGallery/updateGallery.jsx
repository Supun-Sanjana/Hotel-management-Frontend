import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/Upload";
import toast from "react-hot-toast";

const UpdateGallery = () => {
  const location = useLocation();
  if (!location.state) {
    window.location.href = "/admin/gallery";
  }

  const [load, setLoad] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoad(true);
    try {
      let uploadedUrl = location.state.imageUrl;
      if (image) {
        uploadedUrl = await UploadImage(image);
      }

      const galleryItem = { name, description, imageUrl: uploadedUrl };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/gallery/${location.state._id}`,
        galleryItem,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Gallery item updated successfully");
      setLoad(false);
      navigate("/admin/gallery");
    } catch (err) {
      toast.error("Update failed");
      setLoad(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[450px] bg-white rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Update Gallery Item</h2>

        <input
          type="text"
          placeholder="Item name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="w-full p-2 mb-5 border rounded"
          onChange={handleFileChange}
        />

        <button
          onClick={handleSave}
          className="px-4 py-2 w-full bg-teal-600 text-white rounded"
        >
          {load ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default UpdateGallery;
