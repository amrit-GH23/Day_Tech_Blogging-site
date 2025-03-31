import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import Navbar from "../components/navbar";
import { fetchBlogs2 } from "../apiView";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  

  const { id } = useParams();
  const [token, setToken] = useState(null);

  useEffect(()=>{
    const t= localStorage.getItem("accessToken")
    setToken(t)

  },[])

   useEffect(() => {

    const getBlog=async()=>{
       const data = await fetchBlogs2(id)
       setBlog(data)
       setTitle(data.title)
       setContent(data.content)
    }
 
    getBlog()

  }, [])
   

  const submitPost = async () => {
    const blogData = {
      title,
      content
        };

    try {
      const API_BASE = import.meta.env.VITE_API_URL;
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
        // Optionally clear the form
        setTitle("");
        setContent("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
    <Navbar/>
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📝 Edit the Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="h-[500px]">
          <ReactQuill
            theme="snow"
            placeholder="Start writing your blog post..."
            modules={modules}
            value={content}
            onChange={(value) => setContent(value)}
            className="h-full text-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8  bg-blue-600 text-white text-lg font-semibold p-4 rounded-lg hover:bg-blue-700 transition"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
    </div>
  );
};

export default Edit;
