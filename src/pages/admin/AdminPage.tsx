import { BookmarkCheck, ChartBarStacked, House, Images, MessageSquareMore, User } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'



const Admin = () => {
  return (
    <div className='w-full max-h-screen overflow-hidden flex-col'>

      <div className='flex text-white text-2xl  bg-teal-800 p-4  h-15 w-full gap-15'>
        <h2>LuxeSphere</h2>
        <h2 className='text-white text-lg'>Welcome to LuxeSphere Admin Dashboard</h2>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <div className='w-[20%] bg-teal-900 h-[100vh] flex-col py-5'>

          <div className='cursor-pointer flex gap-1 items-center text-white text-xl hover:text-teal-500 bg-teal-800 p-2 mb-2 mx-3 rounded-lg pl-6'>
            <BookmarkCheck />
            <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
          <div className='flex gap-1 items-center text-white text-xl hover:text-teal-500 bg-teal-800 p-2 mb-2 mx-3 rounded-lg pl-6'>
            <House />
            <Link to={'/admin/rooms'}>Rooms</Link>
          </div>
          <div className='flex gap-1 items-center text-white text-xl hover:text-teal-500 bg-teal-800 p-2 mb-2 mx-3 rounded-lg pl-6'>
            <ChartBarStacked />
            <Link to={'/admin/categories'}>Categories</Link>
          </div>
          <div className='flex gap-1 items-center text-white text-xl hover:text-teal-500 bg-teal-800 p-2 mb-2 mx-3 rounded-lg pl-6'>
            <User />
            <Link to={'/admin/users'}>Users</Link>
          </div>
          <div className='flex gap-1 items-center text-white text-xl hover:text-teal-500 bg-teal-800 p-2 mb-2 mx-3 rounded-lg pl-6'>
            <MessageSquareMore />
            <Link to={'/admin/feedback'}>Feedback</Link>
          </div>
          <div className='flex gap-1 items-center text-white text-xl hover:text-teal-500 bg-teal-800 p-2 mb-2 mx-3 rounded-lg pl-6'>
            <Images />
            <Link to={'/admin/gallery'}>Gallery</Link>
          </div>
        </div>

        {/* Main Content */}

        <div className='w-[80%] h-[100vh]  bg-gray-50 overflow-y-scroll p-3 scrollbar-hide'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Admin
