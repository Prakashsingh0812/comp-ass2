// components/Profile.tsx

import useAuth from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="mt-4">
        <p className="font-medium">Name: {user?.displayName}</p>
        <p className="font-medium">Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
