import { motion } from "framer-motion";

const Card = ({ 
  children, 
  className = "", 
  hover = false,
  onClick,
  ...props 
}) => {
  const baseClasses = "bg-white rounded-2xl shadow-card border border-gray-100";
  const hoverClasses = hover ? "hover:shadow-card-hover hover:-translate-y-1 cursor-pointer" : "";

  if (onClick || hover) {
    return (
      <motion.div
        whileHover={hover ? { y: -4, boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)" } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        className={`${baseClasses} ${hoverClasses} transition-all duration-300 ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;