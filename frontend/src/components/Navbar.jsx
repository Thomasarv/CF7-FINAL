import React from 'react'
import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
 

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

        

        {/* menu section */}
        <nav
          className={`
            absolute md:static top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent
            transition-all duration-300 ease-in-out`}>
          <ul className='flex flex-col md:flex-row gap-7 text-xl items-center font-semibold text-white'>
            <Link to="/" ><li className='cursor-pointer text-center md:text-inherit'>Home</li></Link>
            <Link to="/courses" ><li className='cursor-pointer text-center md:text-inherit'>Courses</li></Link>

           
              <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                <Link to="/login" ><Button className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto">Login</Button></Link>
                <Link to="/signup" ><Button className="bg-gray-700 hover:bg-gray-800 w-full md:w-auto">Signup</Button></Link>
              </div>
           </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
