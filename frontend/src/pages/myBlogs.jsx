import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Confirm from "../components/confirm";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showConfirmID,setConfirmID]=useState(null)
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  };

  useEffect(() => {
    getBlog();
  }, []);

  function handleClick(id) {
    navigate(`/view/${id}`);
  }

   const handleEdit = (e, id) => {
    e.stopPropagation();
    console.log(`Navigate to /edit/${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setConfirmID(id);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#1F2937] rounded-full"></div>
              <div className="w-16 h-16 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
            <p className="text-[#9CA3AF] font-medium">Loading your blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent mb-2">
                Your Blogs
              </h1>
              <p className="text-[#9CA3AF] text-lg">
                {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} published
              </p>
            </div>
            
            <button
              onClick={() => navigate('/create')}
              className="px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-[#0F172A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#38BDF8]/30 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New
            </button>
          </div>
        </div>

        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((item, index) => (
              <article
                key={item.id}
                className="group bg-[#111827] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#38BDF8]/10 transition-all duration-300 border border-[#1F2937] hover:border-[#38BDF8]/50 cursor-pointer"
                onClick={() => handleClick(item.id)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Card Header with gradient accent */}
                <div className="h-1 bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8]"></div>
                
                <div className="p-6">
                  {/* Category Badge */}
                  {item.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#38BDF8] bg-[#38BDF8]/10 rounded-full mb-4 border border-[#38BDF8]/20">
                      {item.category}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#38BDF8] transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-[#9CA3AF] mb-6 line-clamp-3 leading-relaxed">
                    {stripHtml(item.content)}
                  </p>
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-[#0F172A] font-semibold text-sm shadow-lg shadow-[#38BDF8]/30">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs text-[#9CA3AF]">
                          {new Date(item.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        {item.readTime && (
                          <p className="text-xs text-[#9CA3AF]">{item.readTime}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="p-2 text-[#9CA3AF] hover:text-[#38BDF8] hover:bg-[#38BDF8]/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-2 text-[#9CA3AF] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Confirmation Modal */}
                {showConfirmID === item.id && (
                  <Confirm
                    id={item.id}
                    onConfirm={() => {
                      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== item.id));
                      setConfirmID(null);
                    }}
                    onCancel={() => setConfirmID(null)}
                  />
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#111827] border-2 border-[#1F2937] flex items-center justify-center">
              <svg className="w-12 h-12 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">No blogs yet</h3>
            <p className="text-[#9CA3AF] mb-8">Start sharing your thoughts with the world!</p>
            <button
              onClick={() => console.log('Navigate to create blog')}
              className="px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-[#0F172A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#38BDF8]/30 transition-all duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Blog
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MyBlogs;