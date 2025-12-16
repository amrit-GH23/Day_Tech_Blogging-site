import React from "react";
import Navbar from "../components/navbar";
import { fetchBlogs2 } from "../apiView";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrollProgress from "../components/scrollProgress";
import CommentBar from "../components/commentBar";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [Tcomment, setTcomment] = useState([]);
  const [token, setToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");
 
  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);
  }, []);

  useEffect(() => {
    const getBlog = async () => {
      const data = await fetchBlogs2(id);
      setBlog(data);
    };
    getBlog();
  }, [id]);

  const API_BASE = "https://day-tech-blogging-site.onrender.com";
  
  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/getcomment/${id}/`);
      const data = await response.json();
      setTcomment(data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const [progress, setProgress] = useState(0);

  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    setProgress(scrolled);
  };

  const sendComment = async () => {
    if (!comment.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }
    setIsSubmitting(true);
    setCommentError("");
    
    try {
      const response = await fetch(`${API_BASE}/api/comment/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      
      if (response.ok) {
        setComment("");
        fetchComments(); // Refresh comments after posting
      } else {
        setCommentError("Failed to post comment. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      setCommentError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

if (!blog) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#1F2937] rounded-full"></div>
              <div className="w-16 h-16 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
            <p className="text-[#9CA3AF] font-medium">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] pb-12">
      <Navbar />
      <ScrollProgress progressPercentage={progress} />
      
      {/* Blog Content */}
      <div className="mt-8 px-6 max-w-4xl mx-auto">
        <article
          onScroll={handleScroll}
          className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-y-auto shadow-xl"
          style={{ maxHeight: "800px" }}
        >
          {/* Article Header */}
          <div className="p-8 border-b border-[#1F2937] bg-gradient-to-br from-[#111827] to-[#0F172A]">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-4 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-[#0F172A] font-semibold shadow-lg shadow-[#38BDF8]/30">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[#E5E7EB] font-medium">{blog.author}</p>
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <span>{new Date(blog.created_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-8">
            <div 
              className="prose prose-invert max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>
      
      {/* Comments Section */}
      <div className="mt-8 px-6 max-w-4xl mx-auto">
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-xl">
          {/* Comments Header */}
          <div className="p-6 border-b border-[#1F2937] bg-gradient-to-br from-[#111827] to-[#0F172A]">
            <h2 className="text-2xl font-bold text-[#E5E7EB] flex items-center">
              <svg className="w-6 h-6 mr-3 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Comments
              {Tcomment.length > 0 && (
                <span className="ml-2 px-3 py-1 text-sm font-semibold text-[#38BDF8] bg-[#38BDF8]/10 rounded-full border border-[#38BDF8]/20">
                  {Tcomment.length}
                </span>
              )}
            </h2>
          </div>
          
          {/* Comment Form */}
          <div className="p-6 bg-[#0F172A]/30 border-b border-[#1F2937]">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <textarea
                  rows="4"
                  placeholder="Share your thoughts on this article..."
                  className={`w-full px-4 py-3 bg-[#0F172A] text-[#E5E7EB] placeholder-[#9CA3AF] border ${
                    commentError ? 'border-red-500' : 'border-[#1F2937]'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-all resize-none`}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setCommentError("");
                  }}
                />
                {commentError && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {commentError}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                {!token && (
                  <p className="text-sm text-[#9CA3AF] flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Please log in to post a comment
                  </p>
                )}
                
                <button
                  className="ml-auto px-6 py-2.5 bg-[#38BDF8] text-[#0F172A] font-semibold rounded-xl hover:bg-[#0EA5E9] transition-all duration-200 flex items-center gap-2 disabled:bg-[#1F2937] disabled:text-[#9CA3AF] disabled:cursor-not-allowed shadow-lg shadow-[#38BDF8]/20 hover:shadow-[#38BDF8]/40"
                  onClick={sendComment}
                  disabled={isSubmitting || !token}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="divide-y divide-[#1F2937] max-h-[500px] overflow-y-auto">
            {Tcomment.length > 0 ? (
              Tcomment.map((comm) => <CommentBar key={comm.id} comm={comm} />)
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0F172A] border-2 border-[#1F2937] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-[#E5E7EB] font-semibold mb-1">No comments yet</p>
                <p className="text-[#9CA3AF] text-sm">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .prose-invert {
          color: #E5E7EB;
        }
        .prose-invert h2 {
          color: #E5E7EB;
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose-invert h3 {
          color: #E5E7EB;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-invert p {
          color: #E5E7EB;
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .prose-invert a {
          color: #38BDF8;
          text-decoration: none;
        }
        .prose-invert a:hover {
          color: #0EA5E9;
          text-decoration: underline;
        }
        .prose-invert strong {
          color: #E5E7EB;
          font-weight: 600;
        }
        .prose-invert code {
          color: #38BDF8;
          background-color: #1F2937;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .prose-invert pre {
          background-color: #0F172A;
          border: 1px solid #1F2937;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        /* Custom scrollbar */
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        *::-webkit-scrollbar-track {
          background: #0F172A;
        }
        *::-webkit-scrollbar-thumb {
          background: #1F2937;
          border-radius: 4px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #38BDF8;
        }
      `}</style>
    </div>
  );
};

export default BlogView;