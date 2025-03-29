import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
