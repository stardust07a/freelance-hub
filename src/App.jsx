import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SavedJobs from './pages/SavedJobs';
import Home from './pages/Home';
import MyService from './pages/MyService';
import FindWork from './pages/FindWork';
import ProtectedRoute from './components/ProtectedRoute';
import MyAccount from './pages/MyAccount';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';
import MyProjects from './pages/MyProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
        <Route path="/my-service" element={<ProtectedRoute><MyService /></ProtectedRoute>} />
        <Route path="/find-work" element={<ProtectedRoute><FindWork /></ProtectedRoute>} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} /> {/* Add this route */}
        <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;



<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />