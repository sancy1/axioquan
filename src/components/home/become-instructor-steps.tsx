
// /src/components/home/become-instructor-steps.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  LogIn, 
  FileText, 
  CheckCircle, 
  LogOut, 
  Users, 
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
  Shield,
  Rocket,
  GraduationCap,
  Mail,
  Linkedin,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    icon: <UserPlus className="h-8 w-8" />,
    title: "Create Your Account",
    description: "Sign up for a free student account to start your journey",
    details: "Fill out your basic information and verify your email address to create your student account.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    action: "Sign Up Now",
    link: "/signup"
  },
  {
    id: 2,
    icon: <LogIn className="h-8 w-8" />,
    title: "Complete Your Profile",
    description: "Log in and build your comprehensive learner profile",
    details: "Add your profile picture, bio, and connect your learning goals to establish your presence.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    action: "Complete Profile",
    link: "/login"
  },
  {
    id: 3,
    icon: <FileText className="h-8 w-8" />,
    title: "Request Instructor Role",
    description: "Submit your teaching credentials for review",
    details: "Share your expertise background, teaching experience, and social media links for our admin team to evaluate your qualifications.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    action: "Apply Now",
    link: "/instructor-apply",
    highlight: true
  },
  {
    id: 4,
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Admin Review & Approval",
    description: "Our team carefully evaluates your application",
    details: "We review your experience, expertise, and passion for teaching. Typically takes 1-3 business days.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    borderColor: "border-yellow-200",
    action: "Learn More",
    link: "/instructor-guidelines"
  },
  {
    id: 5,
    icon: <LogOut className="h-8 w-8" />,
    title: "Account Upgrade",
    description: "Refresh your account to access new features",
    details: "Once approved, simply sign out and sign back in to see your upgraded instructor dashboard.",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    borderColor: "border-red-200",
    action: "View Dashboard",
    link: "/dashboard"
  },
  {
    id: 6,
    icon: <BookOpen className="h-8 w-8" />,
    title: "Start Creating Courses",
    description: "Build your first course with our powerful tools",
    details: "Use our intuitive course builder to create engaging lessons, add curriculum, and design quizzes for students.",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50",
    borderColor: "border-indigo-200",
    action: "Start Creating",
    link: "/instructor/courses/create"
  },
  {
    id: 7,
    icon: <Users className="h-8 w-8" />,
    title: "Teach & Inspire",
    description: "Share knowledge and impact thousands of learners",
    details: "Engage with students, earn revenue, and build your reputation as an expert instructor in our community.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
    borderColor: "border-teal-200",
    action: "Join Community",
    link: "/instructor-community"
  }
];

const applicationRequirements = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    text: "Professional experience in your field"
  },
  {
    icon: <Mail className="h-5 w-5" />,
    text: "Clear communication skills"
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    text: "LinkedIn profile showing expertise"
  },
  {
    icon: <Globe className="h-5 w-5" />,
    text: "Portfolio or social proof of work"
  },
  {
    icon: <Award className="h-5 w-5" />,
    text: "Passion for teaching and mentoring"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    text: "Commitment to quality education"
  }
];

export default function BecomeInstructorSteps() {
  const [activeStep, setActiveStep] = useState(3);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-4">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Transform Your Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Become an <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Instructor</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Share your knowledge, inspire learners worldwide, and build a rewarding teaching career.
            Follow these simple steps to start your journey as an AxioQuan instructor.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500"></div>
            
            {/* Steps List */}
            <div className="space-y-8 relative z-10">
              {steps.map((step, index) => {
                const isActive = activeStep === step.id;
                const isHovered = hoveredStep === step.id;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {/* Step Connector */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    
                    {/* Step Card */}
                    <div className={`relative flex gap-6 p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'transform scale-[1.02] shadow-2xl border-2' 
                        : 'shadow-lg hover:shadow-xl hover:-translate-y-1 border'
                    } ${step.bgColor} border-${step.borderColor.split('-')[1]}-200`}>
                      
                      {/* Step Number Badge */}
                      <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                        isActive 
                          ? `bg-gradient-to-br ${step.color} text-white shadow-lg` 
                          : 'bg-white border border-gray-200'
                      }`}>
                        {step.highlight && (
                          <div className="absolute -top-2 -right-2">
                            <Sparkles className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          </div>
                        )}
                        {step.icon}
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl font-bold ${
                            isActive ? 'text-gray-900' : 'text-gray-800'
                          }`}>
                            {step.title}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            Step {step.id}
                          </div>
                        </div>
                        
                        <p className={`mb-3 ${
                          isActive ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                          {step.description}
                        </p>
                        
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-gray-600 mb-4">{step.details}</p>
                              <Link href={step.link}>
                                <Button className={`rounded-full px-6 ${
                                  step.highlight 
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                                    : ''
                                }`}>
                                  {step.action}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Application Details & Requirements */}
          <div className="space-y-8">
            {/* Application Requirements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold">What We Look For</h3>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                We're looking for passionate experts who can create engaging, high-quality learning experiences.
                Here's what you'll need for a successful application:
              </p>
              
              <div className="space-y-4 mb-8">
                {applicationRequirements.map((req, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      {req.icon}
                    </div>
                    <span className="text-gray-200">{req.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-sm text-gray-300">
                  💡 <span className="font-semibold">Tip:</span> Include specific examples of your work, 
                  teaching experience, or contributions to your field in your application.
                </p>
              </div>
            </motion.div>

            {/* Benefits Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="h-8 w-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Instructor Benefits</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Revenue Share", value: "Up to 70%" },
                  { label: "Global Reach", value: "120+ Countries" },
                  { label: "Support Team", value: "24/7 Available" },
                  { label: "Analytics", value: "Real-time Data" },
                ].map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{benefit.value}</div>
                    <div className="text-sm text-gray-600">{benefit.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Ready to inspire learners?</p>
                  <p className="text-sm text-gray-600">Start your application today</p>
                </div>
                <Link href="/instructor-apply">
                  <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    Apply Now
                    <Rocket className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            
          </div>
        </div>
      </div>
    </section>
  );
}











