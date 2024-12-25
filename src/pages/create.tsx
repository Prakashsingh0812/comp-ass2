import { useState } from 'react';
import { useRouter } from 'next/router';
import HackathonForm from '../components/HackathonForm';

// Define Hackathon type
interface Hackathon {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const CreateHackathon: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  const addNewHackathon = (newHackathon: Hackathon) => {
    setHackathons((prevHackathons) => [...prevHackathons, newHackathon]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Create a New Hackathon</h1>
      <HackathonForm addNewHackathon={addNewHackathon} />
    </div>
  );
};

export default CreateHackathon;
