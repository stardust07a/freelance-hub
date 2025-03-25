import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: '',
    hourlyRate: '',
    title: '',
    description: '',
    hoursPerWeek: '',
    education: [],
    workHistory: [],
    languages: [],
    skills: [],
    otherExperiences: [],
    applications: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(storedUser);
    setFormData({
      profilePicture: storedUser.profilePicture || '',
      hourlyRate: storedUser.hourlyRate || '',
      title: storedUser.title || '',
      description: storedUser.description || '',
      hoursPerWeek: storedUser.hoursPerWeek || '',
      education: storedUser.education || [],
      workHistory: storedUser.workHistory || [],
      languages: storedUser.languages || [],
      skills: storedUser.skills || [],
      otherExperiences: storedUser.otherExperiences || [],
      applications: storedUser.applications || [],
    });
  }, [navigate]);

  const handleChange = (e, section, index) => {
    if (section) {
      const { name, value } = e.target;
      const updatedSection = [...formData[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], section === 'education' || section === 'workHistory' || section === 'otherExperiences' ? { title: '', description: '', year: '' } : ''],
    });
  };

  const handleRemoveItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/my-account" className="text-indigo-600 hover:underline mb-4 inline-block font-semibold">
          ← Back to My Account
        </Link>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center shadow-md">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 flex items-center justify-between border border-gray-100">
          <div className="flex items-center">
            <div className="relative">
              {isEditing ? (
                <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 flex items-center justify-center overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <span className="text-3xl text-gray-600">{user.name[0]}</span>
                  )}
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 flex items-center justify-center overflow-hidden">
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <span className="text-3xl text-gray-600">{user.name[0]}</span>
                  )}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
              {isEditing ? (
                <select
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">Select availability</option>
                  <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
                  <option value="More than 30 hrs/week">More than 30 hrs/week</option>
                  <option value="As needed">As needed</option>
                </select>
              ) : (
                <p className="text-gray-600">{formData.hoursPerWeek || 'Not specified'}</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
              {formData.languages.map((lang, index) => (
                <div key={index} className="mb-3 flex items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={lang}
                        onChange={(e) => {
                          const updatedLanguages = [...formData.languages];
                          updatedLanguages[index] = e.target.value;
                          setFormData({ ...formData, languages: updatedLanguages });
                        }}
                        placeholder="Language (e.g., English - Fluent)"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={() => handleRemoveItem('languages', index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-600">{lang}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleAddItem('languages')}
                  className="text-indigo-600 hover:underline mt-2 font-semibold"
                >
                  + Add Language
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="title"
                        value={edu.title || ''}
                        onChange={(e) => handleChange(e, 'education', index)}
                        placeholder="Degree or Certification"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="description"
                        value={edu.description || ''}
                        onChange={(e) => handleChange(e, 'education', index)}
                        placeholder="Institution"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="year"
                        value={edu.year || ''}
                        onChange={(e) => handleChange(e, 'education', index)}
                        placeholder="Year (e.g., 2018-2022)"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={() => handleRemoveItem('education', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-900 font-semibold">{edu.title}</p>
                      <p className="text-gray-600">{edu.description}</p>
                      <p className="text-gray-500 text-sm">{edu.year}</p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleAddItem('education')}
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  + Add Education
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Professional Title (e.g., Video Editor)"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="Hourly Rate (e.g., $25.00/hr)"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your services..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows="4"
                  />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{formData.title || 'Not specified'}</h2>
                    <p className="text-gray-900 font-bold">{formData.hourlyRate || 'Not specified'}</p>
                  </div>
                  <p className="text-gray-600">{formData.description || 'No description provided.'}</p>
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => {
                            const updatedSkills = [...formData.skills];
                            updatedSkills[index] = e.target.value;
                            setFormData({ ...formData, skills: updatedSkills });
                          }}
                          placeholder="Skill (e.g., React, Graphic Design)"
                          className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button
                          onClick={() => handleRemoveItem('skills', index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <button
                  onClick={() => handleAddItem('skills')}
                  className="text-indigo-600 hover:underline mt-2 font-semibold"
                >
                  + Add Skill
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment History</h2>
              {formData.workHistory.map((work, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="title"
                        value={work.title || ''}
                        onChange={(e) => handleChange(e, 'workHistory', index)}
                        placeholder="Job Title"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="description"
                        value={work.description || ''}
                        onChange={(e) => handleChange(e, 'workHistory', index)}
                        placeholder="Company and Description"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="year"
                        value={work.year || ''}
                        onChange={(e) => handleChange(e, 'workHistory', index)}
                        placeholder="Year (e.g., 2019-2021)"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={() => handleRemoveItem('workHistory', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-900 font-semibold">{work.title}</p>
                      <p className="text-gray-600">{work.description}</p>
                      <p className="text-gray-500 text-sm">{work.year}</p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleAddItem('workHistory')}
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  + Add Work History
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Experiences</h2>
              {formData.otherExperiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="title"
                        value={exp.title || ''}
                        onChange={(e) => handleChange(e, 'otherExperiences', index)}
                        placeholder="Experience Title"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="description"
                        value={exp.description || ''}
                        onChange={(e) => handleChange(e, 'otherExperiences', index)}
                        placeholder="Description"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="year"
                        value={exp.year || ''}
                        onChange={(e) => handleChange(e, 'otherExperiences', index)}
                        placeholder="Year (e.g., 2020)"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={() => handleRemoveItem('otherExperiences', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-900 font-semibold">{exp.title}</p>
                      <p className="text-gray-600">{exp.description}</p>
                      <p className="text-gray-500 text-sm">{exp.year}</p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleAddItem('otherExperiences')}
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  + Add Other Experience
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs Applied For</h2>
              {formData.applications.length > 0 ? (
                formData.applications.map((app, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
                    <p className="text-gray-900 font-semibold">{app.jobTitle}</p>
                    <p className="text-gray-600 text-sm">Applied on: {app.appliedDate}</p>
                    <p className="text-gray-600 text-sm">Proposal: {app.proposal}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No applications yet.</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;