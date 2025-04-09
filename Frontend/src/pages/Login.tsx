import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/profiles');
      }
    } catch (error: any) {
      console.error('Error de inicio de sesión:', error);
      setError(error.response?.data?.message || 'Credenciales inválidas');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/AR-es-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg')]">
      <div className="min-h-screen bg-black/60">
        <header className="px-4 md:px-16 py-6">
          <Link to="/">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-8 md:h-12"
            />
          </Link>
        </header>

        <main className="flex justify-center items-center px-4">
          <div className="bg-black/75 p-8 md:p-16 rounded w-full max-w-md">
            <h1 className="text-white text-3xl font-bold mb-8">Inicia sesión</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email o número de celular"
                  className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
              >
                Iniciar sesión
              </button>

              <div className="flex items-center justify-between text-gray-400">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Recuérdame
                </label>
                <a href="#" className="hover:underline">¿Olvidaste la contraseña?</a>
              </div>
            </form>

            <div className="mt-16 text-gray-400">
              <p>¿Primera vez en Netflix? <Link to="/" className="text-white hover:underline">Suscríbete ahora</Link></p>
              <p className="mt-4 text-sm">
                Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
