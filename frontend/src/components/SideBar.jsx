import { ChartColumnBig, FolderPlus, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden fixed top-16 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-700 w-64 p-6 pt-20
          transform transition-transform duration-300 ease-in-out
          md:hidden z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-2xl text-gray-300 ${
                isActive ? 'bg-gray-950' : 'bg-transparent'
              } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <ChartColumnBig />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/course"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-2xl text-gray-300 ${
                isActive ? 'bg-gray-950' : 'bg-transparent'
              } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <FolderPlus />
            <span>Course</span>
          </NavLink>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="bg-gray-700 w-80 h-screen hidden md:block sticky top-0">
        <div className="text-center pt-10 px-3 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `text-2xl text-gray-300 ${
                isActive ? 'bg-gray-950' : 'bg-transparent'
              } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <ChartColumnBig />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/course"
            className={({ isActive }) =>
              `text-2xl text-gray-300 ${
                isActive ? 'bg-gray-950' : 'bg-transparent'
              } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <FolderPlus />
            <span>Course</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default SideBar
