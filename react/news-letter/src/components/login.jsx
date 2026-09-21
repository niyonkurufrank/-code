import { useNavigate } from "react-router-dom"

function Login({ isClosed }) {
  const navigate = useNavigate();

  const handleClose = (e) => {
    if(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Niba iri modal ifunge, niba iri page subira Home
    if (isClosed) {
      isClosed();
    } else {
      navigate('/');
    }
  };

  return (
    // Ukanze hanze ya card irafunga
    <div onClick={handleClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999] p-4">

      {/* Kanda imbere ya card ntiyifunge */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl w-[400px] p-6 relative">

        {/* X - Dore uko ikora neza */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold z-10"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium">Username or Email:</label>
            <input className="w-full mt-1 border border-gray-300 rounded-md p-2.5" placeholder="Enter email" />
          </div>
          <div>
            <label className="text-sm font-medium">Password:</label>
            <input type="password" className="w-full mt-1 border border-gray-300 rounded-md p-2.5" placeholder="Enter password" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2.5 rounded-md font-bold mt-2 hover:bg-blue-600">
            Login
          </button>
          <p className="text-sm text-center mt-2">
            Don't have an account? <span onClick={() => { handleClose(); navigate('/register'); }} className="text-blue-600 font-bold cursor-pointer underline ml-1">Register</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login