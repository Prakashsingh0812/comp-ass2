import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import HackathonCard from '../components/HackathonCard';
import HackathonForm from '../components/HackathonForm';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [ongoingHackathons, setOngoingHackathons] = useState<Hackathon[]>([]);
  const [pastHackathons, setPastHackathons] = useState<Hackathon[]>([]);

  // Function to categorize hackathons into ongoing and past
  const categorizeHackathons = (hackathonsData: Hackathon[]) => {
    const now = new Date();
    setOngoingHackathons(
      hackathonsData.filter((hackathon: Hackathon) => new Date(hackathon.date) >= now)
    );
    setPastHackathons(
      hackathonsData.filter((hackathon: Hackathon) => new Date(hackathon.date) < now)
    );
  };

  useEffect(() => {
    if (user) {
      const loadHackathons = async () => {
        try {
          const response = await fetch('/api/hackathons');
          if (!response.ok) throw new Error('Failed to fetch hackathons');
          const hackathonsData = await response.json();
          console.log('Hackathons Data:', hackathonsData); // Log response data here
          setHackathons(hackathonsData);
          categorizeHackathons(hackathonsData); // Categorize after setting the hackathons
        } catch (error) {
          console.error('Error loading hackathons:', error);
        }
      };

      loadHackathons();
    }
  }, [user]); // Re-fetch hackathons whenever `user` changes

  // Callback function to update the hackathons list when a new one is created
  const addNewHackathon = (newHackathon: Hackathon) => {
    setHackathons((prevHackathons) => {
      const updatedHackathons = [...prevHackathons, newHackathon];
      categorizeHackathons(updatedHackathons); // Re-categorize hackathons after adding new one
      return updatedHackathons;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Your Hackathons</h1>

      {/* Display Hackathon Form */}
      <HackathonForm addNewHackathon={addNewHackathon} />

      <section>
        <h2 className="text-xl font-medium mt-6">Ongoing Hackathons</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoingHackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              id={hackathon.id}
              title={hackathon.title}
              description={hackathon.description}
              date={hackathon.date}
              location={hackathon.location}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mt-6">Past Hackathons</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastHackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              id={hackathon.id}
              title={hackathon.title}
              description={hackathon.description}
              date={hackathon.date}
              location={hackathon.location}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
