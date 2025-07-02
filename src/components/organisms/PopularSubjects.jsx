import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SubjectCard from "@/components/molecules/SubjectCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { subjectService } from "@/services/api/subjectService";

const PopularSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPopularSubjects();
  }, []);

  const loadPopularSubjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await subjectService.getPopular();
      setSubjects(data);
    } catch (err) {
      setError("Failed to load popular subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = (subject) => {
    navigate(`/browse-tutors?subject=${subject.toLowerCase().replace(/\s+/g, '-')}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPopularSubjects} />;

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-primary-50">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4"
          >
            Popular <span className="gradient-text">Subjects</span>
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our most sought-after subjects with experienced tutors ready to help
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SubjectCard
                subject={subject.name}
                tutorCount={subject.tutorCount}
                onClick={() => handleSubjectClick(subject.name)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularSubjects;