import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { fetchBlogs } from "../api";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlog(data);
    };
    getBlogs();
  }, []);

  const handleClick = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">
          Explore Blogs 📝
        </h1>

        {blog.length > 0 ? (
  <div className="flex flex-col items-center space-y-6">
    {blog.map((item) => (
      <div
        key={item.id}
        className="bg-white p-6 w-full max-w-4xlxl rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        onClick={() => handleClick(item.id)}
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          {item.title}
        </h2>
        <p className="text-sm text-black mb-3">By {item.author}</p>
        <p className="text-sm text-gray-500 mb-3">{new Date(item.created_at).toLocaleDateString()}</p>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html:
              item.content.length > 100
                ? item.content.substring(0, 100) + "..."
                : item.content,
          }}
        ></div>
      </div>
    ))}
  </div>
) : 
   (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-600 font-medium">Loading blog...</p>
        </div>
      </div>
)}
      </div>
    </div>
  );
};

export default Blogs;
