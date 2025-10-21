import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Plus, X } from "lucide-react";

const ClientFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loggedInEmail = JSON.parse(localStorage.getItem("user")).email;
    setEmail(loggedInEmail);
    fetchFeedbacks(loggedInEmail);
  }, []);

  // 🔹 Fetch feedbacks by user email
  const fetchFeedbacks = async (email) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback/byEmail/${email}`
      );
      setFeedbacks(res.data.list || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch feedbacks");
    }
  };

  // 🔹 Handle feedback submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback`, {
        userName: name,
        email,
        rating,
        message,
      });

      toast.success("Feedback submitted successfully!");
      setName("");
      setRating(5);
      setMessage("");
      setShowModal(false);
      fetchFeedbacks(email); // refresh table
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback.");
    } finally {
      setLoading(false);
      
    }
  };

  const handelDelete =async (id)=>{
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback/delete/${id}`)
      fetchFeedbacks(email);
      toast.success("Feedback deleted successfully");
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Feedbacks</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md transition-all"
        >
          <Plus size={18} />
          Add Feedback
        </button>
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {feedbacks.length > 0 ? (
              feedbacks.map((f) => (
                <tr key={f._id} className="hover:bg-teal-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {f.userName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{f.rating} ⭐</td>
                  <td className="px-6 py-4 text-gray-600">{f.message}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-red-600">
                    <button 
                    onClick={()=>handelDelete(f._id)}
                    className="bg-red-300 px-3 py-2 rounded-full">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No feedbacks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Submit Feedback
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your feedback here..."
                  rows={4}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFeedback;
