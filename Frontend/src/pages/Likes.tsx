import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const Likes = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked = async () => {
      setLoading(true);
      const ids = JSON.parse(localStorage.getItem('likedMovies') || '[]');
      const results: any[] = [];
      for (const id of ids) {
        // Probar primero como película, si no existe probar como serie
        let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, {
          headers: { Authorization: `Bearer ${TMDB_TOKEN}` }
        });
        let data = await res.json();
        if (data && !data.status_code) {
          results.push({ ...data, type: 'movie' });
          continue;
        }
        res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, {
          headers: { Authorization: `Bearer ${TMDB_TOKEN}` }
        });
        data = await res.json();
        if (data && !data.status_code) {
          results.push({ ...data, type: 'tv' });
        }
      }
      setMovies(results);
      setLoading(false);
    };
    fetchLiked();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-20 bg-black min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6 px-4">Tus Likes</h1>
        {loading ? (
          <div className="text-center text-gray-400">Cargando...</div>
        ) : movies.length === 0 ? (
          <div className="text-center text-gray-400">No tienes likes aún.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={{
                id: movie.id,
                title: movie.title || movie.name,
                image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
                duration: movie.runtime ? `${movie.runtime} min` : '',
                rating: movie.adult ? '18+' : '13+',
                year: movie.release_date ? parseInt(movie.release_date?.split('-')[0]) : (movie.first_air_date ? parseInt(movie.first_air_date?.split('-')[0]) : 0),
                genres: movie.genres ? movie.genres.map((g: any) => g.name) : [],
                match: Math.floor((movie.vote_average || 0) * 10),
                videoUrl: '',
                description: movie.overview || '',
                seasons: movie.number_of_seasons ? `${movie.number_of_seasons} Temporadas` : '',
              }} onPlay={() => {}} type={movie.type} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Likes; 