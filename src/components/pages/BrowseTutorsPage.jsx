import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TutorCard from "@/components/molecules/TutorCard";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { tutorService } from "@/services/api/tutorService";

const BrowseTutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tutorsPerPage = 12;

  useEffect(() => {
    loadTutors();
  }, []);

  useEffect(() => {
    // Apply initial filters from URL
    const initialFilters = {};
    if (searchParams.get('subject')) {
      initialFilters.subject = searchParams.get('subject');
    }
    if (searchParams.get('city')) {
      initialFilters.city = searchParams.get('city');
    }
    setFilters(initialFilters);
  }, [searchParams]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [tutors, filters, sortBy]);

  const loadTutors = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await tutorService.getAll();
      setTutors(data);
    } catch (err) {
      setError("Failed to load tutors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...tutors];

    // Apply filters
    if (filters.subject) {
      filtered = filtered.filter(tutor => 
        tutor.subjects?.some(subject => 
          subject.toLowerCase().includes(filters.subject.toLowerCase())
        )
      );
    }

    if (filters.city) {
      filtered = filtered.filter(tutor => 
        tutor.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.educationLevel?.length > 0) {
      filtered = filtered.filter(tutor => 
        filters.educationLevel.some(level => 
          tutor.educationLevel?.includes(level)
        )
      );
    }

    if (filters.languages?.length > 0) {
      filtered = filtered.filter(tutor => 
        filters.languages.some(lang => 
          tutor.languages?.includes(lang) || 
          (lang === "Both" && tutor.languages?.includes("English") && tutor.languages?.includes("Urdu"))
        )
      );
    }

    if (filters.rating?.length > 0) {
      const minRating = Math.min(...filters.rating);
      filtered = filtered.filter(tutor => tutor.rating >= minRating);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.hourlyRate - b.hourlyRate;
        case "price-high":
          return b.hourlyRate - a.hourlyRate;
        case "experience":
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    setFilteredTutors(filtered);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewProfile = (tutorId) => {
    navigate(`/tutor/${tutorId}`);
  };

  const handleBookNow = (tutorId) => {
    navigate(`/tutor/${tutorId}?book=true`);
    toast.success("Redirecting to tutor profile for booking!");
  };

  // Pagination
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);
  const startIndex = (currentPage - 1) * tutorsPerPage;
  const currentTutors = filteredTutors.slice(startIndex, startIndex + tutorsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTutors} />;

  return (
    <div className="py-8 bg-surface min-h-screen">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
            Find Your Perfect <span className="gradient-text">Tutor</span>
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              Showing {filteredTutors.length} tutors {filters.subject && `for ${filters.subject}`}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              className="sticky top-24"
            />
          </div>

          {/* Tutors Grid */}
          <div className="lg:col-span-3">
            {currentTutors.length === 0 ? (
              <Empty
                title="No tutors found"
                description="Try adjusting your filters or search criteria to find more tutors."
                actionText="Clear Filters"
                onAction={() => setFilters({})}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentTutors.map((tutor) => (
                    <TutorCard
                      key={tutor.Id}
                      tutor={tutor}
                      onViewProfile={handleViewProfile}
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                    </Button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "primary" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ApperIcon name="ChevronRight" className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTutorsPage;