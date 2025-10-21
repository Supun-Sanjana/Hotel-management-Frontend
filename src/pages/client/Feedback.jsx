import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ClientFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInemail = JSON.parse(localStorage.getItem("user")).email;
    setEmail(loggedInemail);
  }, []);

  console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback`, {
        userName:name,
        email,
        rating,
        message,
      });

      toast.success("Feedback submitted successfully!");
      setName("");
      
      setRating(5);
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Submit Feedback
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
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

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            disabled
            placeholder={email}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium text-gray-600">Rating</label>
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

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-600">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback here..."
            rows={4}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
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
  );
};

export default ClientFeedback;
