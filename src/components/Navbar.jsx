import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    navigate(`/search?q=${query}`);
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
    setTimeoutId(id);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="text-2xl font-bold text-gray-900">
            FreelanceHub
          </Link>
          <div className="flex space-x-4">
            <Link to="/find-work" className="text-gray-700 hover:text-blue-600 transition-colors">
              Find Work
            </Link>
            <Link to="/saved-jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Saved Jobs
            </Link>
            {user && user.userType === 'freelancer' && (
              <Link to="/my-service" className="text-gray-700 hover:text-blue-600 transition-colors">
                Your Services
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {user ? (
            <div className="relative">
              <button
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {user.name}
              </button>

              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to="/my-account" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    My Account
                  </Link>
                  {user.userType === 'client' && (
                    <>
                      <Link to="/create-project" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                        Create a Project
                      </Link>
                      <Link to="/my-projects" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                        View My Projects
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;