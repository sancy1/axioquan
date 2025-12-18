
// /src/app/about/components/team-section.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Twitter, Globe, Mail } from 'lucide-react';

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former Google Education lead with 15+ years in edtech innovation.",
      image: "/team/alex.jpg",
      social: { linkedin: "#", twitter: "#" },
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Sarah Chen",
      role: "Head of Learning",
      bio: "PhD in Educational Psychology, passionate about adaptive learning systems.",
      image: "/team/sarah.jpg",
      social: { linkedin: "#", twitter: "#" },
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Marcus Rivera",
      role: "CTO",
      bio: "Built scalable learning platforms for Fortune 500 companies.",
      image: "/team/marcus.jpg",
      social: { linkedin: "#", twitter: "#" },
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Priya Sharma",
      role: "Head of Community",
      bio: "Created thriving learning communities for over 100K students globally.",
      image: "/team/priya.jpg",
      social: { linkedin: "#", twitter: "#" },
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-blue-600">Leadership</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate innovators dedicated to transforming education through technology and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Profile Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`} />
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-4xl font-bold text-gray-300">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors group/linkedin">
                      <Linkedin className="h-5 w-5 text-gray-600 group-hover/linkedin:text-blue-600" />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors group/twitter">
                      <Twitter className="h-5 w-5 text-gray-600 group-hover/twitter:text-blue-400" />
                    </a>
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 flex items-center justify-center transition-colors group/email">
                      <Mail className="h-5 w-5 text-gray-600 group-hover/email:text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate educators, technologists, and innovators to join our team.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
              View Career Opportunities
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}