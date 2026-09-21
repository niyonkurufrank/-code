import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import LoginPage from "./components/login.jsx" // niba ushaka page yose ya login
import Register from "./components/register.jsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage isClosed={() => {}} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
export default AppRoutes