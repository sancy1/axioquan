
// /src/app/about/components/features-showcase.tsx

'use client';

import { motion } from 'framer-motion';
import { Play, Users, Brain, Shield, Zap, Globe } from 'lucide-react';

export default function FeaturesShowcase() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Learning",
      description: "Adaptive learning paths that adjust to your pace and understanding.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      delay: 0.1,
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Live Mentorship",
      description: "Real-time guidance from industry experts and dedicated mentors.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      delay: 0.2,
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Interactive Content",
      description: "Engaging video lessons, quizzes, and hands-on projects.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      delay: 0.3,
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Industry Certifications",
      description: "Recognized credentials that boost your career prospects.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      delay: 0.4,
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Career Support",
      description: "Resume reviews, interview prep, and job placement assistance.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      delay: 0.5,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Community",
      description: "Connect with learners and professionals worldwide.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      delay: 0.6,
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose <span className="text-blue-600">AxioQuan?</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We combine cutting-edge technology with proven educational methodologies to deliver
              exceptional learning outcomes that translate to real-world success.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform is designed to adapt to your learning style, provide immediate feedback,
              and connect you with a global community of learners and experts.
            </p>
            <div className="pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                Start Learning Free
              </button>
            </div>
          </motion.div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className={`${feature.bgColor} rounded-xl p-6 border border-transparent hover:border-gray-200 transition-all hover:shadow-lg`}
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}