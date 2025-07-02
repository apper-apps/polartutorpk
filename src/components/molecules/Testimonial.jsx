import Card from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import Rating from "@/components/atoms/Rating";

const Testimonial = ({ testimonial }) => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <Rating rating={testimonial.rating} />
      </div>
      <blockquote className="text-gray-700 mb-4 leading-relaxed">
        "{testimonial.comment}"
      </blockquote>
      <div className="flex items-center gap-3">
        <Avatar
          src={testimonial.studentPhoto}
          alt={testimonial.studentName}
          size="sm"
          fallback={testimonial.studentName?.charAt(0)}
        />
        <div>
          <p className="font-medium text-gray-900">{testimonial.studentName}</p>
          <p className="text-sm text-gray-600">{testimonial.studentLevel}</p>
        </div>
      </div>
    </Card>
  );
};

export default Testimonial;