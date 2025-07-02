import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TutorCard from "@/components/molecules/TutorCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { tutorService } from "@/services/api/tutorService";

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedTutors();
  }, []);

  const loadFeaturedTutors = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await tutorService.getFeatured();
      setTutors(data);
    } catch (err) {
      setError("Failed to load featured tutors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (tutorId) => {
    navigate(`/tutor/${tutorId}`);
  };

  const handleBookNow = (tutorId) => {
    navigate(`/tutor/${tutorId}?book=true`);
    toast.success("Redirecting to tutor profile for booking!");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadFeaturedTutors} />;

  return (
    <section className="py-20 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4"
          >
            Featured <span className="gradient-text">Tutors</span>
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated tutors who have helped thousands of students achieve their academic goals
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TutorCard
                tutor={tutor}
                onViewProfile={handleViewProfile}
                onBookNow={handleBookNow}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/browse-tutors")}
            className="group"
          >
            View All Tutors
            <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;