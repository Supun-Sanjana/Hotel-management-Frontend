import React, { useState } from "react";

const CategoryModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null; // don't render when false

  return (
    <div >


      {/* Add category model */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-[400px] h-[400px] bg-white rounded-2xl p-6 shadow-lg relative"
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
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-3"
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded">
                Save
              </button>
            </div>

            {/* Close (X) button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
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
