
// /src/app/about/components/mission-vision.tsx

'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Brain, Zap } from 'lucide-react';

export default function MissionVision() {
  const items = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Our Mission",
      description: "To democratize quality education by making it accessible, engaging, and effective for everyone, everywhere.",
      color: "from-blue-50 to-blue-100/50",
      border: "border-blue-200",
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-600" />,
      title: "Our Vision",
      description: "A world where anyone can learn anything, anytime, with personalized guidance and community support.",
      color: "from-purple-50 to-purple-100/50",
      border: "border-purple-200",
    },
    {
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: "Our Approach",
      description: "Blending cutting-edge technology with pedagogical excellence to create transformative learning experiences.",
      color: "from-green-50 to-green-100/50",
      border: "border-green-200",
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Our Promise",
      description: "Delivering measurable skill development and career advancement through practical, project-based learning.",
      color: "from-orange-50 to-orange-100/50",
      border: "border-orange-200",
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
            What Drives <span className="text-blue-600">AxioQuan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're more than just an e-learning platform. We're a movement dedicated to transforming
            how the world learns and grows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}