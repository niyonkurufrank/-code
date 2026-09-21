import { useState } from "react";
import news from './assets/news-en.png'
import { FaHome, FaMosque } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { RiPlantFill } from "react-icons/ri"; 
import { BsGraphUpArrow } from "react-icons/bs";
import { GiMusicalNotes, GiBlackFlag } from "react-icons/gi";
import { GrPersonalComputer } from "react-icons/gr";
import AppRoutes from "./routes.jsx";
import LoginForm from "./components/login.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [isActive, setIsActive] = useState("All");
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const items= [
    {label:"Home", icon:<FaHome color={isActive === "Home" ? "#3B82F6" : "blue"}/>},
    {label:"Sports", icon:<IoIosFootball color={isActive === "Sports" ? "#3B82F6" : "black"}/>},
    {label:"Religion", icon:<FaMosque color={isActive === "Religion" ? "#3B82F6" : "yellow"}/>},
    {label:"Agriculture", icon:<RiPlantFill color={isActive === "Agriculture" ? "#3B82F6" : "green"}/>},
    {label:"Business", icon:<BsGraphUpArrow color={isActive === "Business" ? "#3B82F6" : "orange"}/>},
    {label:"Politics", icon:<GiBlackFlag color={isActive === "Politics" ? "#3B82F6" : "red"}/>},
    {label:"Entertainment", icon:<GiMusicalNotes color={isActive === "Entertainment" ? "#3B82F6" : "purple"}/>},
    {label:"Technology", icon:<GrPersonalComputer color={isActive === "Technology" ? "#3B82F6" : "black"}/>},    
  ]

  return (
    <div> 
      <div className="flex justify-center items-center ml-5 py-5 px-30 border-b-2 border-gray-300 gap-5">
        <div className="flex items-center">
          <img className="w-38 h-20 mr-5" src={news} alt="News Letter" />
          <h1 className="font-bold text-3xl text-blue-900 ml-4">THE DAILY BRIEF</h1>
        </div>
        <p className="text-gray-600 px-2">{new Date().toString()}</p>
        <input type="search" placeholder="Search..." className="border border-gray-300 rounded-md py-5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        
        <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-3 px-10 font-bold rounded-md">Subscribe</button>
      </div>

      <div className="flex justify-center items-center gap-10">
        {items.map((item, index) => (
          <div key={index} className={`flex items-center mt-5 gap-2 cursor-pointer ${isActive === item.label ? 'text-blue-500 font-bold border-b-2 border-blue-500' : 'text-gray-600'}`} onClick={() => {setIsActive(item.label); navigate('/')}}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div>
        <AppRoutes />
      </div>

      {showLogin && <LoginModal isClosed={() => setShowLogin(false)} />}
      {showRegister && <Register isClosed={() => setShowRegister(false)} />}
      
    </div>
  )
}

export default App