import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import LoginPage from "./components/login.jsx"
import Register from "./components/register.jsx"

function AppRoutes({ activeCategory, setShowComment }) {
  return (
    <Routes>
      <Route path="/" element={<Home activeCategory={activeCategory} setShowComment={setShowComment} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes