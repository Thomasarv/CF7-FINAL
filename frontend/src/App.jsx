import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Login from './Pages/auth/Login'
import Signup from './Pages/auth/Signup'
import Profile from './Pages/Profile'
import MyCourses from './Pages/MyCourses'  
import CourseDetails from './Pages/CourseDetails'
import Admin from './Pages/admin/Admin'
import Dashboard from './Pages/admin/Dashboard'
import Course from './Pages/admin/Course'
import CreateCourse from './Pages/admin/CreateCourse'
import UpdateCourse from './Pages/admin/UpdateCourse'
import CreateLecture from './Pages/admin/CreateLecture'
import EditLecture from './Pages/admin/EditLecture'
import AboutUs from './Pages/AboutUs'


const router = createBrowserRouter([
  {
    element: <Layout />,  
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/courses",
        element: <Courses />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/my-courses",
        element: <MyCourses />
      },
      {
        path: "/courses/:courseId",
        element: <CourseDetails />
      },
      {
        path: "/about-us",
        element: <AboutUs/>
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "course", element: <Course /> },
          { path: "course/create", element: <CreateCourse /> },
          { path: "course/:courseId", element: <UpdateCourse /> },
          { path: "course/:courseId/lecture", element: <CreateLecture /> },
          { path: "course/:courseId/lecture/:lectureId", element: <EditLecture /> },
          

        ]
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App






