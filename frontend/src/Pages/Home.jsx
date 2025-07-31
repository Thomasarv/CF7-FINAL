import Hero from '@/components/Hero'
import React from 'react'

const Home = () => {


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
       
      </div>
    </div>
  )
}

export default Home
