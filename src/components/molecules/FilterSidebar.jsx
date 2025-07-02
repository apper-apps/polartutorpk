import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const FilterSidebar = ({ filters, onFiltersChange, className = "" }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const educationLevels = [
    "Matric",
    "FSc/FA",
    "O Levels",
    "A Levels",
    "Bachelor's",
    "Master's",
    "PhD"
  ];

  const languages = ["English", "Urdu", "Both"];
  const ratings = [5, 4, 3, 2, 1];
  const priceRanges = [
    { label: "Under ₨1,000", min: 0, max: 1000 },
    { label: "₨1,000 - ₨2,000", min: 1000, max: 2000 },
    { label: "₨2,000 - ₨3,000", min: 2000, max: 3000 },
    { label: "₨3,000 - ₨5,000", min: 3000, max: 5000 },
    { label: "Above ₨5,000", min: 5000, max: 10000 }
  ];

  const handleFilterChange = (category, value, isChecked) => {
    const newFilters = { ...localFilters };
    
    if (!newFilters[category]) {
      newFilters[category] = [];
    }
    
    if (isChecked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(localFilters).flat().length;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-card border border-gray-100 p-6 h-fit ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
        {getActiveFiltersCount() > 0 && (
          <Badge variant="primary" size="sm">
            {getActiveFiltersCount()} active
          </Badge>
        )}
      </div>

      {/* Education Level */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="GraduationCap" className="w-4 h-4 text-primary-500" />
          Education Level
        </h4>
        <div className="space-y-2">
          {educationLevels.map((level) => (
            <label key={level} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.educationLevel?.includes(level) || false}
                onChange={(e) => handleFilterChange('educationLevel', level, e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="DollarSign" className="w-4 h-4 text-primary-500" />
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.priceRange?.includes(range.label) || false}
                onChange={(e) => handleFilterChange('priceRange', range.label, e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="Globe" className="w-4 h-4 text-primary-500" />
          Languages
        </h4>
        <div className="space-y-2">
          {languages.map((language) => (
            <label key={language} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.languages?.includes(language) || false}
                onChange={(e) => handleFilterChange('languages', language, e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="Star" className="w-4 h-4 text-primary-500" />
          Rating
        </h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.rating?.includes(rating) || false}
                onChange={(e) => handleFilterChange('rating', rating, e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700">{rating}</span>
                <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-500">& above</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        {getActiveFiltersCount() > 0 && (
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;