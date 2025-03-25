import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    image: '',
    skills: [],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.userType !== 'client') {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.budget || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || currentUser.userType !== 'client') {
        navigate('/login');
        return;
      }

      const newProject = {
        id: Date.now().toString(),
        clientEmail: currentUser.email,
        title: formData.title,
        description: formData.description,
        budget: formData.budget,
        category: formData.category,
        image: formData.image || 'https://via.placeholder.com/150',
        skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [],
        posted: new Date().toISOString().split('T')[0],
        applications: [],
      };

      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
      alert('Project created successfully!');
      navigate('/my-projects');
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154347-6e9e6e0d4b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700/80 to-purple-500/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
          >
            Create a New Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto drop-shadow-md"
          >
            Post a project to find the perfect freelancer for your needs.
          </motion.p>
        </div>
      </div>

      {/* Create Project Form */}
      <div className="container mx-auto max-w-lg px-4 sm:px-8 py-16 footer-spacing">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-100/50"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Project Details
          </h2>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center mb-4 font-medium"
            >
              {error}
            </motion.p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer text-gray-800 placeholder-transparent"
                placeholder="Project Title"
                required
              />
              <label
                htmlFor="title"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-6 peer-valid:text-sm peer-valid:text-blue-600"
              >
                Project Title
              </label>
            </div>

            {/* Description */}
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer text-gray-800 placeholder-transparent h-24 resize-none"
                placeholder="Description"
                required
              />
              <label
                htmlFor="description"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-6 peer-valid:text-sm peer-valid:text-blue-600"
              >
                Description
              </label>
            </div>

            {/* Budget */}
            <div className="relative">
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer text-gray-800 placeholder-transparent"
                placeholder="Budget (e.g., $500)"
                required
              />
              <label
                htmlFor="budget"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-6 peer-valid:text-sm peer-valid:text-blue-600"
              >
                Budget (e.g., $500)
              </label>
            </div>

            {/* Category */}
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer text-gray-800 placeholder-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Writing">Writing</option>
              </select>
              <label
                htmlFor="category"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-6 peer-valid:text-sm peer-valid:text-blue-600"
              >

              </label>
            </div>

            {/* Skills */}
            <div className="relative">
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer text-gray-800 placeholder-transparent"
                placeholder="Skills (comma-separated)"
              />
              <label
                htmlFor="skills"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-6 peer-valid:text-sm peer-valid:text-blue-600"
              >
                Skills (comma-separated)
              </label>
            </div>

            {/* Image Upload */}
            <div className="relative">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Project Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V12m0 0V8m0 4h4m0 0h4m-4 0V8m0 4v4m4 0h4m-4 0H7m-4 0H3m18 0h-4M3 8h18M3 12h18"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      Select an image or drag and drop here
                    </p>
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 flex justify-center"
                >
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-xl shadow-md"
                  />
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Create Project
            </motion.button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Want to go back to your projects?{' '}
            <Link to="/my-projects" className="text-blue-600 hover:underline font-medium">
              My Projects
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateProject;