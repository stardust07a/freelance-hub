import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';

function Applications() {
  const applications = [
    {
      title: 'Document_Sourcing',
      company: 'Hourly: $8-$10 - Entry level - Est. Time: 1 to 3 months, Less than 30 hrs/week',
      date: 'Yesterday',
      skills: ['English', 'Data Entry', 'Proofreading', 'Documentation', 'Turkish to English Translation'],
      paymentVerified: true,
      rating: true,
      spent: '30K+',
      location: 'United States',
      proposals: '20 to 50',
    },
    {
      title: 'Native Turkish Transcription Project',
      company: 'Fixed-price - Entry level - Est. Budget: $5',
      date: 'Yesterday',
      skills: ['Turkish', 'General Transcription'],
      paymentVerified: true,
      rating: true,
      spent: '30K+',
      location: 'Thailand',
      proposals: '50+',
    },
    {
      title: 'Testers for ANDROID TV App',
      company: 'Fixed-price - Entry level - Est. Budget: $10',
      date: '2 hours ago',
      skills: ['Android Testing'],
      paymentVerified: false,
      rating: false,
      spent: null,
      location: null,
      proposals: null,
    },
  ];

  const handleSave = (title) => {
    alert(`Saved ${title}`);
  };

  const handleHide = (title) => {
    alert(`Hid ${title}`);
  };

  return (
    <div className="bg-[#e5e6ec] min-h-screen">
      <Navbar />
      <div className="pt-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-6">Proposals & Applications</h2>
        <div className="space-y-4">
          {applications.map((app, index) => (
            <JobCard
              key={index}
              title={app.title}
              company={app.company}
              date={app.date}
              skills={app.skills}
              paymentVerified={app.paymentVerified}
              rating={app.rating}
              spent={app.spent}
              location={app.location}
              proposals={app.proposals}
              isProposal={true}
              onSave={() => handleSave(app.title)}
              onHide={() => handleHide(app.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Applications;