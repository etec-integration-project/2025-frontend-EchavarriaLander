import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const CreateProfile = () => {
  const navigate = useNavigate();
  const { createProfile, loadProfiles } = useProfile();
  const [name, setName] = useState('');
  const [isKids, setIsKids] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!name.trim()) {
        setError('El nombre del perfil es requerido');
        return;
      }
      
      await createProfile({
        name,
        is_kids: isKids,
        avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
      });
      await loadProfiles(); // Agregar esta línea
      navigate('/profiles');
    } catch (error: any) {
      console.error('Error creating profile:', error);
      setError(error.response?.data?.message || 'Error al crear el perfil');
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

      <main className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-3xl text-piraflix-gold mb-8">Agregar perfil</h1>
        
        {error && (
          <div className="bg-piraflix-red/10 border border-piraflix-red text-piraflix-red px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              className="w-full px-4 py-3 rounded bg-piraflix-gray border border-piraflix-gold text-piraflix-accent placeholder-piraflix-gold focus:outline-none focus:border-piraflix-gold"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isKids"
              checked={isKids}
              onChange={(e) => setIsKids(e.target.checked)}
              className="mr-2 accent-piraflix-gold"
            />
            <label htmlFor="isKids" className="text-piraflix-accent">Perfil para niños</label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-2 bg-piraflix-gold text-piraflix-black rounded hover:bg-piraflix-red hover:text-piraflix-accent transition font-bold"
            >
              Continuar
            </button>
            <button
              type="button"
              onClick={() => navigate('/profiles')}
              className="px-8 py-2 text-piraflix-gold border border-piraflix-gold rounded hover:text-piraflix-black hover:bg-piraflix-gold transition font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProfile;