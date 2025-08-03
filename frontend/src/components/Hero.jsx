import { Award, Search, User } from 'lucide-react'
import React, { useState } from 'react'
import HeroImg from '../assets/HeroImg.png'
import CountUp from 'react-countup'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className='bg-slate-800 pt-14'>
      <div className='lg:h-[700px] max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center px-4 md:px-0'>

        {/* text section */}
        <div className='space-y-7 md:w-1/2'>
          <h1 className='text-4xl mt-10 md:mt-0 md:text-6xl font-extrabold text-gray-200'>
            Explore Our <span className='text-blue-500'>14000+</span> <br /> Online courses for all
          </h1>
          <p className='text-gray-300 text-lg'>
            Learn at your own pace from industry experts. Get certified, boost your skills, and take your career to the next level.
          </p>
          <div className='inline-flex relative w-full max-w-md'>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder='Search Your Course Here...'
              className='bg-gray-200 w-full text-gray-800 p-4 pr-40 rounded-lg rounded-r-xl placeholder:text-gray-500'
            />
            <button
              onClick={handleSearch}
              className='px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl'
            >
              Search <Search width={20} height={20} />
            </button>
          </div>
        </div>

        {/* image and badge section */}
        <div className='relative md:w-1/2 flex flex-col items-center md:items-end w-full'>
          <img
            src={HeroImg}
            alt="Learning platform hero"
            className='w-full max-w-[750px] h-auto shadow-blue-500 drop-shadow-lg'
          />

          {/* Mobile: stacked badges */}
          <div className='flex flex-col gap-4 mt-6 md:hidden'>
            {/* Certified Students */}
            <div className='bg-slate-200 flex gap-3 items-center rounded-md px-4 py-2 shadow-lg'>
              <div className='rounded-full bg-blue-400 p-2 text-white'>
                <Award />
              </div>
              <div>
                <h2 className='font-bold text-2xl'><CountUp end={684} />+</h2>
                <p className='italic text-sm text-gray-600 leading-none'>Certified Students</p>
              </div>
            </div>

            {/* Active Students */}
            <div className='bg-slate-200 flex gap-3 items-center rounded-md px-4 py-2 shadow-lg'>
              <div className='rounded-full bg-blue-400 p-2 text-white'>
                <User />
              </div>
              <div>
                <h2 className='font-bold text-2xl'><CountUp end={4500} />+</h2>
                <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
              </div>
            </div>
          </div>

          {/* Desktop: absolutely positioned badges */}
          <div className='hidden md:block'>
            {/* Certified Students - Left */}
            <div className='bg-slate-200 flex gap-3 items-center rounded-md px-4 py-2 shadow-lg absolute top-[15%] left-8'>
              <div className='rounded-full bg-blue-400 p-2 text-white'>
                <Award />
              </div>
              <div>
                <h2 className='font-bold text-2xl'><CountUp end={684} />+</h2>
                <p className='italic text-sm text-gray-600 leading-none'>Certified Students</p>
              </div>
            </div>

            {/* Active Students - Right */}
            <div className='bg-slate-200 flex gap-3 items-center rounded-md px-4 py-2 shadow-lg absolute top-[35%] right-0'>
              <div className='rounded-full bg-blue-400 p-2 text-white'>
                <User />
              </div>
              <div>
                <h2 className='font-bold text-2xl'><CountUp end={4500} />+</h2>
                <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
