
// /src/components/home/animated-stats-counter.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, BookOpen, Star, Award, Globe, TrendingUp } from 'lucide-react';

export default function AnimatedStatsCounter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: 15000,
      suffix: '+',
      label: 'Active Learners',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      value: 500,
      suffix: '+',
      label: 'Courses',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: <Star className="h-8 w-8" />,
      value: 4.9,
      suffix: '',
      label: 'Average Rating',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: 5000,
      suffix: '+',
      label: 'Certificates',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: 120,
      suffix: '+',
      label: 'Countries',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: 85,
      suffix: '%',
      label: 'Success Rate',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learning By The <span className="text-blue-600">Numbers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who transformed their careers with AxioQuan
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group hover:-translate-y-1"
            >
              <div className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {isVisible ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.value === 4.9 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}