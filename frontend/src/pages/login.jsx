import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'; // ← Import Link

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate= useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault();
    
      try {
        const response = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,   // send email as username
            password: password
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          const { access, refresh } = data;
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          toast.success("Login successful!!");
          navigate("/blog");
        } else {
          toast.error(data.detail || "Invalid credentials");
        }
    
      } catch (error) {
        toast.error("⚠️ Some error occurred. Try again.");
        console.error(error);
      }
    };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100 min-h-screen bg-gradient-to-br from-blue-100 to-white'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80 space-y-4'>
        <div>
          <label htmlFor="email" className='block mb-1 font-medium'>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full border border-gray-300 p-2 rounded'
            required
          />
        </div>
        <div>
          <label htmlFor="password" className='block mb-1 font-medium'>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='w-full border border-gray-300 p-2 rounded'
            required
          />
        </div>

        <div className="text-sm text-center">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>

        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
