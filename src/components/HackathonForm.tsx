import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import firebase from 'firebase/app'; // Import Firebase for token management

// Define Hackathon type
interface Hackathon {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface HackathonFormProps {
  addNewHackathon: (newHackathon: Hackathon) => void;
}

const HackathonForm: React.FC<HackathonFormProps> = ({ addNewHackathon }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [userToken, setUserToken] = useState<string | null>(null); // To store the user ID token
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated and get the ID token
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Get Firebase ID token for the logged-in user
      user.getIdToken().then((token) => {
        setUserToken(token); // Store the token
      }).catch((error) => {
        console.error('Error fetching ID token:', error);
      });
    } else {
      console.error('User is not authenticated');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userToken) {
      console.error('User is not authenticated');
      return;
    }

    // Prepare hackathon data
    const hackathonData = { title, description, date, location };

    // Make the API request to create a new hackathon
    const response = await fetch('/api/hackathons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`, // Send the ID token in the Authorization header
      },
      body: JSON.stringify(hackathonData),
    });

    if (response.ok) {
      const newHackathon: Hackathon = await response.json();
      console.log('Hackathon Created:', newHackathon);
      addNewHackathon(newHackathon); // Update the dashboard with new hackathon
      router.push('/dashboard'); // Redirect to dashboard after creating
    } else {
      const error = await response.json();
      console.error('Failed to create hackathon:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium ">Hackathon Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium ">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium \">Event Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium ">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 p-2 w-full border rounded text-black"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">Create Hackathon</button>
    </form>
  );
};

export default HackathonForm;
