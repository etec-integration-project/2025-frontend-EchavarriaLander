import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { Plus } from 'lucide-react';

const Profiles = () => {
  const { profiles, setCurrentProfile, loadProfiles } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadProfiles();
    } else {
      navigate('/login');
    }
  }, [loadProfiles, navigate]);


  const handleProfileSelect = async (profile: Profile) => {
    setCurrentProfile(profile);
    navigate('/browse');
  };

  const handleCreateProfile = () => {
    navigate('/profiles/new');
  };

  const handleManageProfiles = () => {
    navigate('/profiles/manage');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl text-white mb-8">¿Quién está viendo ahora?</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleProfileSelect(profile)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition duration-200">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-gray-400 group-hover:text-white transition duration-200">
                {profile.name}
              </span>
              {profile.is_kids && (
                <span className="mt-1 text-sm text-blue-400">Kids</span>
              )}
            </div>
          ))}
          

          {profiles.length < 5 && (
            <div
              onClick={handleCreateProfile}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-gray-600 group-hover:border-white transition duration-200 flex items-center justify-center">
                <Plus className="w-12 h-12 text-gray-600 group-hover:text-white" />
              </div>
              <span className="mt-2 text-gray-400 group-hover:text-white transition duration-200">
                Agregar perfil
              </span>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleManageProfiles}
          className="mt-8 px-8 py-2 text-gray-400 border border-gray-400 hover:text-white hover:border-white transition duration-200"
        >
          Administrar perfiles
        </button>
      </div>
    </div>
  );
};

export default Profiles;