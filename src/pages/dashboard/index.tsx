import { useEffect, useState } from 'react';
import HackathonCard from '../../components/HackathonCard';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        // Directly fetch the hackathons data without using Firebase Auth
        const response = await fetch('/api/hackathons', {
          method: 'GET',
        });

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error('Failed to fetch hackathons:', errorDetails);
          throw new Error(`Failed to fetch hackathons: ${response.statusText}`);
        }

        const hackathonsData = await response.json();
        console.log('Fetched Hackathons Data:', hackathonsData); // Log the fetched data

        if (Array.isArray(hackathonsData)) {
          const formattedHackathons = hackathonsData.map((hackathon: Hackathon) => ({
            ...hackathon,
            name: hackathon.title,
          }));
          setHackathons(formattedHackathons);
        } else {
          console.error('Hackathons data is not an array', hackathonsData);
        }
      } catch (error) {
        console.error('Error loading hackathons:', error);
      }
    };

    loadHackathons();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Your Hackathons</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} {...hackathon} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
