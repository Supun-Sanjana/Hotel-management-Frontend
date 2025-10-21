import axios from "axios";
import React, { useEffect, useState } from "react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback`)
      .then((res) => {
        setFeedbacks(res.data.list || []);
      })
      .catch((err) => {
        console.error("Failed to fetch feedback:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Feedback List
      </h2>

      <div className="overflow-x-auto scrollbar-hide rounded-2xl shadow-md overflow-scroll">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {feedbacks.map((fb) => (
              <tr
                key={fb._id}
                className="hover:bg-teal-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {fb.userName}
                </td>
                <td className="px-6 py-4 text-gray-600">{fb.email}</td>
                <td className="px-6 py-4 text-gray-600">{fb.message}</td>
                <td className="px-6 py-4 text-gray-600">{fb.rating || "—"}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    onClick={() => console.log("delete", fb._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {feedbacks.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No feedbacks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
