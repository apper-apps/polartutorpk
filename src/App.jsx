import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import BrowseTutorsPage from "@/components/pages/BrowseTutorsPage";
import TutorProfilePage from "@/components/pages/TutorProfilePage";
import StudentDashboardPage from "@/components/pages/StudentDashboardPage";
import AdminDashboardPage from "@/components/pages/AdminDashboardPage";
import BecomeTutorPage from "@/components/pages/BecomeTutorPage";
import BlogPage from "@/components/pages/BlogPage";
import ContactPage from "@/components/pages/ContactPage";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="browse-tutors" element={<BrowseTutorsPage />} />
            <Route path="tutor/:id" element={<TutorProfilePage />} />
            <Route path="student-dashboard" element={<StudentDashboardPage />} />
            <Route path="admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="become-tutor" element={<BecomeTutorPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;