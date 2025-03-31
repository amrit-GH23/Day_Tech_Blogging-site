import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const {id} = useParams()
  
  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);

  }, []);

  const Check_user=async(id)=>{
  const API_BASE = import.meta.env.VITE_API_URL;
  
  try{
    const response = await axios.get(`${API_BASE}/api/validate/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in headers
      },
    });
    return response.data.authorized
  }
    catch (error) {
      console.error("Error fetching blogs:", error);
      return false;
    }
  }



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

    {!id?(
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
    ):(
      <NavLink
      // to={`/edit/${id}`}
      onClick={async(e) => {
        if (!token) {
          e.preventDefault();
          toast.error("Login required to Edit a blog!");
        }
        else{
            e.preventDefault();
             const res=await Check_user(id);
             if(!res){
            toast.error("You are not authorised to edit blog!!")
          }
          else{
            navigate(`/edit/${id}`)
          }
      }}}
      className={({ isActive }) =>
        `border-0 rounded-2xl cursor-pointer p-2 text-white transition-all duration-200 ${
          isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
        }`
      }
    >
      Edit Blog
    </NavLink>
    )}

        <NavLink
          to="/myBlogs"
          onClick={(e)=>{
            if(!token){
              e.preventDefault()
              toast.error("Login required")
            }
            // toast("Will be added")
          }}
          className={({ isActive }) =>
            `border-0 rounded-2xl cursor-pointer p-2 text-white transition-all duration-200 ${
              isActive ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
            }`
          }
        >
          My Blogs
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
