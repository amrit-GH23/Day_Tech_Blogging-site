import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchBlogs2 = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/api/blogs/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blogs with id ${id}`, error);
    return [];
  }
};
