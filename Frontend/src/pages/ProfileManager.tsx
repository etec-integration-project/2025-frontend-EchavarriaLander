import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const ProfileManager = () => {
    const { profiles, deleteProfile, loadProfiles } = useProfile();
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        loadProfiles(); // Agregar esta línea
      }
    }, [navigate, loadProfiles]);

    // ... resto del código permanece igual
  
    const handleEditProfile = (profileId: number) => {
      navigate(`/profiles/edit/${profileId}`);
    };
  
    const handleDeleteProfile = async (profileId: number) => {
      if (window.confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
        try {
          await deleteProfile(profileId);
        } catch (error) {
          console.error('Error deleting profile:', error);
        }
      }
    };
  
    return (
      <div className="min-h-screen bg-black">
        <header className="px-4 md:px-16 py-6 border-b border-gray-800">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-8 md:h-12"
          />
        </header>
  
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl text-white mb-8">Administrar perfiles</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {profiles.map((profile) => (
              <div key={profile.id} className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-gray-600 group-hover:border-white transition duration-200">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleEditProfile(profile.id)}
                      className="bg-white/80 text-black px-4 py-2 rounded"
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <span className="mt-2 block text-center text-gray-400 group-hover:text-white">
                  {profile.name}
                </span>
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="mt-2 text-red-500 hover:text-red-400 text-sm w-full text-center"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
  
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/profiles')}
              className="px-8 py-2 text-gray-400 border border-gray-400 hover:text-white hover:border-white transition"
            >
              Listo
            </button>
          </div>
        </main>
      </div>
    );
  };

export default ProfileManager;