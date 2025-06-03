import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query || '')}&include_adult=false&language=es-ES&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError('Error al buscar películas');
      } finally {
        setLoading(false);
      }
    };
    if (query && query.length > 0) fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="pt-20 bg-black min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6 px-4">Resultados para: <span className="text-red-500">{query}</span></h1>
        {loading ? (
          <div className="text-center text-gray-400">Buscando...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-400">No se encontraron resultados.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={{
                id: movie.id,
                title: movie.title,
                image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
                duration: movie.runtime ? `${movie.runtime} min` : '',
                rating: movie.adult ? '18+' : '13+',
                year: movie.release_date ? parseInt(movie.release_date?.split('-')[0]) : 0,
                genres: movie.genre_ids || [],
                match: Math.floor((movie.vote_average || 0) * 10),
                videoUrl: '',
                description: movie.overview || '',
                seasons: '',
              }} onPlay={() => {}} type={'movie'} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults; 