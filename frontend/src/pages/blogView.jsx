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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-600 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white pb-12">
      <Navbar />
      <ScrollProgress progressPercentage={progress} />
      
      {/* Blog Content */}
      <div
        onScroll={handleScroll}
        className="mt-3.5 p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-y-scroll h-full border border-gray-300"
        style={{ maxHeight: "800px" }}
      >
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600 mb-4">By {blog.author}</p>
        <p className="text-gray-600 mb-4">
          Posted on: {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <p
          className="text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>
      </div>
      
      {/* Comments Section */}
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Comments {Tcomment.length > 0 && `(${Tcomment.length})`}
            </h2>
          </div>
          
          {/* Comment Form */}
          <div className="p-5 bg-gray-50">
            <div className="flex flex-col">
              <div className="relative">
                <textarea
                  rows="3"
                  placeholder="Share your thoughts..."
                  className={`w-full px-3 py-2 border ${commentError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                {commentError && (
                  <p className="text-red-500 text-sm mt-1">{commentError}</p>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center disabled:bg-blue-300"
                  onClick={sendComment}
                  disabled={isSubmitting || !token}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>
                      Post Comment
                    </>
                  )}
                </button>
              </div>
              {!token && (
                <p className="text-sm text-gray-500 mt-2">Please log in to post a comment</p>
              )}
            </div>
          </div>
          
          {/* Comments List */}
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {Tcomment.length > 0 ? (
              Tcomment.map((comm) => <CommentBar key={comm.id} comm={comm} />)
            ) : (
              <div className="p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="mt-2 text-gray-500 font-medium">No comments yet</p>
                <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;