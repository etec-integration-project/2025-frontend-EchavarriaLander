import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [tvResults, setTvResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length > 2) {
        setLoading(true);
        setError(null);
        try {
          // Buscar películas
          const movieRes = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=es-ES&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                accept: 'application/json',
              },
            }
          );
          const movieData = await movieRes.json();
          const movies = (movieData.results || []).map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            type: 'movie',
            image: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
          }));
          // Buscar series
          const tvRes = await fetch(
            `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(searchTerm)}&language=es-ES&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                accept: 'application/json',
              },
            }
          );
          const tvData = await tvRes.json();
          const tvs = (tvData.results || []).map((tv: any) => ({
            id: tv.id,
            title: tv.name,
            type: 'tv',
            image: tv.poster_path
              ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
              : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
          }));
          setMovieResults(movies);
          setTvResults(tvs);
        } catch (err) {
          setError('Error al buscar películas y series');
        } finally {
          setLoading(false);
        }
      } else {
        setMovieResults([]);
        setTvResults([]);
      }
    };
    fetchResults();
  }, [searchTerm]);

  const handleResultClick = (result: any) => {
    navigate(`/watch/${result.id}`, { state: { type: result.type } });
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-black/95 border-t border-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Títulos, personas, géneros"
            className="flex-1 bg-transparent border-none outline-none text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim().length > 0) {
                navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
                onClose();
              }
            }}
          />
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>
        {loading && <div className="text-gray-400">Buscando...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (movieResults.length > 0 || tvResults.length > 0) && (
          <div>
            {movieResults.length > 0 && (
              <>
                <div className="text-white text-lg font-bold mb-2 border-b border-gray-700 pb-1">Películas</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {movieResults.map((result) => (
                    <div
                      key={result.id}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleResultClick(result)}
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="rounded-md w-full object-cover mb-2"
                      />
                      <div className="text-white text-sm font-semibold truncate text-center">
                        {result.title}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {tvResults.length > 0 && (
              <>
                <div className="text-white text-lg font-bold mb-2 border-b border-gray-700 pb-1">Series</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tvResults.map((result) => (
                    <div
                      key={result.id}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleResultClick(result)}
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="rounded-md w-full object-cover mb-2"
                      />
                      <div className="text-white text-sm font-semibold truncate text-center">
                        {result.title}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;