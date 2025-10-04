import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/Upload";
import toast from "react-hot-toast";


const UpdateCategory = () => {
  const location = useLocation();

  if (!location.state) {
    window.location.href = "/admin/categories";
  }

  const [load, setLoad] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [features, setFeatures] = useState(location.state.features.join(","));
  const [description, setDescription] = useState(location.state.description);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // 👈 set file
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const features_array = features.split(",");

  const handleSave = async () => {
    setLoad(true);

    try {
      // keep old image if no new one selected
      let uploadedUrl = location.state.image;
      if (image) {
        uploadedUrl = await UploadImage(image);
        setUrl(uploadedUrl);
      }

      const features_array = features.split(",").map((f) => f.trim());

      const categoryInfo = {
        name,
        price,
        features: features_array,
        description,
        image: uploadedUrl,
      };


      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/${name}
        `,
        categoryInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Category updated successfully");

      setLoad(false);
      navigate("/admin/categories");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong");
      setLoad(false);
    }
  };


  return (
    <div className="flex justify-center">
      <div className="w-[450px] pb-5 bg-white rounded-2xl p-6 ">
        <h2 className="text-xl font-semibold mb-4">Update Category</h2>

        <input
          type="text"
          placeholder="Category name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded mb-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Features"
          className="w-full p-2 border rounded mb-3"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          placeholder="Image"
          className="w-full p-2 mb-5 border rounded "
          onChange={handleFileChange}
        ></input>

        <button
                onClick={handleSave} // 👈 call save
                className="px-4 py-2 w-full bg-teal-600 text-white rounded flex justify-center"
              >
                {load ? (
                  <div
                    className="border-t-2 border-t-white w-[20px]
                min-h-[20px] rounded-full animate-spin"
                  ></div>
                ) : (
                  <span>Update</span>
                )}
              </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
