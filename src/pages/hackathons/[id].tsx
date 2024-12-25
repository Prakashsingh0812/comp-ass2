import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchHackathonById } from '../../utils/hackathon';

// Define the Hackathon interface
interface Hackathon {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

const HackathonDetail: React.FC = () => {
  const { query } = useRouter();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Type assertion: Treat query.id as a string if it is not undefined or an array
    const hackathonId = query.id as string | undefined;

    // Check if hackathonId is a valid string
    if (typeof hackathonId === 'string') {
      const loadHackathon = async () => {
        try {
          setLoading(true); // Start loading
          const data = await fetchHackathonById(hackathonId);
          console.log('Fetched Hackathon Data:', data);  // Log the fetched data for debugging
          if (data) {
            setHackathon(data);
          } else {
            setError('Hackathon not found.');
          }
        } catch (err) {
          console.error('Error loading hackathon:', err);  // Log the error for debugging
          setError('Failed to fetch hackathon details. Please try again later.');
        } finally {
          setLoading(false); // End loading
        }
      };
      loadHackathon();
    } else {
      // Handle invalid ID case (array or undefined)
      setError('Invalid Hackathon ID');
      setLoading(false);
    }
  }, [query.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!hackathon) {
    return <div>No hackathon details found.</div>;
  }

  // Handle potential issues with date format
  const formattedDate = new Date(hackathon.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">{hackathon.name}</h1>
      <p className="mt-2 text-3xl">{hackathon.description}</p>
      <p className="text-gray-500 mt-4">Date: {formattedDate}</p>
      <p className="text-gray-500">Location: {hackathon.location || 'Unknown Location'}</p>  {/* Fallback to 'Unknown Location' */}
    </div>
  );
};

export default HackathonDetail;
