import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { blogService } from "@/services/api/blogService";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBlogData();
  }, []);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      setError("");
      const [postsData, categoriesData] = await Promise.all([
        blogService.getAll(),
        blogService.getCategories()
      ]);
      setPosts(postsData);
      setFeaturedPost(postsData.find(post => post.featured) || postsData[0]);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load blog posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === "all" 
    ? posts.filter(post => !post.featured)
    : posts.filter(post => post.category === selectedCategory && !post.featured);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBlogData} />;

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
            Education <span className="gradient-text">Blog</span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, study guides, and educational insights to help students excel in their academic journey
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 lg:p-12 flex items-center">
                  <div>
                    <Badge variant="primary" className="mb-4">Featured Article</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <Badge variant="info" size="sm">{featuredPost.category}</Badge>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <ApperIcon name="Clock" className="w-4 h-4" />
                        {featuredPost.readTime} min read
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(featuredPost.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Button>
                      Read Full Article
                      <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-100 min-h-64 flex items-center justify-center">
                  <ApperIcon name="BookOpen" className="w-24 h-24 text-gray-400" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-primary-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full overflow-hidden">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="info" size="sm">{post.category}</Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ApperIcon name="Clock" className="w-3 h-3" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ApperIcon name="ArrowRight" className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-br from-primary-50 to-navy-50 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated with Educational Insights
              </h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter and get the latest study tips, exam strategies, 
                and educational resources delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none"
                />
                <Button className="sm:w-auto">
                  Subscribe
                  <ApperIcon name="Mail" className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;