import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate('/signup', { state: { email } });
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/AR-es-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <Header showSignIn />

        <main className="flex flex-col items-center text-center text-white px-4 py-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Películas y series ilimitadas y mucho más
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            A partir de $ 4.299. Cancela cuando quieras.
          </p>
          <p className="text-lg md:text-xl mb-6">
            ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o
            reiniciar tu membresía de Netflix.
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col md:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded text-2xl hover:bg-red-700 transition whitespace-nowrap"
            >
              Comenzar &gt;
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Home;
