import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; // ← Import Link
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [username, setName] = useState('');

  const navigate = useNavigate();

  const signupPost=async()=>{

   const userDetail={
     username,
     password,
     email
   }

    try {
        const response = await fetch("http://localhost:8000/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetail),
        });
        if (response.status === 400) {
          const data = await response.json()
          const error=data.error
          toast.error(`${error}`);
        } 
        else {
          toast.success("Registered successfully")
           navigate("/login")
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("❌ Network error. Try again later.");
      }
  }

  const handleSubmit = (e) => { 
    e.preventDefault()
     if(password!==cpassword){
        toast.error("Password not matched")
        return
     }
    signupPost()
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100 min-h-screen bg-gradient-to-br from-blue-100 to-white'>

      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80 space-y-4'>

      <div>
          <label htmlFor="username" className='block mb-1 font-medium'>Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your Name'
            className='w-full border border-gray-300 p-2 rounded'
            required
          />
        </div>

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

        <div>
          <label htmlFor="cpassword" className='block mb-1 font-medium'>Confirm Password:</label>
          <input
            type="password"
            id="cpassword"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            placeholder='Confirm your password'
            className='w-full border border-gray-300 p-2 rounded'
            required
          />
        </div>

        <div className="text-sm text-center">
          <span>Already have a account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
           Login
          </Link>
        </div>

        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
