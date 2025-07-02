import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";

const SearchBar = ({ onSearch, className = "" }) => {
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudgetRange] = useState([500, 5000]);

  const subjects = [
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "english", label: "English" },
    { value: "urdu", label: "Urdu" },
    { value: "computer-science", label: "Computer Science" },
    { value: "accounting", label: "Accounting" },
    { value: "economics", label: "Economics" }
  ];

  const cities = [
    { value: "karachi", label: "Karachi" },
    { value: "lahore", label: "Lahore" },
    { value: "islamabad", label: "Islamabad" },
    { value: "rawalpindi", label: "Rawalpindi" },
    { value: "faisalabad", label: "Faisalabad" },
    { value: "multan", label: "Multan" },
    { value: "peshawar", label: "Peshawar" },
    { value: "quetta", label: "Quetta" }
  ];

  const handleSearch = () => {
    onSearch({
      subject,
      city,
      budgetMin: budget[0],
      budgetMax: budget[1]
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-card border border-gray-100 p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <Select
            label="Subject"
            options={subjects}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="All Subjects"
          />
        </div>
        
        <div>
          <Select
            label="City"
            options={cities}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="All Cities"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range (PKR/hour)
          </label>
          <div className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₨{budget[0]}</span>
              <span>₨{budget[1]}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={budget[1]}
              onChange={(e) => setBudgetRange([budget[0], parseInt(e.target.value)])}
              className="w-full mt-2 h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
        
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto"
          size="lg"
        >
          <ApperIcon name="Search" className="w-5 h-5 mr-2" />
          Find Tutors
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;