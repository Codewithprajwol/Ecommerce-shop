import React, { useContext, useState } from 'react'
import shoppingIllustration from "../assets/shoppingIllustration.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { userContext } from '../context/user.context'
const Login = () => {
  const {setUser}=useContext(userContext);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate()
  const submitHandler=(e)=>{
    e.preventDefault();

    axios.post('users/login',{email,password}).then((res)=>{
      console.log(res.data);
      navigate('/')
      setUser(res.data)

      localStorage.setItem('token',res.data.token)
        setUser(res.data.user)
      
    })
  }
  return (
    <>
<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full">
                <div className="flex">
                    <div className="hidden md:block w-1/2 relative bg-gradient-to-br from-rose-100 to-pink-100">
                        <img
                            src={shoppingIllustration} 
                            alt="Online Shopping Illustration"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[80%]"
                        />
                    </div>

                    <div className="px-6 py-8 flex-1 md:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
                            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <input onChange={(e)=>setEmail(e.target.value)}
                                    type="text"
                                    placeholder="email"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-400 transition-colors"
                                />
                            </div>
                            <div className="mb-4">
                                <input onChange={(e)=>setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-400 transition-colors"
                                />
                            </div>
                            <div className="text-right mb-4">
                                <a href="#" className="text-pink-500 hover:text-pink-700 text-sm transition-colors">Forgot Password?</a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white font-medium py-2 rounded-md transition-colors bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-6 text-center text-gray-600">
                            <p className='text-sm'>
                                Don't have an account?
                                <Link to='/register' className="text-pink-500 font-medium  hover:underline ml-1 transition-colors">
                                    Create your Account, it takes less than a minute.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  </>
  )
}

export default Login