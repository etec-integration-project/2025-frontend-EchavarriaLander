import { useEffect } from 'react';
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
      <div className="min-h-screen bg-piraflix">
        <header className="px-4 md:px-16 py-6 border-b border-piraflix-gold bg-piraflix">
          <img
            src="/assets/piraflix-logo.png"
            alt="PiraFlix"
            className="h-8 md:h-12"
          />
        </header>
  
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl text-piraflix-gold mb-8">Administrar perfiles</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {profiles.map((profile) => (
              <div key={profile.id} className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-piraflix-gold group-hover:border-piraflix-gold transition duration-200">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleEditProfile(profile.id)}
                      className="bg-piraflix-gold/80 text-piraflix-black px-4 py-2 rounded font-bold hover:bg-piraflix-red hover:text-piraflix-accent transition"
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <span className="mt-2 block text-center text-piraflix-accent group-hover:text-piraflix-gold">
                  {profile.name}
                </span>
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="mt-2 text-piraflix-red hover:text-piraflix-gold text-sm w-full text-center font-bold"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
  
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/profiles')}
              className="px-8 py-2 text-piraflix-gold border border-piraflix-gold rounded hover:text-piraflix-black hover:bg-piraflix-gold transition font-bold"
            >
              Listo
            </button>
          </div>
        </main>
      </div>
    );
  };

export default ProfileManager;