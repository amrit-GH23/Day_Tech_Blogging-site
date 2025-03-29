import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const {id} = useParams()

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);

  }, []);



  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="flex justify-between items-center pl-2 border-b bg-blue-100 h-20">
      <img
        src={logo}
        alt="logo"
        className="h-16 w-auto pl-4 cursor-pointer"
        onClick={() => navigate("/blog")}
      />

      <div className="flex justify-around space-x-4 pr-2"> 
      <NavLink
         to="/create"
         onClick={(e) => {
           if (!token) {
             e.preventDefault();
             toast.error("Login required to create a blog!");
           }
         }}
         className={({ isActive }) =>
           `border-0 rounded-2xl cursor-pointer p-2 text-white transition-all duration-200 ${
             isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
           }`
         }
       >
         Create Blog
       </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `border-0 rounded-2xl cursor-pointer p-2 text-white transition-all duration-200 ${
              isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
            }`
          }
        >
          Get Started
        </NavLink>

        {token ? (
          <button
            onClick={handleLogout}
            className="border-0 rounded-2xl cursor-pointer bg-blue-400 hover:bg-blue-500 p-2 text-white transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `border-0 rounded-2xl cursor-pointer p-2 text-white transition-all duration-200 ${
                isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
              }`
            }
          >
            Sign up
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
