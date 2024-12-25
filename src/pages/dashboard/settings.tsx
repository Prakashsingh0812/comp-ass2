import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { updateUserProfile } from '../../utils/auth'; // Assuming you have a utility for updating user data

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.displayName || ''); // Use displayName instead of name
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = '/auth/signin';
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Update the user profile with the new data
      const updatedUser = await updateUserProfile({ name, email });
      // Optionally update the user context/state here
      console.log('User updated:', updatedUser);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout(); // Assuming logout function clears the authentication state
    window.location.href = '/auth/signin'; // Redirect to sign-in page after logout
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Account Settings</h1>

      <div className="mt-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          disabled
        />
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500'}`}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
