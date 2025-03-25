function JobCard({ title, company, date, skills, paymentVerified, rating, spent, location, onClick }) {
    return (
      <div
        onClick={onClick}
        className="bg-white p-6 rounded-lg shadow-md border border-[#e5e6ec] mb-4 hover:shadow-lg transition cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <p className="text-gray-600 text-sm">{company}</p>
            <p className="text-gray-500 text-xs">Posted: {date}</p>
            {skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {(paymentVerified || rating || spent || location) && (
              <div className="flex items-center gap-2 text-sm mt-2">
                {paymentVerified && <span className="text-green-700">● Payment verified</span>}
                {rating && <span className="text-yellow-500">★★★★☆</span>}
                {spent && <span className="text-gray-600">${spent} spent</span>}
                {location && <span className="text-gray-600">● {location}</span>}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-red-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default JobCard;