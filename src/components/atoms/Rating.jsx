import ApperIcon from "@/components/ApperIcon";

const Rating = ({ 
  rating = 0, 
  maxRating = 5, 
  size = "md",
  showNumber = true,
  className = "" 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => (
          <ApperIcon
            key={index}
            name="Star"
            className={`${sizes[size]} ${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : index < rating
                ? "text-yellow-400 fill-current opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`font-medium text-gray-700 ml-1 ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;