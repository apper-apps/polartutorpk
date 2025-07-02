import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Testimonial from "@/components/molecules/Testimonial";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { reviewService } from "@/services/api/reviewService";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await reviewService.getFeatured();
      setTestimonials(data);
    } catch (err) {
      setError("Failed to load testimonials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTestimonials} />;

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
            What Students <span className="gradient-text">Say</span>
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our successful students about their learning journey with our tutors
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Testimonial testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;