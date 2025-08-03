import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import CourseCard from '@/components/CourseCard'
import { setEnrolledCourses } from '@/redux/courseSlice'

const MyCourses = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { enrolledCourses = [] } = useSelector(state => state.course)

  useEffect(() => {
    if (!user?._id) return

    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/user/${user._id}/enrolled`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setEnrolledCourses(res.data.courses))
        }
      } catch (error) {
        toast.error('Failed to load enrolled courses')
      }
    }

    fetchEnrolledCourses()
  }, [user, dispatch])

  return (
    <div className='bg-gray-100 pt-20 min-h-screen'>
      <div className='max-w-7xl mx-auto py-10 px-2 sm:px-4'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          My Enrolled Courses
        </h1>

        {enrolledCourses.length === 0 ? (
          <p className='text-center text-gray-600'>You haven’t enrolled in any courses yet.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {enrolledCourses.map((courseItem) => (
              <CourseCard key={courseItem._id} course={courseItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses
