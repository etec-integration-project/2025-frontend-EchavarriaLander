import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [tvResults, setTvResults] = useState<any[]>([]);
  const [searchType, setSearchType] = useState<'movie' | 'tv'>('movie');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Buscar películas
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query || '')}&include_adult=false&language=es-ES&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const movieData = await movieRes.json();
        setMovieResults(movieData.results || []);
        // Buscar series
        const tvRes = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query || '')}&language=es-ES&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const tvData = await tvRes.json();
        setTvResults(tvData.results || []);
      } catch (err) {
        setError('Error al buscar películas y series');
      } finally {
        setLoading(false);
      }
    };
    if (query && query.length > 0) fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="pt-20 bg-piraflix min-h-screen text-piraflix-accent">
        <h1 className="text-2xl font-bold mb-6 px-4">Resultados para: <span className="text-piraflix-red">{query}</span></h1>
        {/* Tabs selector */}
        <div className="flex w-full mb-6 px-4">
          <button
            className={`flex-1 py-2 text-lg font-semibold rounded-tl-lg rounded-bl-lg transition-colors duration-200 ${searchType === 'movie' ? 'bg-piraflix-gold text-piraflix-black' : 'bg-piraflix-gray text-piraflix-accent hover:bg-piraflix-gold/60 hover:text-piraflix-black'}`}
            onClick={() => setSearchType('movie')}
          >
            Películas
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold rounded-tr-lg rounded-br-lg transition-colors duration-200 ${searchType === 'tv' ? 'bg-piraflix-gold text-piraflix-black' : 'bg-piraflix-gray text-piraflix-accent hover:bg-piraflix-gold/60 hover:text-piraflix-black'}`}
            onClick={() => setSearchType('tv')}
          >
            Series
          </button>
        </div>
        {loading ? (
          <div className="text-center text-piraflix-gold">Buscando...</div>
        ) : error ? (
          <div className="text-center text-piraflix-red">{error}</div>
        ) : (searchType === 'movie' ? movieResults.length === 0 : tvResults.length === 0) ? (
          <div className="text-center text-piraflix-gold">No se encontraron resultados.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {(searchType === 'movie' ? movieResults : tvResults).map((item: any) => (
              <MovieCard key={item.id} movie={{
                id: item.id,
                title: searchType === 'movie' ? item.title : item.name,
                image: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
                duration: item.runtime ? `${item.runtime} min` : '',
                rating: item.adult ? '18+' : '13+',
                year: searchType === 'movie'
                  ? (item.release_date ? parseInt(item.release_date?.split('-')[0]) : 0)
                  : (item.first_air_date ? parseInt(item.first_air_date?.split('-')[0]) : 0),
                genres: item.genre_ids || [],
                match: Math.floor((item.vote_average || 0) * 10),
                videoUrl: '',
                description: item.overview || '',
                seasons: item.number_of_seasons ? `${item.number_of_seasons} Temporadas` : '',
              }} onPlay={() => {}} type={searchType} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults; 