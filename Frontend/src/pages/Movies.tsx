import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const GENRES = [
  { name: 'Acción', id: 28 },
  { name: 'Comedia', id: 35 },
  { name: 'Drama', id: 18 },
  { name: 'Terror', id: 27 },
  { name: 'Ciencia Ficción', id: 878 },
];

interface Movie {
  id: number;
  title: string;
  image: string;
  duration: string;
  rating: string;
  year: number;
  genres: string[];
  match: number;
  videoUrl: string;
  description: string;
}

const MovieRow = ({
  title,
  movies,
  onPlayMovie,
}: {
  title: string;
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-xl font-semibold mb-4 px-4 md:px-16">{title}</h2>

      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/75 text-white p-2 rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-scroll scroll-smooth px-4 md:px-16 scrollbar-hide"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-[250px]">
            <MovieCard movie={movie} onPlay={onPlayMovie} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/75 text-white p-2 rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const Movies = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);
  const [moviesByGenre, setMoviesByGenre] = useState<{ [genre: string]: Movie[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentProfile]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const genreResults: { [genre: string]: Movie[] } = {};
        // Obtener lista de géneros de TMDB
        const genreListRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es-ES', {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: 'application/json',
          },
        });
        const genreListData = await genreListRes.json();
        type Genre = { id: number; name: string };
        const genreMap: Record<number, string> = {};
        (genreListData.genres as Genre[] || []).forEach((g) => { genreMap[g.id] = g.name; });
        for (const genre of GENRES) {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=es-ES&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                accept: 'application/json',
              },
            }
          );
          const data = await res.json();
          genreResults[genre.name] = (data.results || []).map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
            duration: '',
            rating: movie.adult ? '18+' : '13+',
            year: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : 0,
            genres: (movie.genre_ids || []).map((gid: number) => genreMap[gid]).filter((name: unknown): name is string => typeof name === 'string'),
            match: Math.floor((movie.vote_average || 0) * 10),
            videoUrl: '',
            description: movie.overview || '',
          }));
        }
        setMoviesByGenre(genreResults);
      } catch (err) {
        setError('Error al cargar películas de TMDB');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div key={key} className="pt-20 bg-black min-h-screen">
      {selectedMovie && (
        <VideoPlayer
          videoUrl={selectedMovie.videoUrl}
          title={selectedMovie.title}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <HeroVideo
        title="Películas destacadas"
        description="Descubre las mejores películas en un solo lugar."
        onPlay={() => {}}
      />

      <div className="pt-8">
        {loading && <div className="text-gray-400 text-center">Cargando películas...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && GENRES.map((genre) => (
          <MovieRow
            key={genre.id}
            title={genre.name}
            movies={moviesByGenre[genre.name] || []}
            onPlayMovie={handlePlayMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;