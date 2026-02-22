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
    <section id="gallery" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-slideDown">
          <h2 className="text-primary text-4xl md:text-5xl font-display font-bold tracking-tight">
            Visual <span className="text-secondary">Grandeur</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">
            Capture the essence of LuxeSphere through our curated moments.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {images.map((img, index) => {
            const spanClass =
              index % 7 === 0
                ? "md:col-span-2 md:row-span-2"
                : index % 5 === 0
                  ? "md:col-span-2"
                  : "col-span-1";

            return (
              <div
                key={img._id}
                className={`${spanClass} relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500`}
                onClick={() => setSelectedImage(img.imageUrl)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.description || "Gallery Image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="p-4 rounded-full bg-secondary/20 border border-secondary/40 text-secondary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-primary/95 flex items-center justify-center z-[100] p-4 md:p-10 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button
              className="absolute top-0 right-0 p-4 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-zoom-in"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </section>
  );
};

export default Gallery;
