import { useNavigate } from "react-router-dom"

function Register({ isClosed }) {
  const navigate = useNavigate();

  // Niba iri muri modal, ifunge. Niba iri kuri /register page, subira Home
  const handleClose = () => {
    if (isClosed) {
      isClosed();
    } else {
      navigate('/');
    }
  };

  const goToLogin = () => {
    if (isClosed) isClosed();
    navigate('/login');
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6 relative">

        {/* X IKORA 100% UBU */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Register Page</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium">Username:</label>
            <input className="w-full mt-1 border border-gray-300 rounded-md p-2.5" placeholder="Enter username" />
          </div>

          <div>
            <label className="text-sm font-medium">Email:</label>
            <input className="w-full mt-1 border border-gray-300 rounded-md p-2.5" placeholder="Enter email" />
          </div>

          <div>
            <label className="text-sm font-medium">Password:</label>
            <input type="password" className="w-full mt-1 border border-gray-300 rounded-md p-2.5" placeholder="Enter password" />
          </div>

          <button className="w-full bg-green-500 text-white py-2.5 rounded-md font-bold mt-2 hover:bg-green-600">
            Register
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?
            <span onClick={goToLogin} className="text-blue-600 font-bold cursor-pointer ml-1 underline">Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register