import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import Navbar from "../components/navbar";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [token, setToken] = useState(null);

   useEffect(() => {
    const t= localStorage.getItem("accessToken")
    setToken(t)

  }, [])
   

  const submitPost = async () => {
    setIsSubmitting(true);
    const blogData = {
      title,
      content,
      category,
    };

    try {
      const API_BASE ="https://day-tech-blogging-site.onrender.com";
      const response = await fetch(`${API_BASE}/api/blogs/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });
      if (response.status === 201) {
        toast.success("🎉 Blog published successfully!");
        // Optionally clear the form
        setTitle("");
        setContent("");
        setCategory("Tech");
        setShowSuccess(true);
        setIsSubmitting(false);
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
    setIsSubmitting(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost();
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

  const categories = [
    "Technology", 
    "Development", 
    "Design", 
    "Business", 
    "Lifestyle",
    "Health",
    "Science",
    "Other"
  ];


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
              <p className="text-[#9CA3AF] text-sm">Blog published successfully</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-[#38BDF8]/30">
              <svg className="w-6 h-6 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent">
                Create New Blog
              </h1>
              <p className="text-[#9CA3AF] mt-1">Share your thoughts with the world</p>
            </div>
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
                  placeholder="Enter an engaging title for your blog..."
                  className="w-full px-4 py-3 bg-[#0F172A] text-[#E5E7EB] placeholder-[#9CA3AF] border border-[#1F2937] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-[#E5E7EB] font-semibold mb-3">
                  Category
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-[#0F172A] text-[#E5E7EB] border border-[#1F2937] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-all appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                      {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Content Editor */}
              <div className="p-4 min-h-[400px] text-[#E5E7EB] focus:outline-none overflow-y-auto"
        style={{ maxHeight: "500px" }}>
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
            className="h-[500px] text-lg"
            style={{ maxHeight: "500px" }}
          />
                <p className="text-[#9CA3AF] text-sm mt-2">
                  Use the toolbar above to format your content
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => console.log('Save draft')}
              className="px-6 py-3 bg-[#111827] text-[#E5E7EB] border border-[#1F2937] rounded-xl hover:bg-[#1F2937] transition-all font-medium"
            >
              Save Draft
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-[#0F172A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#38BDF8]/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish Blog
                </>
              )}
            </button>
          </div>

          {/* Tips Card */}
          <div className="bg-[#111827] border border-[#38BDF8]/20 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#E5E7EB] font-semibold mb-2">Writing Tips</h3>
                <ul className="text-[#9CA3AF] text-sm space-y-1">
                  <li>• Write a clear, attention-grabbing title</li>
                  <li>• Break your content into digestible sections</li>
                  <li>• Use formatting to highlight key points</li>
                  <li>• Proofread before publishing</li>
                </ul>
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

export default CreateBlog;