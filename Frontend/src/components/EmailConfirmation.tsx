import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useState } from 'react';

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Enviando datos:', { email, password });
      
      const response = await axiosInstance.post('/users/register', {
        name: email.split('@')[0],
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/signup/planform');
      }
    } catch (error: any) {
      console.error('Error completo:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      setError(error.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 md:px-16 py-6 border-b">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-8 md:h-12"
          />
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        <div>
          <p className="text-xs text-black mb-2">PASO 1 DE 3</p>
          <h1 className="text-3xl font-medium text-black mb-4">¡Hola de nuevo!</h1>
          <h2 className="text-xl text-black mb-4">Suscribirte a Netflix es fácil.</h2>
          <p className="text-lg text-black mb-4">Ingresa tu contraseña para comenzar a ver al instante.</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-300 text-gray-700"
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-3 rounded bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition"
            >
              Siguiente
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EmailConfirmation; 