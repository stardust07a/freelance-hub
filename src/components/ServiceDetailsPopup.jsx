import React from 'react';

function ServiceDetailsPopup({ service, onClose, onContinue }) {
  console.log('ServiceDetailsPopup rendering, service:', service);

  const isVideoEditing = service.title === 'Viral Instagram Reels Video Editor';
  const details = isVideoEditing
    ? {
        title: 'Quick Edit Marvel',
        description: 'Quick editing for 1 Instagram Reel',
        deliveryTime: '1 day',
        revisions: 'Unlimited',
        footageProvided: 1,
        runningTime: 1,
        features: ['Color Grading', 'Sound Design & Mixing', 'Motion Graphics'],
        deliveryDate: 'Mar 16, 2025',
      }
    : {
        title: 'Shorter Videos',
        description: 'Short (Under 2 minutes) Buy this if your footage is less than 2 minutes long',
        deliveryTime: '7 days',
        revisions: 'Unlimited',
        footageProvided: 2,
        runningTime: 2,
        features: ['Color Grading', 'Sound Design & Mixing', 'Motion Graphics', 'Subtitles'],
        deliveryDate: 'Mar 20, 2025',
      };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              {service.title}
            </h2>
            <div className="flex items-center mt-2">
              <img
                src="https://via.placeholder.com/32"
                alt="Safi"
                className="w-6 h-6 rounded-full mr-2 border-2 border-yellow-300"
              />
              <span className="text-gray-700 font-medium">Safi</span>
              <span className="text-yellow-500 ml-2 font-semibold">★ {service.rating} ({service.reviews})</span>
              <span className="text-blue-500 ml-2 text-sm font-semibold">Top Rated</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select service tier</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Starter</span>
                  <span className="text-gray-900 font-bold">${isVideoEditing ? '19.99' : '25'}</span>
                </label>
              </div>
              <div className="border border-gray-200 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Standard</span>
                  <span className="text-gray-900 font-bold">${isVideoEditing ? '39.99' : '50'}</span>
                </label>
              </div>
              <div className="border border-gray-200 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Advanced</span>
                  <span className="text-gray-900 font-bold">${isVideoEditing ? '49.99' : '100'}</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <p className="text-gray-700 font-medium"><strong>{details.title}</strong></p>
              <p className="text-sm text-gray-600">{details.description}</p>
              <p className="text-sm text-gray-600"><strong>Delivery Time:</strong> {details.deliveryTime}</p>
              <p className="text-sm text-gray-600"><strong>Number of Revisions:</strong> {details.revisions}</p>
              <p className="text-sm text-gray-600"><strong>Footage Provided (Minutes):</strong> {details.footageProvided}</p>
              <p className="text-sm text-gray-600"><strong>Running Time (Minutes):</strong> {details.runningTime}</p>
              {details.features.map((feature) => (
                <p key={feature} className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </p>
              ))}
              <p className="text-sm text-gray-600"><strong>{details.deliveryTime} delivery - {details.deliveryDate}</strong></p>
              <p className="text-sm text-gray-600 text-red-500">Revisions may occur after this date.</p>
            </div>
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
            >
              Continue (${service.price.split('$')[1]})
            </button>
            <p className="text-sm text-gray-600 mt-2">Upwork Payment Protection</p>
            <p className="text-sm text-gray-600">Hire the client upfront; Safi gets paid once you are satisfied with the work.</p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Project details</h3>
          <p className="text-gray-700">{service.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailsPopup;