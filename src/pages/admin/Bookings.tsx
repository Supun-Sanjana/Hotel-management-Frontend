
const Bookings = () => {
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Bookings</h2>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Room ID</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Start Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-teal-50 transition-colors">

              <td className="px-6 py-4">BKG001</td>
              <td className="px-6 py-4">RM101</td>
              <td className="px-6 py-4">guest@example.com</td>
              <td className="px-6 py-4">+94 771234567</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Confirmed
                </span>
              </td>
              <td className="px-6 py-4">2025-09-21</td>
            </tr>

            <tr className="hover:bg-teal-50 transition-colors">
              <td className="px-6 py-4">BKG002</td>
              <td className="px-6 py-4">RM202</td>
              <td className="px-6 py-4">user@example.com</td>
              <td className="px-6 py-4">+94 771111111</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4">2025-09-23</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Bookings
