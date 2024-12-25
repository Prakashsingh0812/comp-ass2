import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Import Firestore instance
import HackathonCard from '../components/HackathonCard';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

interface Hackathon {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

const Home: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get user status for conditional rendering

  useEffect(() => {
    // Create query with Firestore ordering
    const q = query(collection(db, 'hackathons'), orderBy('date', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const hackathonList: Hackathon[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            // Validate and format date properly
            let formattedDate = '';
            if (data.date) {
              formattedDate = new Date(data.date.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
            }

            // Map Firestore fields properly
            return {
              id: doc.id,
              title: data.title || 'No Title', // Ensure 'title' instead of 'name'
              date: formattedDate || 'Invalid Date',
              location: data.location || 'Unknown Location',
              description: data.description || 'No Description Available',
            };
          });

          setHackathons(hackathonList); // Update the state
          setLoading(false); // Reset loading state
        } catch (err) {
          setError('Failed to process data. Please refresh the page.');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Firestore Error:', err.message); // Debug logs
        setError('Failed to fetch hackathons. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Upcoming Hackathons</h1>

      {/* Show loading state */}
      {loading && <p>Loading hackathons...</p>}

      {/* Show error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show "Create Hackathon" button if the user is logged in */}
      {user && (
        <div className="mt-4">
          <Link href="/create">
            <button className="bg-blue-600 text-white p-2 rounded">
              Create Hackathon
            </button>
          </Link>
        </div>
      )}

      {/* Display hackathons */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hackathons.map((hackathon) => (
          <HackathonCard
            key={hackathon.id}
            id={hackathon.id}
            title={hackathon.title}
            date={hackathon.date}
            location={hackathon.location}
            description={hackathon.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
