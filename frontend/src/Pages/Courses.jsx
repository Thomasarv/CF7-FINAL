import CourseCard from '@/components/CourseCard'
import { setCourses } from '../redux/courseSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Courses = () => {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch()
  const { course } = useSelector((store) => store.course)
  const location = useLocation()
  const navigate = useNavigate()

  // Get the search query param (case insensitive)
  const params = new URLSearchParams(location.search)
  const search = params.get('search') || ''

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/course/published-courses`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setCourses(res.data.courses))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllPublishedCourse()
  }, [dispatch])  // run once on mount

  // Ensure 'course' is always an array before filtering
  const filteredCourses = (Array.isArray(course) ? course : []).filter(c =>
    c.courseTitle && c.courseTitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='bg-gray-100 pt-14'>
      <div className='min-h-screen max-w-7xl mx-auto py-10 px-4 sm:px-6'>
        <div className='px-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
          <p className='text-center text-gray-600 mb-12'>
            Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone.
          </p>

          {filteredCourses.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          ) : (
            <div className='text-center mt-10'>
              <p className='text-red-500 font-semibold mb-4'>
                No courses found for &quot;{search}&quot;
              </p>
              <Button
                onClick={() => navigate('/')}
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded'
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses
