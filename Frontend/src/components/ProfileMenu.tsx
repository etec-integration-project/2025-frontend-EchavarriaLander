import React from 'react';
import { PenLine, FileDown, User, HelpCircle } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onClose, onLogout }) => {
  const { profiles, currentProfile, setCurrentProfile } = useProfile();
  const navigate = useNavigate();
  
  const handleProfileChange = async (profile: typeof profiles[0]) => {
    await setCurrentProfile(profile);
    onClose();
    window.dispatchEvent(new Event('storage'));
  };

  if (!isOpen || !currentProfile) return null;

  return (
    <div 
      className="absolute top-full right-0 mt-2 w-56 bg-black/95 border border-gray-700 rounded-md shadow-lg overflow-hidden"
      onMouseLeave={onClose}
    >
      <div className="py-2">
        {profiles.map((profile) => (
          <div 
            key={profile.id}
            className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer flex items-center gap-3"
            onClick={() => handleProfileChange(profile)}
          >
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-7 h-7 rounded"
            />
            <span className={profile.id === currentProfile.id ? 'text-white' : 'text-gray-400'}>
              {profile.name}
            </span>
          </div>
        ))}
        
        <div className="border-t border-gray-700 my-2" />
        <div 
          onClick={() => navigate('/profiles/manage')}
          className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer flex items-center gap-3"
        >
          <PenLine className="w-5 h-5" />
          <span>Administrar perfiles</span>
        </div>
        <div className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer flex items-center gap-3">
          <FileDown className="w-5 h-5" />
          <span>Transferir perfil</span>
        </div>
        <div className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer flex items-center gap-3">
          <User className="w-5 h-5" />
          <span>Cuenta</span>
        </div>
        <div className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer flex items-center gap-3">
          <HelpCircle className="w-5 h-5" />
          <span>Centro de ayuda</span>
        </div>
        <div className="border-t border-gray-700 my-2" />
        <div 
          className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer"
          onClick={onLogout}
        >
          Cerrar sesión en Netflix
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;