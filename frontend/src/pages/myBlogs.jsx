import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Confirm from "../components/confirm";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showConfirmID,setConfirmID]=useState(null)


  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const t = localStorage.getItem("accessToken");

    if (t === "" || t === null) {
      console.log("No token found");
      return;
    }
    const getBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/myBlogs`, {
          headers: {
            Authorization: `Bearer ${t}`, // Attach token in headers
          },
        });
        const data = response.data;
        setBlogs(data);
      } catch (error) {
        console.log("error", error);
      }
    };
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
