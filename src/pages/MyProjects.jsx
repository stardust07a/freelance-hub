import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProjects = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || currentUser.userType !== 'client') {
        navigate('/login');
        return;
      }

      const allProjects = JSON.parse(localStorage.getItem('projects')) || [];
      const userProjects = allProjects.filter(
        (project) => project.clientEmail === currentUser.email
      );
      setProjects(userProjects);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    }
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const allProjects = JSON.parse(localStorage.getItem('projects')) || [];
      const updatedProjects = allProjects.filter((project) => project.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      fetchProjects();
      window.dispatchEvent(new Event('storageUpdated'));
      alert('Project deleted successfully!');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('storageUpdated', fetchProjects);
    window.addEventListener('focus', fetchProjects);
    return () => {
      window.removeEventListener('storageUpdated', fetchProjects);
      window.removeEventListener('focus', fetchProjects);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto flex-grow footer-spacing">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-3 animate-fade-in">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            View and manage the projects you’ve posted.
          </p>
          <button
            onClick={fetchProjects}
            className="mt-4 btn-primary"
          >
            Refresh Projects
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="card w-card relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-t-xl mb-3"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{project.title}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
                <p className="text-gray-600 text-sm mb-1"><strong>Budget:</strong> {project.budget}</p>
                <p className="text-gray-600 text-sm mb-3"><strong>Category:</strong> {project.category}</p>

                <h3 className="text-md font-semibold gradient-text mb-2">Applications</h3>
                {project.applications && project.applications.length > 0 ? (
                  <ul className="space-y-3">
                    {project.applications.map((app, index) => (
                      <li key={index} className="border-t pt-2">
                        <p className="text-gray-800 text-sm"><strong>Freelancer:</strong> {app.freelancerName}</p>
                        <p className="text-gray-600 text-sm"><strong>Proposal:</strong> {app.proposal}</p>
                        <p className="text-gray-600 text-sm"><strong>Applied On:</strong> {app.appliedDate}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm">No applications yet.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              You have not posted any projects yet.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyProjects;