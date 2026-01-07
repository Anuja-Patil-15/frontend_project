import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Context";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [open, setOpen] = useState(false);

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  
  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 2000); 
    }

    return () => clearTimeout(timer); 
  }, [open]);

  useEffect(() => {
    if (location.pathname === "/") {
      setUser(null);
    }
  }, [location.pathname, setUser]);

  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4">
        {user?.role === "admin" && (
          <>
            <Link to="/desktop">Desktop</Link>
            <Link to="/addusers">Add User</Link>
          </>
        )}
      </div>

      <div className="relative">
        <span
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        >
          {user?.email}
        </span>

        {open && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow">
            <button
              onClick={logout}
              className="px-4 py-2 hover:bg-gray-100 w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
