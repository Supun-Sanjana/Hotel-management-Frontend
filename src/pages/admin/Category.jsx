import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);

  useEffect(() => {
    if (!categoryLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/category")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoryLoaded(true);
        });
    }
  }, [categoryLoaded]);

  const deleteItem = (name) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/v1/category/" + name)
      .then(() => setCategoryLoaded(false));
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Categories</h2>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Features</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-teal-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
                <td className="px-6 py-4 text-gray-600">${cat.price}</td>
                <td className="px-6 py-4 text-gray-600">
                  <ul className="list-disc list-inside">
                    {cat.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-gray-600">{cat.description}</td>
                <td className="px-6 py-4">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    onClick={() => deleteItem(cat.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
