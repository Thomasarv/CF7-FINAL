import React, { useState } from 'react'
import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)

  const [menuOpen, setMenuOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/logout`, { withCredentials: true });
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='bg-gray-900 z-50 w-full py-3 fixed top-0'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4'>
        {/* logo section */}
        <Link to='/'>
          <div className='flex gap-1 items-center'>
            <GraduationCap className='text-gray-300 w-10 h-10' />
            <h1 className='text-gray-300 text-3xl font-bold'>SkillHive</h1>
          </div>
        </Link>

        {/* Hamburger icon (visible on mobile) */}
        <div className='md:hidden text-white cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </div>

        {/* menu section */}
        <nav
          className={`
            absolute md:static top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent
            transition-all duration-300 ease-in-out
            ${menuOpen ? 'flex flex-col gap-4 py-3' : 'hidden md:flex'}
          `}
        >
          <ul className='flex flex-col md:flex-row gap-7 text-xl items-center font-semibold text-white'>
            <Link to="/" onClick={() => setMenuOpen(false)}><li className='cursor-pointer text-center md:text-inherit'>Home</li></Link>
            <Link to="/courses" onClick={() => setMenuOpen(false)}><li className='cursor-pointer text-center md:text-inherit'>Courses</li></Link>

            {!user ? (
              <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                <Link to="/login" onClick={() => setMenuOpen(false)}><Button className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto">Login</Button></Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}><Button className="bg-gray-700 hover:bg-gray-800 w-full md:w-auto">Signup</Button></Link>
              </div>
            ) : (
              <div className='flex flex-col md:flex-row items-center gap-7'>
                {user.role === "instructor" && <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}><li className='cursor-pointer text-center md:text-inherit'>Admin</li></Link>}
                {user.role === 'student' && <Link to="/my-courses" onClick={() => setMenuOpen(false)}><li className="cursor-pointer text-center md:text-inherit">My Courses</li></Link>}

                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <Avatar>
                    <AvatarImage src={user.photoUrl} alt="user photo" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </Link>

                <Button
                  onClick={() => {
                    logoutHandler()
                    setMenuOpen(false)
                  }}
                  className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
                >
                  Logout
                </Button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
