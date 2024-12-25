import Link from 'next/link';
import useAuth from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth(); // Using `logout` here instead of `signOut`

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div>
        {/* Correct usage of Link without an <a> tag inside it */}
        <Link href="/" className="text-2xl font-bold">Hackathon Hub</Link>
      </div>
      <div className="space-x-4">
        {/* Corrected: No <a> tag inside Link */}
        <Link href="/" className="text-white">Home</Link>
        <Link href="/hackathons" className="text-white">Hackathons</Link>
        
        {/* Show "Create Hackathon" link only if the user is logged in */}
        {user && (
          <Link href="/create" className="text-white">
            Create Hackathon
          </Link>
        )}

        {/* Conditionally render "Sign Up" or "Sign In" based on user status */}
        {!user ? (
          <>
            <Link href="/auth/signup" className="text-white">Sign Up</Link>
            <Link href="/auth/signin" className="text-white">Sign In</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-white">Dashboard</Link>
            <button onClick={logout} className="bg-red-600 p-2 rounded">Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
