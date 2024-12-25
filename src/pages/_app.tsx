import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext'; // Use named import
import '../styles/globals.css'; // Import your global styles

// Import Navbar and Footer components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MyApp;
