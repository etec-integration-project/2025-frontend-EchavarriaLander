import { Link } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import Navbar from './Navbar';

interface HeaderProps {
  showNav?: boolean;
  showSignIn?: boolean;
}

const Header = ({ showNav = false, showSignIn = false }: HeaderProps) => {
  const { currentProfile } = useProfile();

  return (
    <>
      {showNav && currentProfile ? (
        <Navbar />
      ) : (
        <header className="flex justify-between items-center px-4 md:px-16 py-6">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-8 md:h-12"
            />
          </Link>
          {showSignIn && (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </header>
      )}
    </>
  );
};

export default Header; 