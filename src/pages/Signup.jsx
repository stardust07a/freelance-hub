import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userType) {
      setError('Please select if you want to hire or work');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some(user => user.email === formData.email)) {
        setError('Email already exists. Please use a different email.');
        setLoading(false);
        return;
      }

      // Add new user to localStorage
      const newUser = { ...formData };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('token', 'fake-token'); // Simulate a token for auth

      alert('Registration successful! Please log in.');

      // Redirect based on user type
      if (formData.userType === 'client') {
        navigate('/create-project');
      } else {
        navigate('/login?type=freelancer');
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <Navbar />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 blur-sm rounded-3xl"></div>
          <div className="relative z-10 text-center py-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Sign Up</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create your FreelanceHub account to start offering or finding services.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What would you like to do?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="client"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Hire for a project</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="freelancer"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Work as a freelancer</span>
                  </label>
                </div>
              </div>

              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;