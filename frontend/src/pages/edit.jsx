import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import Navbar from "../components/navbar";
import { fetchBlogs2 } from "../apiView";
import { useParams } from "react-router-dom";


const Edit = () => {
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const { id } = useParams();
  // const [token, setToken] = useState(null);

useEffect(() => {
  if (!blog) return;
  setHasChanges(
    title !== blog.title || content !== blog.content
  );
}, [title, content, blog]);


 const token = localStorage.getItem("accessToken");


 useEffect(() => {
  const getBlog = async () => {
    try {
      const data = await fetchBlogs2(id);
      setBlog(data);
      setTitle(data.title);
      setContent(data.content);
    } finally {
      setIsLoading(false);
    }
  };

  getBlog();
}, [id]);

   

  const submitPost = async () => {
      setIsSubmitting(true);
    const blogData = {
      title,
      content
        };

    try {
      const API_BASE ="https://day-tech-blogging-site.onrender.com";
      const response = await fetch(`${API_BASE}/api/edit/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });
     if (response.status === 200) {
  toast.success("🎉 Blog Updated successfully!");
  setShowSuccess(true);
  setHasChanges(false);
}

       else {
        const data = await response.json();
        console.error("Error response:", data);
        toast.error("❌ Failed to publish. Check console.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("❌ Network error. Try again later.");
    }
      setShowSuccess(true);
      setIsSubmitting(false);
      setHasChanges(false);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost();
  };
    const handleCancel = () => {
    if (hasChanges) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to discard them?");
      if (confirmed && blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setHasChanges(false);
      }
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "code-block", "blockquote"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  console.log(isSubmitting, hasChanges);

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
            <p className="text-[#9CA3AF] font-medium">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-6 z-50 animate-slideIn">
          <div className="bg-[#111827] border border-[#38BDF8] rounded-xl shadow-xl shadow-[#38BDF8]/20 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[#E5E7EB] font-semibold">Success!</p>
              <p className="text-[#9CA3AF] text-sm">Blog updated successfully</p>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved Changes Indicator */}
      {hasChanges && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#111827] border border-[#38BDF8]/30 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 bg-[#38BDF8] rounded-full animate-pulse"></div>
            <p className="text-[#E5E7EB] text-sm font-medium">Unsaved changes</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-[#38BDF8]/30">
                <svg className="w-6 h-6 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent">
                  Edit Blog
                </h1>
                <p className="text-[#9CA3AF] mt-1">Update your published content</p>
              </div>
            </div>
            
            {/* Back Button */}
            <button
              type="button"
              onClick={() => console.log('Navigate back')}
              className="px-4 py-2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-[#E5E7EB] font-semibold mb-3">
                  Title
                  <span className="text-[#38BDF8] ml-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter blog title..."
                  className="w-full px-4 py-3 bg-[#0F172A] text-[#E5E7EB] placeholder-[#9CA3AF] border border-[#1F2937] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-[#E5E7EB] font-semibold mb-3">
                  Content
                  <span className="text-[#38BDF8] ml-1">*</span>
                </label>
               <ReactQuill
                           theme="snow"
                           placeholder="Start writing your blog post..."
                           modules={modules}
                           value={content}
                           onChange={setContent}
                           className="h-[500px] text-lg text-white"
                           style={{ maxHeight: "500px" }}
                         />
               <p className="text-[#9CA3AF] text-sm mt-2">
  {content.length === 0
    ? "Use the toolbar above to format your content"
    : null}
</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!hasChanges}
              className="px-6 py-3 bg-[#111827] text-[#E5E7EB] border border-[#1F2937] rounded-xl hover:bg-[#1F2937] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel Changes
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !hasChanges}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-[#0F172A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#38BDF8]/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Blog
                </>
              )}
            </button>
          </div>

          {/* Warning Card */}
          <div className="bg-[#111827] border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Editing Published Content</h3>
                <p className="text-[#9CA3AF] text-sm">
                  You're editing a published blog post. Changes will be visible to all readers immediately after you update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Custom scrollbar for editor */
        [contenteditable]::-webkit-scrollbar {
          width: 8px;
        }
        [contenteditable]::-webkit-scrollbar-track {
          background: #0F172A;
        }
        [contenteditable]::-webkit-scrollbar-thumb {
          background: #1F2937;
          border-radius: 4px;
        }
        [contenteditable]::-webkit-scrollbar-thumb:hover {
          background: #38BDF8;
        }
      `}</style>
    </div>
  );
};

export default Edit;