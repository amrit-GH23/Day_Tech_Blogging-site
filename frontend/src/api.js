import axios from "axios";

const API_BASE = "https://day-tech-blogging-site.onrender.com";

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
