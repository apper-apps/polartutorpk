import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "tutor", label: "Tutor Support" },
    { value: "student", label: "Student Support" },
    { value: "technical", label: "Technical Issue" },
    { value: "partnership", label: "Partnership" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: ""
      });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "Mail",
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@tutorpk.com",
      action: "mailto:support@tutorpk.com"
    },
    {
      icon: "Phone",
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+92 21 1234 5678",
      action: "tel:+922112345678"
    },
    {
      icon: "MapPin",
      title: "Visit Us",
      description: "Our main office in Karachi",
      contact: "Karachi, Pakistan",
      action: "#"
    },
    {
      icon: "MessageCircle",
      title: "Live Chat",
      description: "Chat with us during business hours",
      contact: "Available 9 AM - 6 PM",
      action: "#"
    }
  ];

  const faqs = [
    {
      question: "How do I find a tutor?",
      answer: "Use our search feature on the homepage to filter tutors by subject, city, price range, and other criteria. You can also browse featured tutors or popular subjects."
    },
    {
      question: "How do I become a tutor?",
      answer: "Click on 'Become a Tutor' in the navigation menu and fill out the application form. Our team will review your profile and get back to you within 24 hours."
    },
    {
      question: "What are the payment methods?",
      answer: "We support various payment methods including bank transfers, mobile wallets, and online payment systems. Payment details are arranged directly between tutors and students."
    },
    {
      question: "How do I cancel a booking?",
      answer: "You can cancel a booking from your student dashboard. Please note our cancellation policy - cancellations must be made at least 24 hours before the scheduled session."
    }
  ];

  return (
    <div className="py-12 bg-surface min-h-screen">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need help? We're here to assist you with anything related to TutorPK
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief subject of your message"
                  />
                  <Select
                    label="Category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    options={categories}
                    placeholder="Select category"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Send Message
                  <ApperIcon name="Send" className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name={info.icon} className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{info.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{info.description}</p>
                      <a
                        href={info.action}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        {info.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <ApperIcon name="Facebook" className="w-5 h-5 text-blue-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <ApperIcon name="Twitter" className="w-5 h-5 text-blue-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors">
                  <ApperIcon name="Instagram" className="w-5 h-5 text-pink-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                  <ApperIcon name="Youtube" className="w-5 h-5 text-red-600" />
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions about TutorPK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;