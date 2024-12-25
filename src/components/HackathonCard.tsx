import Link from "next/link";

interface HackathonCardProps {
  id: string;
  title: string;
  description: string;
  date: string; // This will remain a string initially
  location: string;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  id,
  title,
  description,
  date,
  location,
}) => {
  // Convert date string to a Date object
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  console.log('HackathonCard Props:', { id, title, description, date, location });

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-2xl font-semibold text-zinc-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-400">{formattedDate}</p> {/* Display formatted date */}
      <p className="text-sm text-gray-400">{location}</p> {/* Display location */}
      <Link href={`/hackathons/${id}`} className="text-blue-600 mt-2 inline-block">
        Learn More
      </Link>
    </div>
  );
};

export default HackathonCard;
