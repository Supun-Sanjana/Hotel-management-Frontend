import { BrowserRouter, Route, Routes } from "react-router-dom"
import ClientNav from "./components/client/nav"
import Admin from "./pages/admin/AdminPage"
import ClientPage from "./pages/client/ClientPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
           
            <Route path="/" element={<ClientPage/>}/>
            <Route path="/admin" element={<Admin/>} />
            <Route path="/admin/*" element={<h1>Admin</h1>}/>
        </Routes>
       </BrowserRouter>

    </>
  )
}

export default App
