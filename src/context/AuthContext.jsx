import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState([]);

  const saveJob = (job) => {
    if (!savedJobs.some((j) => j.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
      console.log('Saved job:', job);
    }
  };

  const unsaveJob = (jobId) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== jobId));
    console.log('Removed job with ID:', jobId);
  };

  console.log('AuthProvider rendering, savedJobs:', savedJobs);

  return (
    <AuthContext.Provider value={{ savedJobs, saveJob, unsaveJob }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}