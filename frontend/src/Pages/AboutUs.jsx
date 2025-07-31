import React from 'react'
import TeamSection from '@/components/TeamSections'
import Lottie from 'lottie-react'

import learningAnimation1 from '../assets/lottie/OnlineLearning.json'
import learningAnimation2 from '../assets/lottie/404PageAnimation.json'
import learningAnimation3 from '../assets/lottie/LearningData.json'

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-[6.5rem] sm:pt-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        About SkillHive
      </h1>

      {/* Our Story */}
      <section className="mb-8 px-2 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-700 sm:sticky sm:top-20 bg-white z-10">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At SkillHive, we believe that learning should be accessible, engaging, and empowering for everyone.
            Our journey started with a simple idea: to create a platform where instructors and learners come together
            to share knowledge, grow skills, and build a vibrant learning community.
          </p>
        </div>
      </section>

      {/* Animation 1 */}
      <section className="mb-12 flex justify-center">
        <Lottie
          animationData={learningAnimation1}
          loop
          className="max-w-xs sm:max-w-md w-full h-auto"
        />
      </section>

      {/* Our Mission */}
      <section className="mb-8 px-2 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-700 sm:sticky sm:top-20 bg-white z-10">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We strive to provide the best online learning experience by connecting passionate instructors with eager students.
            Whether you want to master a new skill or share your expertise, SkillHive is your hive of opportunity.
          </p>
        </div>
      </section>

      {/* Animation 2 */}
      <section className="mb-12 flex justify-center">
        <Lottie
          animationData={learningAnimation2}
          loop
          className="max-w-xs sm:max-w-md w-full h-auto"
        />
      </section>

      {/* Join Us */}
      <section className="mb-8 px-2 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-700 sm:sticky sm:top-20 bg-white z-10">
            Join Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you’re here to learn or teach, SkillHive welcomes you. Explore our courses, connect with instructors,
            and be a part of a growing community that values knowledge and growth.
          </p>
        </div>
      </section>

      {/* Animation 3 */}
      <section className="mb-12 flex justify-center">
        <Lottie
          animationData={learningAnimation3}
          loop
          className="max-w-xs sm:max-w-md w-full h-auto"
        />
      </section>

      {/* Meet the Team */}
      <section className="mb-12 px-2 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-700 sm:sticky sm:top-20 bg-white z-10">
            Meet the Team
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We are a group of educators, developers, and lifelong learners dedicated to making education better for everyone.
            Together, we work hard to ensure SkillHive stays innovative, user-friendly, and supportive.
          </p>
          <TeamSection />
        </div>
      </section>
    </div>
  )
}

export default AboutUs
