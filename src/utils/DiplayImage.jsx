import { useEffect, useState } from "react";
import axios from "axios";

function DiplayImage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/upload")
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {images.map(img => (
        <img key={img._id} src={img.url} alt={img.filename} width="200" />
      ))}
    </div>
  );
}

export default DiplayImage;
