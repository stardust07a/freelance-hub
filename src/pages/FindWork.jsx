import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobDetailsPopup from '../components/JobDetailsPopup';
import Footer from '../components/Footer';

function FindWork() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('projects')) || [];
    setJobs(storedJobs);
  }, []);

  const categories = ['All', 'Development', 'Design', 'Video Editing', 'Writing'];

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = filter === 'All' ? true : job.category === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  const handleApply = (job, proposal) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const application = {
      jobId: job.id,
      jobTitle: job.title,
      appliedDate: new Date().toISOString().split('T')[0],
      proposal: proposal,
    };
    currentUser.applications = currentUser.applications || [];
    currentUser.applications.push(application);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => (u.email === currentUser.email ? currentUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const updatedProjects = projects.map(p => {
      if (p.id === job.id) {
        p.applications = p.applications || [];
        p.applications.push({
          freelancerId: currentUser.email,
          freelancerName: currentUser.name,
          proposal: proposal,
          appliedDate: new Date().toISOString().split('T')[0],
        });
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    window.dispatchEvent(new Event('storageUpdated'));

    alert(`Applied for ${job.title}`);
    setSelectedJob(null);
  };

  const handleSaveJob = (job) => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    const isAlreadySaved = savedJobs.some(savedJob => savedJob.id === job.id);
    if (!isAlreadySaved) {
      savedJobs.push(job);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      alert(`${job.title} has been saved!`);
    } else {
      alert(`${job.title} is already saved.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto flex-grow footer-spacing">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-3 animate-fade-in">
            Find Your Dream Project
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Discover opportunities that match your skills and passion.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="relative w-full md:w-96">
  <input
    type="text"
    placeholder="Search projects..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
  />
  <svg
    className="w-6 h-6 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
</div>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="card w-card h-card relative overflow-hidden group cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-40 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveJob(job);
                    }}
                    className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full hover:bg-green-600 transition-all"
                  >
                    Save
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{job.description}</p>
                  <div className="flex items-center text-gray-500 text-xs mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    Posted {job.posted}
                  </div>
                  <p className="text-md font-bold text-blue-600 mb-2">{job.budget}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No projects found matching your criteria.
            </p>
          )}
        </div>
      </div>
      {selectedJob && (
        <JobDetailsPopup
          job={selectedJob}
          onClose={handleClosePopup}
          onApply={handleApply}
        />
      )}
      <Footer />
    </div>
  );
}

export default FindWork;