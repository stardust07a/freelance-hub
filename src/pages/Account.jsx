import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyAccount() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value || user.password,
    };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Account updated successfully!');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 max-w-5xl mx-auto flex-grow footer-spacing">
      <div className="pt-20 px-4 md:px-8 max-w-5xl mx-auto flex-grow">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-3 animate-fade-in">
            My Account
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Manage your profile and view your applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="card lg:col-span-1 w-card">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-2 text-sm">{user.email}</p>
              <p className="text-xs text-gray-500 capitalize">Role: {user.userType}</p>
            </div>
          </div>

          {/* Update Form */}
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password (Leave blank to keep current)</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Update Profile
              </button>
            </form>
          </div>
        </div>
        </div>
        {/* Applications Section */}
        {user.applications && user.applications.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold gradient-text mb-4">Your Applications</h3>
            <div className="grid grid-cols-1 gap-6">
              {user.applications.map((app, index) => (
                <div key={index} className="card w-card">
                  <h4 className="text-md font-semibold text-gray-800">{app.jobTitle}</h4>
                  <p className="text-gray-600 text-sm mt-1">Applied on: {app.appliedDate}</p>
                  <p className="text-gray-600 text-sm mt-1">Proposal: {app.proposal}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyAccount;