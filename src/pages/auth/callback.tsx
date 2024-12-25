// pages/auth/callback.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const Callback: React.FC = () => {
  const { loginWithToken } = useAuth();  // Now using loginWithToken
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        // Use the loginWithToken method to authenticate with the token
        const user = await loginWithToken(token);

        if (user) {
          router.push('/dashboard');
        } else {
          router.push('/auth/signin');
        }
      } else {
        router.push('/auth/signin');
      }
    };

    handleCallback();
  }, [router, loginWithToken]);

  return (
    <div className="p-6">
      <h1>Processing authentication...</h1>
    </div>
  );
};

export default Callback;
