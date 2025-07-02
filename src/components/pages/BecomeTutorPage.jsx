import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { tutorService } from "@/services/api/tutorService";

const BecomeTutorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    subjects: [],
    educationLevel: [],
    hourlyRate: "",
    experience: "",
    languages: [],
    bio: "",
    certifications: []
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
    "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", 
    "Urdu", "Computer Science", "Accounting", "Economics", "History"
  ];

  const educationLevels = [
    "Matric", "FSc/FA", "O Levels", "A Levels", "Bachelor's", "Master's", "PhD"
  ];

  const languages = ["English", "Urdu"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'city', 'hourlyRate', 'experience', 'bio'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    if (formData.subjects.length === 0) {
      toast.error("Please select at least one subject");
      return false;
    }
    
    if (formData.educationLevel.length === 0) {
      toast.error("Please select your education level");
      return false;
    }
    
    if (formData.languages.length === 0) {
      toast.error("Please select at least one language");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await tutorService.create(formData);
      toast.success("Application submitted successfully! We'll review it within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        subjects: [],
        educationLevel: [],
        hourlyRate: "",
        experience: "",
        languages: [],
        bio: "",
        certifications: []
      });
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-surface min-h-screen">
      <div className="container-responsive max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
            Become a <span className="gradient-text">Tutor</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Pakistan's leading tutoring platform and help students achieve their academic goals. 
            Share your knowledge and earn while teaching what you love.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Users" className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Connect with Students</h3>
            <p className="text-gray-600 text-sm">Reach thousands of motivated students across Pakistan</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="DollarSign" className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Earning</h3>
            <p className="text-gray-600 text-sm">Set your own rates and teaching schedule</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Award" className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Build Your Reputation</h3>
            <p className="text-gray-600 text-sm">Get reviews and build a strong teaching profile</p>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tutor Application Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+92 300 1234567"
                  required
                />
                <Select
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  options={cities.map(city => ({ value: city, label: city }))}
                  placeholder="Select your city"
                  required
                />
              </div>
            </div>

            {/* Teaching Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Teaching Information</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subjects You Teach <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map((subject) => (
                    <label key={subject} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleMultiSelect('subjects', subject)}
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Education Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {educationLevels.map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.educationLevel.includes(level)}
                        onChange={() => handleMultiSelect('educationLevel', level)}
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Teaching Languages <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  {languages.map((language) => (
                    <label key={language} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={() => handleMultiSelect('languages', language)}
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Hourly Rate (PKR)"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  placeholder="e.g., 2000"
                  required
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 3"
                  required
                />
              </div>
            </div>

            {/* About You */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">About You</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio/Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell students about your teaching style, experience, and what makes you a great tutor..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none resize-none"
                  required
                />
              </div>
              
              <Input
                label="Certifications (Optional)"
                value={formData.certifications.join(', ')}
                onChange={(e) => handleInputChange('certifications', e.target.value.split(', ').filter(cert => cert.trim()))}
                placeholder="e.g., B.Ed, TEFL, Subject-specific certifications"
              />
            </div>

            {/* Terms */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-3">Application Process</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Submit your application with accurate information</span>
                </li>
                <li className="flex items-start gap-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Our team will review your profile within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Once approved, you can start receiving student requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Build your reputation through student reviews and ratings</span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                loading={loading}
                size="lg"
                className="px-12"
              >
                Submit Application
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default BecomeTutorPage;