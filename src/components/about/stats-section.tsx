
// /src/app/about/components/stats-section.tsx

'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Clock, Users, Star, TrendingUp, GraduationCap } from 'lucide-react';

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: <GraduationCap className="h-6 w-6" />, value: 15000, label: 'Students Graduated', suffix: '+', color: 'text-blue-600' },
    { icon: <Star className="h-6 w-6" />, value: 4.9, label: 'Average Rating', suffix: '', color: 'text-yellow-600' },
    { icon: <Users className="h-6 w-6" />, value: 250, label: 'Expert Instructors', suffix: '+', color: 'text-purple-600' },
    { icon: <Clock className="h-6 w-6" />, value: 98, label: 'Completion Rate', suffix: '%', color: 'text-green-600' },
    { icon: <Award className="h-6 w-6" />, value: 5000, label: 'Certificates Issued', suffix: '+', color: 'text-orange-600' },
    { icon: <TrendingUp className="h-6 w-6" />, value: 85, label: 'Career Advancement', suffix: '%', color: 'text-red-600' },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            By The <span className="text-blue-600">Numbers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quantifiable impact and measurable success in transforming lives through education
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className={`${stat.color} flex justify-center mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {isInView ? (
                  <CountUp end={stat.value} duration={2.5} decimals={stat.value === 4.9 ? 1 : 0} />
                ) : '0'}
                {stat.suffix}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
