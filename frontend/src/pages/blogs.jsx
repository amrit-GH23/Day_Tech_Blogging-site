import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { fetchBlogs } from "../api";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlog(data);
    };
    getBlogs();
    setIsLoading(false);
  }, []);

  const handleClick = (id) => {
    navigate(`/view/${id}`);
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
            <p className="text-[#9CA3AF] font-medium">Loading amazing content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent">
            Discover Stories
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Explore insightful articles, tutorials, and stories from our community
          </p>
        </div>

        {blog.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {blog.map((item, index) => (
              <article
                key={item.id}
                className="group bg-[#0F172A] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#38BDF8]/20 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#1F2937] hover:border-[#38BDF8]/50"
                onClick={() => handleClick(item.id)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Card Header with gradient accent */}
                <div className="h-1 bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8]"></div>
                
                <div className="p-8">
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
                  <div className="flex items-center justify-between pt-6 border-t border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      {/* Author Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-[#0F172A] font-semibold shadow-lg shadow-[#38BDF8]/30">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#E5E7EB]">{item.author}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {new Date(item.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Read Time */}
                    {item.readTime && (
                      <span className="text-sm text-[#9CA3AF] flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.readTime}
                      </span>
                    )}
                  </div>
                  
                  {/* Read More Arrow */}
                  <div className="mt-6 flex items-center text-[#38BDF8] font-medium text-sm group-hover:translate-x-2 transition-transform">
                    Read more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0F172A] border-2 border-[#1F2937] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#E5E7EB] mb-2">No blogs yet</h3>
            <p className="text-[#9CA3AF]">Be the first to share your story!</p>
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

export default Blogs;
