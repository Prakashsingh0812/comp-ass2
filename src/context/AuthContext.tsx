import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCustomToken } from 'firebase/auth';

// Context Type Definition
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void; // Renamed from `signOut` to `logout`
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string) => Promise<User | null>;
  loginWithToken: (token: string) => Promise<User | null>; // New method for token-based login
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const logout = async () => { // Renamed `signOut` to `logout`
    try {
      await auth.signOut();
      setUser(null); // Ensure the user state is reset upon logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Login method (sign in with email/password)
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  };

  // Register method (sign up with email/password)
  const register = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Registration failed:', error);
      return null;
    }
  };

  // Login method (sign in with token)
  const loginWithToken = async (token: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithCustomToken(auth, token);
      return userCredential.user;
    } catch (error) {
      console.error('Token login failed:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, register, loginWithToken }}> {/* Updated `signOut` to `logout` */}
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export Context
export { AuthContext };
