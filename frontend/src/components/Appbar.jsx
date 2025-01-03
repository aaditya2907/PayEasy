import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  function Logout() {
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <div className="shadow-md bg-white fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span className="text-3xl font-bold">
              Pay<span className="text-green-500">Easy</span>
            </span>
          </div>

          <button
            onClick={Logout}
            className="inline-flex items-center px-6 py-3 rounded-lg
                     text-base font-medium text-white bg-green-500 
                     hover:bg-green-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-green-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
