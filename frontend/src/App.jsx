import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './pages/blogs';
import BlogView from './pages/blogView';
import CreateBlog from './pages/createBlog';
import Login from './pages/login';
import Signup from './pages/signup';

import { Navigate } from "react-router-dom";
import Started from './pages/started';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  return token ? children : <Navigate to="/login" />;
};


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Started />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/view/:id' element={<BlogView />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
