import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Rating from "@/components/atoms/Rating";
import Avatar from "@/components/atoms/Avatar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { tutorService } from "@/services/api/tutorService";
import { reviewService } from "@/services/api/reviewService";

const TutorProfilePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [tutor, setTutor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  const shouldShowBooking = searchParams.get('book') === 'true';

  useEffect(() => {
    loadTutorData();
  }, [id]);

  const loadTutorData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tutorData, reviewsData] = await Promise.all([
        tutorService.getById(parseInt(id)),
        reviewService.getByTutorId(parseInt(id))
      ]);
      setTutor(tutorData);
      setReviews(reviewsData);
    } catch (err) {
      setError("Failed to load tutor profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time for your session.");
      return;
    }

    // Simulate booking
    toast.success("Booking request sent! The tutor will contact you soon.");
    setSelectedDate("");
    setSelectedTime("");
    setBookingMessage("");
  };

  const handleContactTutor = () => {
    toast.success("Contact details shared! You can now message the tutor.");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTutorData} />;
  if (!tutor) return <Error message="Tutor not found" />;

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", 
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  return (
    <div className="py-8 bg-surface min-h-screen">
      <div className="container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <Card className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <Avatar
                  src={tutor.profilePhoto}
                  alt={tutor.name}
                  size="2xl"
                  fallback={tutor.name?.charAt(0)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {tutor.name}
                      </h1>
                      <div className="flex items-center gap-4 text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <ApperIcon name="MapPin" className="w-4 h-4" />
                          <span>{tutor.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Clock" className="w-4 h-4" />
                          <span>{tutor.experience} years experience</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <Rating rating={tutor.rating} size="lg" />
                        <span className="text-gray-500">({tutor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    {tutor.verified && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <ApperIcon name="CheckCircle" className="w-4 h-4" />
                        Verified Tutor
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.languages?.map((language, index) => (
                      <Badge key={index} variant="info">
                        <ApperIcon name="Globe" className="w-3 h-3 mr-1" />
                        {language}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-2xl font-bold text-primary-600">
                    ₨{tutor.hourlyRate}/hour
                  </div>
                </div>
              </div>
            </Card>

            {/* About Section */}
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {tutor.bio || "An experienced and passionate educator dedicated to helping students achieve their academic goals."}
              </p>
              
              {tutor.videoIntro && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Video Introduction</h3>
                  <div className="bg-gray-100 rounded-xl p-8 text-center">
                    <ApperIcon name="Play" className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                    <p className="text-gray-600">Video introduction available</p>
                  </div>
                </div>
              )}

              {/* Education */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Education</h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.educationLevel?.map((level, index) => (
                    <Badge key={index} variant="primary">
                      <ApperIcon name="GraduationCap" className="w-3 h-3 mr-1" />
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {tutor.certifications?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.certifications.map((cert, index) => (
                      <Badge key={index} variant="success">
                        <ApperIcon name="Award" className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Subjects */}
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subjects I Teach</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tutor.subjects?.map((subject, index) => (
                  <div key={index} className="bg-primary-50 rounded-xl p-4 text-center">
                    <h3 className="font-medium text-primary-800">{subject}</h3>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Student Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.Id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Avatar
                          size="sm"
                          fallback={review.studentName?.charAt(0)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{review.studentName}</h4>
                            <Rating rating={review.rating} size="sm" />
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book a Session</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    placeholder="Tell the tutor about your learning goals..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Session Rate:</span>
                    <span className="font-semibold text-primary-600">₨{tutor.hourlyRate}/hour</span>
                  </div>
                </div>

                <Button onClick={handleBookSession} className="w-full mb-3">
                  <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                  Book Session
                </Button>

                <Button 
                  variant="outline" 
                  onClick={handleContactTutor}
                  className="w-full"
                >
                  <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                  Contact Tutor
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;