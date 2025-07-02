import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Rating from "@/components/atoms/Rating";
import Avatar from "@/components/atoms/Avatar";

const TutorCard = ({ tutor, onViewProfile, onBookNow }) => {
  return (
    <Card hover className="p-6 h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar
            src={tutor.profilePhoto}
            alt={tutor.name}
            size="lg"
            fallback={tutor.name?.charAt(0)}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {tutor.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <ApperIcon name="MapPin" className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{tutor.city}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Rating rating={tutor.rating} size="sm" />
              <span className="text-sm text-gray-500">({tutor.reviewCount} reviews)</span>
            </div>
          </div>
          {tutor.verified && (
            <Badge variant="success" className="flex items-center gap-1">
              <ApperIcon name="CheckCircle" className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects</h4>
          <div className="flex flex-wrap gap-2">
            {tutor.subjects?.slice(0, 3).map((subject, index) => (
              <Badge key={index} variant="primary" size="sm">
                {subject}
              </Badge>
            ))}
            {tutor.subjects?.length > 3 && (
              <Badge variant="default" size="sm">
                +{tutor.subjects.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Experience & Rate */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-surface rounded-xl p-3">
            <div className="flex items-center gap-2">
              <ApperIcon name="Clock" className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-gray-600">Experience</span>
            </div>
            <p className="font-semibold text-gray-900 mt-1">
              {tutor.experience} years
            </p>
          </div>
          <div className="bg-surface rounded-xl p-3">
            <div className="flex items-center gap-2">
              <ApperIcon name="DollarSign" className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-gray-600">Rate</span>
            </div>
            <p className="font-semibold text-gray-900 mt-1">
              ₨{tutor.hourlyRate}/hr
            </p>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <ApperIcon name="Globe" className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {tutor.languages?.join(", ")}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => onViewProfile(tutor.Id)}
            className="w-full"
          >
            View Profile
          </Button>
          <Button
            variant="primary"
            onClick={() => onBookNow(tutor.Id)}
            className="w-full"
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TutorCard;