import React, { useState } from "react";
import UploadImage from "../../../utils/Upload";

const CategoryModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null; // don't render when false

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // 👈 set file
  };

  const handleSave = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
    try {
      const uploadedUrl = await UploadImage(image); // 👈 call util
      setUrl(uploadedUrl);
      console.log("Uploaded URL:", uploadedUrl);
      // Here you can also send category data + image URL to your backend DB
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      {/* Add category model */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-[400px] pb-5 bg-white rounded-2xl p-6 shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2 className="text-xl font-semibold mb-4">Add Category</h2>

            {/* Example form */}
            <input
              type="text"
              placeholder="Category name"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border rounded mb-3"
            />

            <input
              type="text"
              placeholder="Features"
              className="w-full p-2 border rounded mb-3"
            />

            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-3"
            ></textarea>

            <input
              type="file"
              placeholder="Image"
              className="w-full p-2 mb-5 border rounded "
              onChange={handleFileChange}
            ></input>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave} // 👈 call save
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Save
              </button>
            </div>

            {/* Close (X) button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-5 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryModal;
