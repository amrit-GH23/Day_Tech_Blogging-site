import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);
  }, []);

  const Check_user = async(id) => {
    const API_BASE = import.meta.env.VITE_API_URL;
    
    try {
      const response = await axios.get(`${API_BASE}/api/validate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      });
      return response.data.authorized;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return false;
    }
  };

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    navigate("/login");
    setMenuOpen(false);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="border-b bg-blue-100">
      <div className="flex justify-between items-center h-20 px-4 md:px-6">
        <img
          src={logo}
          alt="logo"
          className="h-12 md:h-16 w-auto cursor-pointer"
          onClick={() => navigate("/blog")}
        />

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex justify-around space-x-4">
          {renderNavLinks()}
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-blue-100 border-t border-blue-200">
          <div className="flex flex-col space-y-2">
            {renderNavLinks()}
          </div>
        </div>
      )}
    </nav>
  );

  function renderNavLinks() {
    return (
      <>
        {!id ? (
          <NavLink
            to="/create"
            onClick={(e) => {
              if (!token) {
                e.preventDefault();
                toast.error("Login required to create a blog!");
              }
              setMenuOpen(false);
            }}
            className={({ isActive }) =>
              `border-0 rounded-2xl cursor-pointer p-2 text-white text-center transition-all duration-200 ${
                isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
              }`
            }
          >
            Create Blog
          </NavLink>
        ) : (
          <NavLink
            onClick={async(e) => {
              if (!token) {
                e.preventDefault();
                toast.error("Login required to Edit a blog!");
              }
              else {
                e.preventDefault();
                const res = await Check_user(id);
                if(!res) {
                  toast.error("You are not authorised to edit blog!!");
                }
                else {
                  navigate(`/edit/${id}`);
                  setMenuOpen(false);
                }
              }
            }}
            className={({ isActive }) =>
              `border-0 rounded-2xl cursor-pointer p-2 text-white text-center transition-all duration-200 ${
                isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
              }`
            }
          >
            Edit Blog
          </NavLink>
        )}

        <NavLink
          to="/myBlogs"
          onClick={(e) => {
            if(!token) {
              e.preventDefault();
              toast.error("Login required");
            }
            setMenuOpen(false);
          }}
          className={({ isActive }) =>
            `border-0 rounded-2xl cursor-pointer p-2 text-white text-center transition-all duration-200 ${
              isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
            }`
          }
        >
          My Blogs
        </NavLink>

        {token ? (
          <button
            onClick={handleLogout}
            className="border-0 rounded-2xl cursor-pointer bg-blue-400 hover:bg-blue-500 p-2 text-white text-center transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `border-0 rounded-2xl cursor-pointer p-2 text-white text-center transition-all duration-200 ${
                isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
              }`
            }
          >
            Sign up
          </NavLink>
        )}
      </>
    );
  }
};

export default Navbar;