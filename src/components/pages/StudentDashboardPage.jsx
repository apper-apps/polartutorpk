import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Moment from "react-moment";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Rating from "@/components/atoms/Rating";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { bookingService } from "@/services/api/bookingService";
import { tutorService } from "@/services/api/tutorService";
import { messageService } from "@/services/api/messageService";

const StudentDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [savedTutors, setSavedTutors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("bookings");
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      const [bookingsData, tutorsData, messagesData] = await Promise.all([
        bookingService.getStudentBookings(),
        tutorService.getSavedTutors(),
        messageService.getStudentMessages()
      ]);
      setBookings(bookingsData);
      setSavedTutors(tutorsData);
      setMessages(messagesData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingService.cancel(bookingId);
      setBookings(bookings.filter(booking => booking.Id !== bookingId));
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const handleRemoveSavedTutor = (tutorId) => {
    setSavedTutors(savedTutors.filter(tutor => tutor.Id !== tutorId));
    toast.success("Tutor removed from saved list!");
};

  const handleMarkAsRead = async (messageId) => {
    try {
      await messageService.markAsRead(messageId);
      setMessages(messages.map(msg => 
        msg.Id === messageId ? { ...msg, isRead: true } : msg
      ));
    } catch (err) {
      toast.error("Failed to mark message as read");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      case "completed":
        return "info";
      default:
        return "default";
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) >= new Date() && booking.status !== "cancelled"
  );
  const pastBookings = bookings.filter(booking => 
    new Date(booking.date) < new Date() || booking.status === "completed"
  );

  return (
    <div className="py-8 bg-surface min-h-screen">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
            Student <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage your bookings and saved tutors</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pastBookings.length}</p>
                <p className="text-sm text-gray-600">Completed Sessions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="Heart" className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{savedTutors.length}</p>
                <p className="text-sm text-gray-600">Saved Tutors</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="Star" className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </Card>
        </div>

{/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "bookings"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "saved"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Saved Tutors
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "messages"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Messages
            </button>
          </nav>
        </div>
        {/* Tab Content */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {/* Upcoming Bookings */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
              {upcomingBookings.length === 0 ? (
                <Empty
                  title="No upcoming sessions"
                  description="Book a session with your favorite tutor to get started!"
                  actionText="Browse Tutors"
                  onAction={() => navigate("/browse-tutors")}
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.Id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={booking.tutorPhoto}
                            alt={booking.tutorName}
                            size="md"
                            fallback={booking.tutorName?.charAt(0)}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.tutorName}</h3>
                            <p className="text-sm text-gray-600">{booking.subject}</p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <ApperIcon name="Calendar" className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <ApperIcon name="Clock" className="w-4 h-4" />
                          <span>{booking.timeSlot}</span>
                        </div>
                        {booking.message && (
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <ApperIcon name="MessageSquare" className="w-4 h-4 mt-0.5" />
                            <span>{booking.message}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/tutor/${booking.tutorId}`)}
                          className="flex-1"
                        >
                          View Tutor
                        </Button>
                        {booking.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.Id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Sessions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pastBookings.slice(0, 4).map((booking) => (
                    <Card key={booking.Id} className="p-6 opacity-75">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={booking.tutorPhoto}
                            alt={booking.tutorName}
                            size="md"
                            fallback={booking.tutorName?.charAt(0)}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.tutorName}</h3>
                            <p className="text-sm text-gray-600">{booking.subject}</p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <ApperIcon name="Calendar" className="w-4 h-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/tutor/${booking.tutorId}`)}
                        className="w-full"
                      >
                        Book Again
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Tutors</h2>
            {savedTutors.length === 0 ? (
              <Empty
                title="No saved tutors"
                description="Save your favorite tutors for quick access and easy booking!"
                actionText="Browse Tutors"
                onAction={() => navigate("/browse-tutors")}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTutors.map((tutor) => (
                  <Card key={tutor.Id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={tutor.profilePhoto}
                          alt={tutor.name}
                          size="md"
                          fallback={tutor.name?.charAt(0)}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{tutor.name}</h3>
                          <p className="text-sm text-gray-600">{tutor.city}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSavedTutor(tutor.Id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <ApperIcon name="X" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Rating rating={tutor.rating} size="sm" />
                      <span className="text-sm text-gray-500">({tutor.reviewCount})</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tutor.subjects?.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {subject}
                        </Badge>
                      ))}
                      {tutor.subjects?.length > 2 && (
                        <Badge variant="default" size="sm">
                          +{tutor.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-lg font-semibold text-primary-600 mb-4">
                      ₨{tutor.hourlyRate}/hr
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/tutor/${tutor.Id}`)}
                        className="flex-1"
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/tutor/${tutor.Id}?book=true`)}
                        className="flex-1"
                      >
                        Book Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
)}

        {activeTab === "messages" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Message Center</h2>
            {messages.length === 0 ? (
              <Empty
                title="No messages"
                description="Start a conversation with your tutors to get help and ask questions!"
                actionText="Browse Tutors"
                onAction={() => navigate("/browse-tutors")}
              />
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.Id} className={`p-6 transition-all hover:shadow-md ${!message.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={message.tutorPhoto}
                        alt={message.tutorName}
                        size="md"
                        fallback={message.tutorName?.charAt(0)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{message.tutorName}</h3>
                            <p className="text-sm text-gray-600">{message.subject}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">
                              <Moment fromNow>{message.lastMessageAt}</Moment>
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-gray-700 line-clamp-2">{message.lastMessage}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <ApperIcon name="MessageCircle" className="w-3 h-3" />
                          <span>{message.messageCount} messages</span>
                          {message.hasUnread && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600 font-medium">New messages</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/messages/${message.conversationId}`)}
                            className="flex-1"
                          >
                            <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2" />
                            View Conversation
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/tutor/${message.tutorId}`)}
                          >
                            <ApperIcon name="User" className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          {!message.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(message.Id)}
                            >
                              <ApperIcon name="Check" className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage;