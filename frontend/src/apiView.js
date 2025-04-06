import axios from "axios";

const API_BASE = "https://day-tech-blogging-site.onrender.com";

export const fetchBlogs2 = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/api/blogs/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blogs with id ${id}`, error);
    return [];
  }
};
