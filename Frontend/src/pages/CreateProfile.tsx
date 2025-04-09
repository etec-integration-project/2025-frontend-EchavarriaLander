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
    <div className="min-h-screen bg-black">
      <header className="px-4 md:px-16 py-6 border-b border-gray-800">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="h-8 md:h-12"
        />
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-3xl text-white mb-8">Agregar perfil</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
              className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isKids"
              checked={isKids}
              onChange={(e) => setIsKids(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isKids" className="text-white">Perfil para niños</label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
            >
              Continuar
            </button>
            <button
              type="button"
              onClick={() => navigate('/profiles')}
              className="px-8 py-2 text-gray-400 border border-gray-400 rounded hover:text-white hover:border-white transition"
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