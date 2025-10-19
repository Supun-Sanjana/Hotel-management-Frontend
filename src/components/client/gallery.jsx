import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // for lightbox

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/gallery")
      .then((res) => {
        setImages(res.data.list);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="mt-20 px-5">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-10">
        Our Gallery
      </h2>

      {/* Bento Grid */}
      <div className="mx-5 lg:mx-70">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => {
          // Define some bento-style spans
          const spanClass =
            index % 5 === 0
              ? ""
              : index % 6 === 0
              ? "col-span-2"
              : "col-span-1";

          return (
            <div
              key={img._id}
              className={`${spanClass} relative cursor-pointer overflow-hidden rounded-lg shadow-lg`}
              onClick={() => setSelectedImage(img.imageUrl)}
            >
              <img
                src={img.imageUrl}
                alt={img.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              
            </div>
          );
        })}
      </div>
      </div>
     

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
