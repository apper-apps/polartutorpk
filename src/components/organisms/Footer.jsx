import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const quickLinks = [
    { name: "Browse Tutors", href: "/browse-tutors" },
    { name: "Become a Tutor", href: "/become-tutor" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  const subjects = [
    { name: "Mathematics", href: "/browse-tutors?subject=mathematics" },
    { name: "Physics", href: "/browse-tutors?subject=physics" },
    { name: "Chemistry", href: "/browse-tutors?subject=chemistry" },
    { name: "English", href: "/browse-tutors?subject=english" }
  ];

  const cities = [
    { name: "Karachi", href: "/browse-tutors?city=karachi" },
    { name: "Lahore", href: "/browse-tutors?city=lahore" },
    { name: "Islamabad", href: "/browse-tutors?city=islamabad" },
    { name: "Rawalpindi", href: "/browse-tutors?city=rawalpindi" }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-50 to-navy-50 border-t border-gray-100">
      <div className="container-responsive py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-display gradient-text">
                TutorPK
              </span>
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Pakistan's leading platform for connecting students with qualified tutors. 
              Find the perfect tutor for your learning journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <ApperIcon name="Youtube" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Subjects */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Popular Subjects</h3>
            <ul className="space-y-3">
              {subjects.map((subject) => (
                <li key={subject.name}>
                  <Link
                    to={subject.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {subject.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Major Cities</h3>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city.name}>
                  <Link
                    to={city.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2024 TutorPK. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-primary-600">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-primary-600">
                Terms of Service
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-primary-600">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;