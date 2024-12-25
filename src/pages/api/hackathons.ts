// src/pages/api/hackathons.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (only once)
if (getApps().length === 0) {
  initializeApp();
}

const db = getFirestore(); // Use the Admin SDK's Firestore instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request to fetch all hackathons
  if (req.method === 'GET') {
    try {
      const snapshot = await db.collection('hackathons').get();
      const hackathons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(hackathons); // Return all hackathons
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Failed to fetch hackathons', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to fetch hackathons', error: 'Unknown error occurred' });
      }
    }
  }

  // Handle POST request to create a new hackathon
  else if (req.method === 'POST') {
    try {
      // Access Firestore and create the new hackathon
      const newHackathonRef = await db.collection('hackathons').add({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        // No authentication involved
      });

      const newHackathon = { id: newHackathonRef.id, ...req.body };
      res.status(201).json(newHackathon); // Return the created hackathon
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Failed to create hackathon', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to create hackathon', error: 'Unknown error occurred' });
      }
    }
  }

  // If the method is not GET or POST, return 405 Method Not Allowed
  else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
