import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, updateProfile } = useProfile();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    is_kids: false,
    avatar_url: ''
  });

  useEffect(() => {
    const profile = profiles.find(p => p.id === Number(id));
    if (profile) {
      setFormData({
        name: profile.name,
        is_kids: profile.is_kids,
        avatar_url: profile.avatar_url
      });
    } else {
      navigate('/profiles');
    }
  }, [id, profiles, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(Number(id), formData);
      navigate('/profiles/manage');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating profile');
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
        <h1 className="text-3xl text-white mb-8">Editar perfil</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nombre"
              className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isKids"
              checked={formData.is_kids}
              onChange={(e) => setFormData({ ...formData, is_kids: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isKids" className="text-white">Perfil para niños</label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => navigate('/profiles/manage')}
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

export default EditProfile;