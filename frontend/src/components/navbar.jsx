import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);
  }, []);

  const Check_user = async(id) => {
    const API_BASE ="https://day-tech-blogging-site.onrender.com";
    console.log("Checking authorization for blog ID:", id);
    console.log(API_BASE);
    try {
      const response = await axios.get(`${API_BASE}/api/validate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Authorization response:", response.data);
      return response.data.authorized;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return false;
    }
  };

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    navigate("/login");
    setMenuOpen(false);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

    const handleMyBlogsClick = () => {
    if (!token) {
      toast("Login required");
    } else {
      handleNavigate('/myBlogs');
    }
  };

  const handleNavigate = (path) => {
    navigate(`${path}`);
    setMenuOpen(false);
  };

   const handleEditClick = async (e) => {
    e.preventDefault();
    if (!token) {
      toast("Login required to Edit a blog!");
      return;
    }
    const res = await Check_user(id);
    if (!res) {
      toast.error("You are not authorised to edit blog!!");
    } else {
      handleNavigate(`/edit/${id}`);
    }
  };

    return (
    <nav className="bg-[#111827]/95 backdrop-blur-md border-b border-[#1F2937] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigate("/blog")}
          >
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent"            >
              DayTech
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {!id ? (
              <button 
                className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                onClick={() => handleNavigate('/create')}
              >
                Create Blog
              </button>
            ) : (
              <button 
                className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                onClick={handleEditClick}
              >
                Edit Blog
              </button>
            )}

            <button 
              className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors px-3 py-2 rounded-lg hover:bg-[#1F2937]"
              onClick={handleMyBlogsClick}
            >
              My Blogs
            </button>

            {token ? (
              <button 
                className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all font-medium"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <button 
                className="px-4 py-2 bg-[#38BDF8] text-[#0F172A] font-medium rounded-lg hover:bg-[#0EA5E9] transition-all shadow-lg shadow-[#38BDF8]/20"
                onClick={() => handleNavigate('/signup')}
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-all"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-[#0F172A]/50 backdrop-blur-sm border-t border-[#1F2937]">
          {!id ? (
            <button 
              className="w-full text-left text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] px-3 py-3 rounded-lg transition-all flex items-center gap-3"
              onClick={() => handleNavigate('/create')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Blog
            </button>
          ) : (
            <button 
              className="w-full text-left text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] px-3 py-3 rounded-lg transition-all flex items-center gap-3"
              onClick={handleEditClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Blog
            </button>
          )}

          <button 
            className="w-full text-left text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] px-3 py-3 rounded-lg transition-all flex items-center gap-3"
            onClick={handleMyBlogsClick}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            My Blogs
          </button>

          <div className="pt-2">
            {token ? (
              <button 
                className="w-full text-left px-3 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all font-medium flex items-center gap-3"
                onClick={handleLogout}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </button>
            ) : (
              <button 
                className="w-full text-left px-3 py-3 bg-[#38BDF8] text-[#0F172A] font-medium rounded-lg hover:bg-[#0EA5E9] transition-all shadow-lg shadow-[#38BDF8]/20 flex items-center gap-3"
                onClick={() => handleNavigate('/signup')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;