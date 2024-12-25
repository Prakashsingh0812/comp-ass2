// utils/hackathon.ts
import { db } from '../lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Import the Timestamp type

interface Hackathon {
  id: string;
  name: string;
  date: string;  // Date is now a string after formatting
  location: string;
  description: string;
}

// Helper function to format Timestamp to string
const formatDate = (timestamp: Timestamp): string => {
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();  // Converts to JavaScript Date object
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });  // Human-readable format
  }
  return '';  // Return empty string if not a Timestamp
};

// Fetch all hackathons
export const fetchHackathons = async (): Promise<Hackathon[]> => {
  try {
    const hackathonsCol = collection(db, 'hackathons');
    const hackathonsSnapshot = await getDocs(hackathonsCol);

    console.log('Fetched hackathons snapshot:', hackathonsSnapshot);  // Log snapshot for debugging

    if (hackathonsSnapshot.empty) {
      console.log('No hackathons found');
    }

    const hackathonsList: Hackathon[] = hackathonsSnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log('Document data:', data);  // Log each document's data

      return {
        id: doc.id,
        name: data.name,
        date: data.date instanceof Timestamp ? formatDate(data.date) : data.date,
        location: data.location,
        description: data.description,
      };
    });

    console.log('Mapped hackathons:', hackathonsList);  // Log final hackathon list

    return hackathonsList;
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return [];  // Consider handling errors more gracefully (maybe fallback data)
  }
};

// Fetch a single hackathon by ID
export const fetchHackathonById = async (id: string): Promise<Hackathon | null> => {
  try {
    const hackathonRef = doc(db, 'hackathons', id);
    const hackathonSnapshot = await getDoc(hackathonRef);

    if (hackathonSnapshot.exists()) {
      const data = hackathonSnapshot.data();
      return {
        id: hackathonSnapshot.id, // Include the document ID
        name: data.name,
        date: data.date instanceof Timestamp ? formatDate(data.date) : data.date,  // Format date if it's a Timestamp
        location: data.location,
        description: data.description,
      };
    } else {
      console.warn(`Hackathon with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching hackathon by ID:', error);
    return null;  // Consider handling errors more gracefully
  }
};
