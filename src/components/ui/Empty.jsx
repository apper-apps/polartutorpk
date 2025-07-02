import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No results found", 
  description = "Try adjusting your search criteria", 
  actionText = "Browse All Tutors",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Search" className="w-12 h-12 text-primary-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{description}</p>
      {onAction && (
        <Button onClick={onAction} className="gap-2">
          <ApperIcon name="Users" className="w-4 h-4" />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;