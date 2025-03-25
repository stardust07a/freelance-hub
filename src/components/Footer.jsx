import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/find-work" className="hover:text-blue-300 transition-colors">
                Find Work
              </Link>
            </li>
            <li>
              <Link to="/saved-jobs" className="hover:text-blue-300 transition-colors">
                Saved Jobs
              </Link>
            </li>
            {user && user.userType === 'freelancer' && (
              <li>
                <Link to="/my-service" className="hover:text-blue-300 transition-colors">
                  Your Services
                </Link>
              </li>
            )}
            <li>
              <Link to="/my-account" className="hover:text-blue-300 transition-colors">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Contact Us</h3>
          <p className="mb-2">Email: support@freelancehub.com</p>
          <p>Phone: +1-800-555-1234</p>
          <p className="mt-4">Address: 123 Freelance Lane, Tech City, TC 45678</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.718 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.695 1.8-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.366-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>© {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;