import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin } from 'react-icons/fa'

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'Founder & CEO',
    bio: 'Passionate about making education accessible to everyone.',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    linkedin: 'https://linkedin.com/in/alicejohnson'
  },
  {
    name: 'Mark Davis',
    role: 'Lead Developer',
    bio: 'Building seamless experiences with code and coffee.',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    linkedin: 'https://linkedin.com/in/markdavis'
  },
  {
    name: 'Sophia Lee',
    role: 'Content Strategist',
    bio: 'Crafting engaging learning paths and courses.',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    linkedin: 'https://linkedin.com/in/sophialee'
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
    },
  }),
}

const TeamSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Meet the Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            }}
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 sm:w-24 sm:h-24 rounded-full object-cover mb-4"
              loading="lazy"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-indigo-600 mb-2">{member.role}</p>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{member.bio}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
              aria-label={`LinkedIn profile of ${member.name}`}
            >
              <FaLinkedin size={22} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TeamSection
