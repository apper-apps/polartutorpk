import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { tutorService } from "@/services/api/tutorService";
import { bookingService } from "@/services/api/bookingService";

const AdminDashboardPage = () => {
  const [pendingTutors, setPendingTutors] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("approvals");

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tutorsData, bookingsData, statsData] = await Promise.all([
        tutorService.getPendingApprovals(),
        bookingService.getRecent(),
        tutorService.getStats()
      ]);
      setPendingTutors(tutorsData);
      setRecentBookings(bookingsData);
      setStats(statsData);
    } catch (err) {
      setError("Failed to load admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTutor = async (tutorId) => {
    try {
      await tutorService.approve(tutorId);
      setPendingTutors(pendingTutors.filter(tutor => tutor.Id !== tutorId));
      toast.success("Tutor approved successfully!");
    } catch (err) {
      toast.error("Failed to approve tutor. Please try again.");
    }
  };

  const handleRejectTutor = async (tutorId) => {
    try {
      await tutorService.reject(tutorId);
      setPendingTutors(pendingTutors.filter(tutor => tutor.Id !== tutorId));
      toast.success("Tutor application rejected.");
    } catch (err) {
      toast.error("Failed to reject tutor. Please try again.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAdminData} />;

  return (
    <div className="py-8 bg-surface min-h-screen">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage tutors, bookings, and platform analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="Users" className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTutors || 0}</p>
                <p className="text-sm text-gray-600">Total Tutors</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="UserCheck" className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeTutors || 0}</p>
                <p className="text-sm text-gray-600">Active Tutors</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings || 0}</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="Clock" className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingTutors.length}</p>
                <p className="text-sm text-gray-600">Pending Approvals</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("approvals")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "approvals"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Tutor Approvals ({pendingTutors.length})
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "bookings"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Recent Bookings
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "analytics"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "approvals" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Tutor Approvals</h2>
            {pendingTutors.length === 0 ? (
              <Card className="p-8 text-center">
                <ApperIcon name="CheckCircle" className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No pending tutor approvals at the moment.</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {pendingTutors.map((tutor) => (
                  <Card key={tutor.Id} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar
                          src={tutor.profilePhoto}
                          alt={tutor.name}
                          size="lg"
                          fallback={tutor.name?.charAt(0)}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutor.name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Email:</p>
                              <p className="font-medium">{tutor.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Phone:</p>
                              <p className="font-medium">{tutor.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">City:</p>
                              <p className="font-medium">{tutor.city}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Experience:</p>
                              <p className="font-medium">{tutor.experience} years</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                            <div className="flex flex-wrap gap-2">
                              {tutor.subjects?.map((subject, index) => (
                                <Badge key={index} variant="primary" size="sm">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Education:</p>
                            <div className="flex flex-wrap gap-2">
                              {tutor.educationLevel?.map((level, index) => (
                                <Badge key={index} variant="info" size="sm">
                                  {level}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {tutor.bio && (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Bio:</p>
                              <p className="text-gray-700 text-sm leading-relaxed">{tutor.bio}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 lg:w-40">
                        <Button
                          onClick={() => handleApproveTutor(tutor.Id)}
                          className="w-full"
                        >
                          <ApperIcon name="Check" className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRejectTutor(tutor.Id)}
                          className="w-full text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <ApperIcon name="X" className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <Card key={booking.Id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={booking.tutorPhoto}
                        alt={booking.tutorName}
                        size="sm"
                        fallback={booking.tutorName?.charAt(0)}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{booking.tutorName}</p>
                        <p className="text-sm text-gray-600">{booking.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <Badge variant={booking.status === "confirmed" ? "success" : "warning"}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Growth</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New Tutors</span>
                    <span className="font-medium text-primary-600">+24 this month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New Students</span>
                    <span className="font-medium text-primary-600">+156 this month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Sessions</span>
                    <span className="font-medium text-primary-600">+342 this month</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Subjects</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mathematics</span>
                    <span className="font-medium">156 sessions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Physics</span>
                    <span className="font-medium">124 sessions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Chemistry</span>
                    <span className="font-medium">98 sessions</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;