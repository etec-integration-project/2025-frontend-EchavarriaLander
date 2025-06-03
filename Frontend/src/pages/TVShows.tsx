import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const GENRES = [
  { name: 'Series de Acción', id: 10759 },
  { name: 'Comedias', id: 35 },
  { name: 'Dramas', id: 18 },
  { name: 'Terror', id: 9648 },
  { name: 'Ciencia Ficción', id: 10765 },
];

interface Show {
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
  seasons: string;
  tag?: string;
}

const ShowRow = ({
  title,
  shows,
  onPlayShow,
}: {
  title: string;
  shows: Show[];
  onPlayShow: (show: Show) => void;
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
        {shows.map((show, index) => (
          <div key={index} className="flex-none w-[250px]">
            <MovieCard movie={show} onPlay={onPlayShow} type="tv" />
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

const TVShows = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);
  const [showsByGenre, setShowsByGenre] = useState<{ [genre: string]: Show[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentProfile]);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const genreResults: { [genre: string]: Show[] } = {};
        // Obtener lista de géneros de TMDB para series
        const genreListRes = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=es-ES', {
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
            `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&sort_by=popularity.desc&language=es-ES&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                accept: 'application/json',
              },
            }
          );
          const data = await res.json();
          genreResults[genre.name] = (data.results || []).map((show: any) => ({
            id: show.id,
            title: show.name,
            image: show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
            duration: '',
            rating: show.adult ? '18+' : '13+',
            year: show.first_air_date ? parseInt(show.first_air_date.split('-')[0]) : 0,
            genres: (show.genre_ids || []).map((gid: number) => genreMap[gid]).filter((name: unknown): name is string => typeof name === 'string'),
            match: Math.floor((show.vote_average || 0) * 10),
            videoUrl: '',
            description: show.overview || '',
            seasons: show.number_of_seasons ? `${show.number_of_seasons} Temporadas` : '',
          }));
        }
        setShowsByGenre(genreResults);
      } catch (err) {
        setError('Error al cargar series de TMDB');
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  const handlePlayShow = (show: Show) => {
    setSelectedShow(show);
  };

  return (
    <div key={key} className="pt-20 bg-black min-h-screen">
      {selectedShow && (
        <VideoPlayer
          videoUrl={selectedShow.videoUrl}
          title={selectedShow.title}
          onClose={() => setSelectedShow(null)}
        />
      )}

      <HeroVideo
        title="Series destacadas"
        description="Descubre las mejores series en un solo lugar."
        onPlay={() => {}}
      />

      <div className="pt-8">
        {loading && <div className="text-gray-400 text-center">Cargando series...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && GENRES.map((genre) => (
          <ShowRow
            key={genre.id}
            title={genre.name}
            shows={showsByGenre[genre.name] || []}
            onPlayShow={handlePlayShow}
          />
        ))}
      </div>
    </div>
  );
};

export default TVShows;