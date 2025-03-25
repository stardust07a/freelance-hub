import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function JobDetailsPopup({ job, onClose, onApply }) {
  const [proposal, setProposal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(job, proposal);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {job.title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-all duration-300"
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
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-2">
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
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Job Image */}
            {job.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-48 object-cover rounded-xl shadow-md"
                />
              </motion.div>
            )}

            {/* Job Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                <p className="text-gray-600 text-sm mt-1">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">Budget</h3>
                <p className="text-gray-600 text-sm mt-1">{job.budget}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">Category</h3>
                <p className="text-gray-600 text-sm mt-1">{job.category}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">Skills Required</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Apply for This Job
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer text-gray-800 placeholder-transparent h-32 resize-none"
                    placeholder="Your Proposal"
                    required
                  />
                  <label
                    htmlFor="proposal"
                    className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-6 peer-valid:text-sm peer-valid:text-blue-600"
                  >
                    Your Proposal
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  Submit Application
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default JobDetailsPopup;