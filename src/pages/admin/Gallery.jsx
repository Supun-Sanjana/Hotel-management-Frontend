import  { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import GalleryModal from "./Addgallery/addgalleryModel";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!galleryLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/gallery")
        .then((res) => {
          setGallery(res.data.list);
          setGalleryLoaded(true);
        });
    }
  }, [galleryLoaded]);

  const deleteItem = (id) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/v1/gallery/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Gallery item deleted successfully");
        setGalleryLoaded(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="w-full p-6 min-h-screen">
      {/* Floating button */}
      <button
        className="cursor-pointer fixed bottom-6 right-6 p-2 rounded-full text-white text-5xl w-12 h-12 flex items-center justify-center bg-teal-600"
        onClick={() => setShowModal(true)}
      >
        <Plus />
      </button>

      {/* Modal */}
      <GalleryModal showModal={showModal} setShowModal={setShowModal} />

      <h2 className="text-2xl font-semibold text-teal-800 mb-4">
        Gallery
      </h2>

      <div className="grid grid-cols-5 gap-6">
        {gallery.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>

              <div className="flex gap-2 mt-3">
                <Link
                  to={`update-gallery`}
                  state={item}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
