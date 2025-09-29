import { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:4000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUrl(res.data.url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {url && <img src={url} alt="Uploaded" width="200" />}
    </div>
  );
}

export default UploadImage;
