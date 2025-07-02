import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const queryParams = new URLSearchParams();
    
    if (searchParams.subject) queryParams.set('subject', searchParams.subject);
    if (searchParams.city) queryParams.set('city', searchParams.city);
    if (searchParams.budgetMin) queryParams.set('budgetMin', searchParams.budgetMin);
    if (searchParams.budgetMax) queryParams.set('budgetMax', searchParams.budgetMax);
    
    navigate(`/browse-tutors?${queryParams.toString()}`);
    toast.success("Searching for tutors matching your criteria!");
  };

  const stats = [
    { number: "1000+", label: "Verified Tutors" },
    { number: "5000+", label: "Happy Students" },
    { number: "50+", label: "Subjects Covered" },
    { number: "20+", label: "Cities Served" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-navy-50 py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-navy-200 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-30 blur-lg"></div>
      </div>

      <div className="container-responsive relative">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight"
          >
            Find the Best{" "}
            <span className="gradient-text">Tutor</span>{" "}
            Near You
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with Pakistan's top verified tutors for personalized learning. 
            From Matric to PhD level, find expert tutors in your city speaking your language.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Verified Tutors</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <ApperIcon name="Globe" className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Urdu & English</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <ApperIcon name="Star" className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Top Rated</span>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;