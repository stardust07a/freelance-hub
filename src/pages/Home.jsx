import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Padding to Avoid Overlap with Fixed Navbar */}
      <div className="container mx-auto pt-32 pb-28 flex flex-col md:flex-row items-center justify-between px-6 animate-fade-in">
        {/* Left Side: Text and Search */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            We bring projects to life
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0"
          >
            Find high-quality talent or open jobs with the help of AI tools that keep you in control.
          </motion.p>
          <div className="flex justify-center md:justify-start">
            <form onSubmit={handleSearch} className="w-full max-w-xl flex">
              <input
                type="text"
                placeholder="Search for talent or jobs..."
                className="w-full p-4 bg-white border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg font-sans text-gray-700 placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-r-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Images */}
        <div className="md:w-1/2 relative mt-8 md:mt-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Freelancer working on a creative project"
                className="rounded-xl shadow-lg w-full h-72 object-cover transform -translate-y-6"
              />
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt="Freelancer collaborating on a design"
                className="rounded-xl shadow-lg w-full h-56 object-cover"
              />
            </div>
            <div className="space-y-6">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Freelancer presenting a project"
                className="rounded-xl shadow-lg w-full h-56 object-cover transform translate-y-6"
              />
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                alt="Freelancer coding on a laptop"
                className="rounded-xl shadow-lg w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="py-12">
        <div className="container mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 uppercase font-medium text-lg mb-6 tracking-wide font-sans"
          >
            Trusted By
          </motion.p>
          <div className="flex justify-center space-x-12">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft logo"
              className="h-12"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
              alt="Airbnb logo"
              className="h-12"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              src="https://findlogovector.com/wp-content/uploads/2018/11/bissell-logo-vector.png"
              alt="Bissell logo"
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Search Handler Function
  function handleSearch(event) {
    event.preventDefault();
    const query = event.target.elements[0].value;
    if (query.trim()) {
      console.log('Search query:', query);
      // Navigate to a search results page or filter content
      window.location.href = `/search?q=${encodeURIComponent(query)}`; // Temporary navigation
    }
  }
};

export default Home;