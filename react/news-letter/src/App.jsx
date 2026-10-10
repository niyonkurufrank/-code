import { useState } from "react";
import news from './assets/news-en.png'
import { FaHome, FaMosque } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { RiPlantFill } from "react-icons/ri"; 
import { BsGraphUpArrow } from "react-icons/bs";
import { GiMusicalNotes, GiBlackFlag } from "react-icons/gi";
import { GrPersonalComputer } from "react-icons/gr";
import AppRoutes from "./routes.jsx";
import LoginModal from "./components/login.jsx";
import Register from "./components/register.jsx";
import CommentModal from "./components/CommentModal.jsx";
import TopLoader from "./components/Loading.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false);
  const [isActive, setIsActive] = useState("Home");
  const [loading, setLoading] = useState(false)
  const [showComment, setShowComment] = useState(null)

  const runWithLoading = (callback) => {
    setLoading(true)
    setTimeout(() => {
      callback()
      setLoading(false)
    }, 1000)
  }

  const handleCategoryClick = (label) => {
    runWithLoading(() => {
      setIsActive(label)
    })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    runWithLoading(() => {})
  }

  const handleSubscribe = () => {
    runWithLoading(() => {
      setShowLogin(true)
    })
  }

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
      <div className="flex justify-between items-center py-5 px-10 border-b-2 border-gray-300 gap-5">
        <div className="flex items-center">
          <img className="w-32 h-16 mr-5" src={news} alt="News Letter" />
          <h1 className="font-bold text-3xl text-blue-900 ml-4">THE DAILY BRIEF</h1>
        </div>
        <p className="text-gray-600 px-2 text-sm hidden lg:block">{new Date().toString()}</p>
        <form onSubmit={handleSearch}>
          <input type="search" placeholder="Search..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </form>
        
        <button onClick={handleSubscribe} className="bg-blue-500 text-white px-10 py-3 font-bold rounded-md">Subscribe</button>
      </div>

      <TopLoader loading={loading} />

      <div className="flex justify-center items-center gap-10 border-b">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center py-3 gap-2 cursor-pointer ${isActive === item.label ? 'text-blue-500 font-bold border-b-2 border-blue-500' : 'text-gray-600'}`} 
            onClick={() => handleCategoryClick(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div>

        <AppRoutes activeCategory={isActive} setShowComment={setShowComment} />
      </div>

      {showLogin && <LoginModal isClosed={() => setShowLogin(false)} />}
      {showRegister && <Register isClosed={() => setShowRegister(false)} />}
      {showComment && (
        <CommentModal
          newsTitle={showComment.title}
          isClosed={() => setShowComment(null)}
        />
      )}
    </div>
  )
}

export default App