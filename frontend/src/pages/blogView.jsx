import React from "react";
import Navbar from "../components/navbar";
import { fetchBlogs2 } from "../apiView";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrollProgress from "../components/scrollProgress";
import CommentBar from "../components/commentBar";

const blogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [Tcomment, setTcomment] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const data = await fetchBlogs2(id);
      setBlog(data);
    };
    getBlog();
  }, [id]);

  const API_BASE = "https://day-tech-blogging-site.onrender.com";
  useEffect(() => {
    const getComment = async (id) => {
      try {
        const response = await fetch(`${API_BASE}/api/getcomment/${id}/`);
        console.log(response);
      const data = await response.json();
        setTcomment(data);
        console.log(Tcomment);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getComment(id);
  }, [id]);

  const [progress, setProgress] = useState(0);

  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    setProgress(scrolled);
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <p>Loading blog.....</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar />
      <ScrollProgress progressPercentage={progress} />
      <div
        onScroll={handleScroll}
        className="mt-3.5 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg   overflow-y-scroll h-full border border-gray-300"
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
      <div className="mt-3.5 p-4 max-w-3xl mx-auto">
        <h1>Comments</h1>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="write comment"
            className="w-[70%] border border-gray-300 p-2 rounded-xl"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
          />
          <button className=" bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition p-2">
            comment
          </button>
        </div>
        <div>
          {Tcomment.length > 0 ? (
            Tcomment.map((comm) => <CommentBar key={comm.id} comm={comm} />)
          ) : (
            <p>Be the first one to comment</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default blogView;
