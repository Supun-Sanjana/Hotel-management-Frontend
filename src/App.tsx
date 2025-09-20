import { BrowserRouter, Route, Routes } from "react-router-dom"
import Admin from "./pages/admin/AdminPage"
import ClientPage from "./pages/client/ClientPage"
import Bookings from "./pages/admin/Bookings"
import Rooms from "./pages/admin/Rooms"
import Category from "./pages/admin/Category"
import User from "./pages/admin/User"
import Feedback from "./pages/admin/Feedback"
import Gallery from "./pages/admin/Gallery"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          {/* Client pages */}
          <Route path="/" element={<ClientPage />} />

          {/* Admin pages */}
          <Route path="/admin" element={<Admin />} >
              <Route path="bookings" element={<Bookings/>} />
              <Route path="rooms" element={<Rooms/>} />
              <Route path="categories" element={<Category/>} />
              <Route path="users" element={<User/>} />
              <Route path="feedback" element={<Feedback/>} />
              <Route path="gallery" element={<Gallery/>} />
          </Route>



        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
