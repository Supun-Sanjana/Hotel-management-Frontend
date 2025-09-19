import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='w-full max-h-[100vh] overflow-hidden flex'>
      <div className='w-[20%] bg-green-100 h-[100vh] flex-col'>
          <div>
            <h2>LuxeSphere</h2>
          </div>
          <div className='text-white text-xl hover:text-black'>
           <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
          <div className='text-white text-xl hover:text-black'>
           <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
          <div className='text-white text-xl hover:text-black'>
           <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
          <div className='text-white text-xl hover:text-black'>
           <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
          <div className='text-white text-xl hover:text-black'>
           <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
          <div className='text-white text-xl hover:text-black'>
           <Link to={'/admin/bookings'}>Bookings</Link>
          </div>
      </div>

      <div className='w-[80%] bg-green-200'>
          <div>
            <h2>Welcome to LuxeSphere Admin Dashboard</h2>
          </div>
      </div>
    </div>
  )
}

export default Admin
