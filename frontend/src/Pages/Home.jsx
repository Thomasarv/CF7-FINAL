import Hero from '@/components/Hero'
import React, { useEffect } from 'react'
import CourseCard from '@/components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from '@/redux/courseSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { course, error, status } = useSelector((store) => store.course)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  // Defensive fallback in case course is null or undefined
  const coursesToShow = Array.isArray(course) ? course : []

  if (status === 'loading') {
    return <p className="text-center">Loading courses...</p>
  }

  if (status === 'failed') {
    return <p className="text-center text-red-500">Error: {error}</p>
  }

  return (
    <div>
      <Hero />
      <div className="py-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-4">
          Our Courses
        </h1>
        <p className="text-center text-gray-600 mb-12 px-4 sm:px-0">
          Explore our curated courses to boost your skills and career. Whether
          you're a beginner or an expert, we have something for everyone.
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesToShow.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No courses available at the moment.
            </p>
          ) : (
            
            coursesToShow.map((courseItem) => (
            <CourseCard key={courseItem._id} course={courseItem} />
          ))
          
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
