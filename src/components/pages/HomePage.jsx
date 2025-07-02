import HeroSection from "@/components/organisms/HeroSection";
import FeaturedTutors from "@/components/organisms/FeaturedTutors";
import PopularSubjects from "@/components/organisms/PopularSubjects";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedTutors />
      <PopularSubjects />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;