import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate("/");
  };

  
  useEffect(() => {
    let timer;
    if (userDropdown) {
      timer = setTimeout(() => setUserDropdown(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [userDropdown]);

  
  useEffect(() => {
    if (location.pathname === "/") dispatch(logoutUser());
  }, [location.pathname, dispatch]);

  return (
    <nav className="bg-gray-400 text-white px-6 py-4 shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
       
        <div className="hidden md:flex items-center gap-6">
          {user?.role === "admin" && (
            <>
              <Link
                to="/desktop"
                className="hover:text-blue-200 transition duration-200"
              >
                Desktop
              </Link>
              <Link
                to="/addusers"
                className="hover:text-blue-200 transition duration-200"
              >
                Add User
              </Link>
            </>
          )}
        </div>

      
        <div className="relative hidden md:block">
          <span
            onClick={() => setUserDropdown(!userDropdown)}
            className="cursor-pointer px-3 py-1 rounded hover:bg-gray-500 transition"
          >
            {user?.email}
          </span>

          {userDropdown && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-40">
              <button
                onClick={handleLogout}
                className="px-4 py-2 w-full hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-2 bg-gray-500 rounded"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

     
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4 text-white flex flex-col gap-3">
          {user?.role === "admin" && (
            <>
              <Link
                to="/desktop"
                className="hover:text-blue-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Desktop
              </Link>
              <Link
                to="/addusers"
                className="hover:text-blue-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Add User
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-left hover:text-blue-200 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
