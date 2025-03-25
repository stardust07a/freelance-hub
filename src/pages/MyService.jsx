import { useState } from 'react';
import Navbar from '../components/Navbar';
import ServiceDetailsPopup from '../components/ServiceDetailsPopup';
import Footer from '../components/Footer';

import id1Image from '../assets/id1.png';
import id3Image from '../assets/id3.png';
import id8Image from '../assets/id8.png';

function MyService() {
  const [selectedService, setSelectedService] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Expert-Crafted Logo Design with Unlimited Revisions',
      category: 'Design',
      delivery: '2 day delivery',
      price: 'From $25',
      rating: 5.0,
      reviews: 1989,
      image: id1Image, // Use local image for ID 1
      description: 'Create a unique and professional logo with unlimited revisions to ensure it perfectly matches your brand identity. Includes multiple concepts and high-resolution files.',
    },
    {
      id: 3,
      title: 'An Engaging Presentation in PowerPoint/Google Slides/KEYNOTE',
      category: 'Presentation',
      delivery: '2 day delivery',
      price: 'From $50',
      rating: 4.9,
      reviews: 5189,
      image: id3Image, // Use local image for ID 3
      description: 'Craft a visually stunning presentation for PowerPoint, Google Slides, or Keynote, designed to captivate your audience with professional slides and animations.',
    },
    {
      id: 7,
      title: 'Responsive & Professional WEBSITES, Effective Landing Page',
      category: 'Development',
      delivery: '2 day delivery',
      price: 'From $99',
      rating: 5.0,
      reviews: 1999,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=150',
      description: 'Build a responsive and professional website or landing page with a focus on user experience and effective design.',
    },
    {
      id: 8,
      title: 'Viral Instagram Reels Video Editor',
      category: 'Video Editing',
      delivery: '1 day delivery',
      price: 'From $19.99',
      rating: 5.0,
      reviews: 167,
      image: id8Image, // Use local image for ID 8
      description: 'Transform your content into viral Instagram Reels with professional editing, including captions, emojis, sound effects, and quick edits. Perfect for social media growth.',
    },
  ]);

  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false); // State for popup visibility
  const categories = ['All', 'Design', 'Presentation', 'Development', 'Video Editing'];

  const filteredServices = categoryFilter === 'All'
    ? services
    : services.filter((service) => service.category === categoryFilter);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
    setIsAddServiceOpen(false); // Close both popups
  };

  const handleContinue = () => {
    alert(`Continuing with ${selectedService.title} at ${selectedService.price.split('$')[1]}`);
    setSelectedService(null);
  };

  const handleAddService = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const imageFile = formData.get('image');
    const newService = {
      id: services.length + 1, // Simple ID generation (replace with UUID or backend ID in production)
      title: formData.get('title'),
      category: formData.get('category'),
      delivery: `${formData.get('delivery')} day${formData.get('delivery') === '1' ? '' : 's'} delivery`, // Format delivery time
      price: `From $${formData.get('price')}`,
      rating: parseFloat(formData.get('rating')),
      reviews: 0,
      image: imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/300x150', // Use uploaded image or placeholder
      description: formData.get('description'),
    };
    setServices([...services, newService]);
    console.log('New service added:', newService);
    setIsAddServiceOpen(false); // Close popup after adding
    event.target.reset(); // Reset form
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <Navbar />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 blur-sm rounded-3xl"></div>
          <div className="relative z-10 text-center py-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Your Creative Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and manage your top-rated freelance offerings with ease.
            </p>
            <button
              onClick={() => setIsAddServiceOpen(true)}
              className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Add New Service
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  categoryFilter === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-gray-100 group"
              onClick={() => handleServiceClick(service)}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-t-3xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-3">{service.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <svg
                    className="w-4 h-4 mr-1 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {service.delivery}
                </div>
                <p className="text-gray-800 text-base font-bold mb-4">{service.price}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://via.placeholder.com/32"
                      alt="Safi"
                      className="w-8 h-8 rounded-full mr-2 border-2 border-yellow-300 group-hover:border-yellow-500 transition-colors"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Safi</p>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm mr-1">★ {service.rating}</span>
                        <span className="text-gray-600 text-xs">({service.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-purple-200 transition-colors">
                    Top Rated Plus
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 rounded-3xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 mb-20 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Expand Your Offerings?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">Add more services to reach a wider audience and grow your freelance business.</p>
          <button
            onClick={() => setIsAddServiceOpen(true)}
            className="bg-purple-600 text-white w-40 h-12 rounded-full hover:bg-purple-700 transition-all duration-300 flex items-center justify-center"
          >
            Add New Service
          </button>
        </div>
      </div>

      {/* Add Service Popup */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Popup Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Service</h2>

            {/* Form */}
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter service title"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time (Days)</label>
                <input
                  type="number"
                  name="delivery"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter number of days"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter rating"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter service description"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-md"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedService && (
        <ServiceDetailsPopup
          service={selectedService}
          onClose={handleClosePopup}
          onContinue={handleContinue}
        />
      )}
      <Footer />
    </div>
  );
}

export default MyService;