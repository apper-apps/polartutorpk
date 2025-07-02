import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const SubjectCard = ({ subject, icon, tutorCount, onClick }) => {
  const iconMap = {
    Mathematics: "Calculator",
    Physics: "Atom",
    Chemistry: "Flask",
    Biology: "Leaf",
    English: "BookOpen",
    Urdu: "BookText",
    "Computer Science": "Monitor",
    Economics: "TrendingUp",
    Accounting: "PieChart"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card hover onClick={onClick} className="p-6 text-center cursor-pointer">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
          <ApperIcon 
            name={iconMap[subject] || "BookOpen"} 
            className="w-8 h-8 text-white" 
          />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{subject}</h3>
        <p className="text-sm text-gray-600">{tutorCount} tutors available</p>
      </Card>
    </motion.div>
  );
};

export default SubjectCard;