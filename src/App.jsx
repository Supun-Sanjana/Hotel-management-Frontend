import { BrowserRouter, Route, Routes } from "react-router-dom"
import Admin from "./pages/admin/AdminPage"
import ClientPage from "./pages/client/ClientPage"
import Bookings from "./pages/admin/Booking/Bookings"
import Rooms from "./pages/admin/Rooms/Rooms"
import Category from "./pages/admin/Category"
import User from "./pages/admin/User"
import Feedback from "./pages/admin/Feedback"
import Login from "./pages/login/login"
import UploadImage from "./utils/Upload"
import DiplayImage from "./utils/DiplayImage"
import { Toaster } from "react-hot-toast"
import UpdateCategory from "./pages/admin/UpdateCategory/UpdateCategory"
import Gallery from "./pages/admin/Gallery"
import UpdateGallery from "./pages/admin/UpdateGallery/updateGallery"
import Register from "./pages/register/Register"
import OTP from "./components/client/email-verify"
import UpdateRoom from "./pages/admin/UpdateRoom/UpdateRoom"

function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" />
        <Routes >
          {/* Client pages */}
          <Route path="/" element={<ClientPage />} />
          <Route path="/verify-email" element={<OTP/>} />

          {/* Admin pages */}
          <Route path="/admin" element={<Admin />} >
              <Route path="bookings" element={<Bookings/>} />
              <Route path="rooms" element={<Rooms/>} />
              <Route path="rooms/update-rooms" element={<UpdateRoom/>} />
              <Route path="categories" element={<Category/>} />
              <Route path="users" element={<User/>} />
              <Route path="feedback" element={<Feedback/>} />
              <Route path="gallery" element={<Gallery/>} />
              <Route path="gallery/update-gallery" element={<UpdateGallery/>} />
              <Route path="categories/update-category" element={<UpdateCategory/>} />
          </Route>

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>}></Route>
          <Route path="upload" element={<UploadImage/>}/>
          <Route path="gallery" element={<DiplayImage/>}/>


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
