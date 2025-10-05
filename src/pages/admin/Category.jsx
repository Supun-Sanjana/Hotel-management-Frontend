import  { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import CategoryModal from "./AddCategory/addModel";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);


  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

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
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/v1/category/"+name, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success(name + " deleted successfully");
        setCategoryLoaded(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };


  return (
    <>
      <div className="w-full p-6 min-h-screen ">
        <button
          className="cursor-pointer fixed bottom-6 right-6 p-2 rounded-full text-white text-5xl w-12 h-12 flex items-center justify-center bg-teal-600 "
          onClick={() => setShowModal(true)}
        >
          <Plus />
        </button>

        {/* Modal */}
        <CategoryModal showModal={showModal} setShowModal={setShowModal} />

        <h2 className="text-2xl font-semibold text-teal-800 mb-4">
          Categories
        </h2>

        <div className="overflow-x-auto scrollbar-hide rounded-2xl shadow-md overflow-scroll">
          <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-6 py-3 font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider">
                  Features
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="hover:bg-teal-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {cat.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">${cat.price}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <ul className="list-disc list-inside">
                      {cat.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{cat.description}</td>

                  <td>
                    <img key={cat._id} src={cat.image} alt={cat.name} width="50" />

                  </td>

                  <td className="px-6 py-4 flex gap-2">

                    <Link to={`update-category`}
                    state={cat}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"

                    >
                      Edit
                    </Link>


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
    </>
  );
};

export default Category;
