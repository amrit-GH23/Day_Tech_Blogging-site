import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Confirm from "../components/confirm";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showConfirmID,setConfirmID]=useState(null)

  const API_BASE = "https://day-tech-blogging-site.onrender.com";

 
  const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");

    if (!refresh) {
      console.log("No refresh token found in localStorage.");
      return false;
    }

    try {
      const response = await fetch(`${API_BASE}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      console.log("Token refreshed!");
      return true;
    } catch (error) {
      console.log("Error refreshing token:", error);
      return false;
    }
  };

  const getBlog = async (isRetry = false) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("No access token");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/api/myBlogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        !isRetry 
      ) {
        const refreshed = await refreshToken();
        if (refreshed) {
          getBlog(true); 
        } else {
          console.log("Session expired, redirecting to login...");
          navigate("/login"); 
        }
      } else {
        console.log("Error fetching blogs:", error);
      }
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  function handleClick(id) {
    navigate(`/view/${id}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">
          Your Blogs 📝
        </h1>

        {blogs.length > 0 ? (
          <div className="flex flex-col items-center space-y-6">
            {blogs.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 w-full max-w-4xlxl rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col"
                onClick={() => handleClick(item.id)}
              >
                <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-black mb-3">By {item.author}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div
                  className="text-gray-700 text-base"
                  dangerouslySetInnerHTML={{
                    __html:
                      item.content.length > 100
                        ? item.content.substring(0, 100) + "..."
                        : item.content,
                  }}
                ></div>
                <button
                  onClick={(e)=>{
                    e.stopPropagation()
                    setConfirmID(item.id)
                  }}
                  className=" text-white px-2 py-2 rounded hover:bg-red-400  transition self-end"
                >
                  🗑️
                </button>
                {
                  showConfirmID===item.id&&( 
                  <Confirm
                   id={item.id}
                   onConfirm={()=>{
                    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== item.id));
                     setConfirmID(null)
                   }}
                   onCancel={()=>{
                     setConfirmID(null)
                   }}
                  />
                   
                  )
                }
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No blogs...Create blog now
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
