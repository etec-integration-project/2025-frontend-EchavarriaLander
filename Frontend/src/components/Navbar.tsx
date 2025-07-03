import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, X } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';
import ProfileMenu from './ProfileMenu';
import LogoutDialog from './LogoutDialog';
import { useProfile } from '../contexts/ProfileContext';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { currentProfile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    setIsLogoutDialogOpen(true);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-piraflix' : 'bg-gradient-to-b from-[var(--piraflix-black)] to-transparent'
      }`}>
        <div className="px-4 md:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/browse">
              <img 
                src="/assets/Piraflix_logo.png"
                alt="PiraFlix"
                className="h-10 md:h-14 drop-shadow-lg"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/browse" className="text-sm text-piraflix-gold hover:text-piraflix-red transition">Inicio</Link>
              <Link to="/tv-shows" className="text-sm text-piraflix-gold hover:text-piraflix-red transition">Series</Link>
              <Link to="/movies" className="text-sm text-piraflix-gold hover:text-piraflix-red transition">Películas</Link>
              <Link to="/popular" className="text-sm text-piraflix-gold hover:text-piraflix-red transition">Novedades populares</Link>
              <Link to="/likes" className="text-sm text-piraflix-gold hover:text-piraflix-red transition">Likes</Link>
              <Link to="/my-list" className="text-sm text-piraflix-gold hover:text-piraflix-red transition">Mi Lista</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className={`flex items-center ${
                isSearchOpen ? 'bg-black border border-white w-[250px]' : 'w-auto'
              } transition-all duration-300 rounded-sm overflow-hidden`}>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:text-gray-300"
                  aria-label="Buscar"
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
                {isSearchOpen && (
                  <div className="absolute left-0 top-full w-[350px] z-50">
                    <SearchModal onClose={() => setIsSearchOpen(false)} />
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <button 
                className="hover:text-gray-300"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>
              {isNotificationsOpen && <NotificationsPanel />}
            </div>

            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-gray-300"
                onMouseEnter={() => setIsProfileMenuOpen(true)}
              >
                <img
                  src={currentProfile?.avatar_url}
                  alt={currentProfile?.name}
                  className="w-8 h-8 rounded"
                />
                <ChevronDown className="w-4 h-4" />
              </button>
              <ProfileMenu 
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </nav>

      <LogoutDialog 
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
};

export default Navbar;