// utils/auth.ts

import { auth } from '../lib/firebase'; // Ensure correct import from firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Register user with email and password
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returning the user object from the created user credential
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`); // Detailed error message
    }
    throw new Error('An unknown error occurred during registration.');
  }
};

// Sign in user with email and password
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returning the user object from the signed-in user credential
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sign-in failed: ${error.message}`); // Detailed error message
    }
    throw new Error('An unknown error occurred during sign-in.');
  }
};

// Update user profile (name, etc.)
export const updateUserProfile = async (profileData: { name: string; email: string }) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user found');
    }

    // Update the user's display name using Firebase's updateProfile
    await updateProfile(auth.currentUser, {
      displayName: profileData.name,
    });

    // Optionally, you could also update the email or other fields
    // if (profileData.email !== auth.currentUser.email) {
    //   await updateEmail(auth.currentUser, profileData.email);
    // }

    return auth.currentUser; // Returning the updated user object
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
    throw new Error('An unknown error occurred while updating the profile.');
  }
};
