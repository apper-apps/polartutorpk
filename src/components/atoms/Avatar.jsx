import ApperIcon from "@/components/ApperIcon";

const Avatar = ({ 
  src, 
  alt, 
  size = "md", 
  className = "",
  fallback 
}) => {
  const sizes = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
    "2xl": "w-24 h-24"
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl"
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-md ${className}`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shadow-md ${className}`}>
      {fallback ? (
        <span className={textSizes[size]}>{fallback}</span>
      ) : (
        <ApperIcon name="User" className={`${sizes[size].replace('w-', 'w-').replace('h-', 'h-').replace(/\d+/, (match) => Math.floor(parseInt(match) * 0.6))}`} />
      )}
    </div>
  );
};

export default Avatar;