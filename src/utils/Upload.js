// utils/Upload.js
import axios from "axios";

async function UploadImage(file) {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file); // 👈 must match multer field name in backend

  const res = await axios.post("https://hotel-management-backend-production-053e.up.railway.app/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url; // 👈 return uploaded image URL
}

export default UploadImage;
