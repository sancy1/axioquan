
// /src/app/about/components/values-section.tsx

'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Users, Zap, Globe, Target } from 'lucide-react';

export default function ValuesSection() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Learner First",
      description: "Every decision we make centers around enhancing the student experience and outcomes.",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality First",
      description: "We maintain the highest standards in course content, instruction, and platform performance.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Learning thrives in collaboration. We build spaces where students support each other's growth.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation Focused",
      description: "Continuously evolving our platform with cutting-edge technology and teaching methods.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Access",
      description: "Breaking geographical barriers to make quality education available to all.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Results Oriented",
      description: "Focusing on tangible outcomes that translate to real-world success.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core <span className="text-blue-600">Values</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The principles that guide every aspect of our platform and community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`${value.bgColor} rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl border border-transparent group-hover:border-gray-200`}>
                <div className={`${value.color} mb-6`}>
                  <div className="inline-flex p-3 rounded-xl bg-white shadow-lg">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}