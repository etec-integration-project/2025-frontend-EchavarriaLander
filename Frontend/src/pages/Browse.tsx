import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
  
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

      {/* Botón de Scroll Izquierda */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
        aria-label="Desplazar a la izquierda"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Contenedor de Películas con Referencia */}
      <div
        className="flex space-x-4 overflow-x-scroll scroll-smooth px-4 md:px-16 scrollbar-hide scrollbar-thumb-gray-600 scrollbar-track-transparent"
        ref={rowRef}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-[250px]">
            <MovieCard movie={movie} onPlay={onPlayMovie} />
          </div>
        ))}
      </div>

      {/* Botón de Scroll Derecha */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
        aria-label="Desplazar a la derecha"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const Browse = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Cada vez que cambie el perfil, actualizamos la key para forzar el re-render
    setKey(prev => prev + 1);
  }, [currentProfile]);

  const actionContent: Movie[] = [
    {
      id: 1,
      title: "John Wick",
      image: "/movies/john-wick.jpg",
      duration: "1h 41m",
      rating: "16+",
      year: 2014,
      genres: ["Acción", "Thriller"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 2,
      title: "Mad Max: Fury Road",
      image: "/movies/mad-max.jpg",
      duration: "2h",
      rating: "16+",
      year: 2015,
      genres: ["Acción", "Aventura"],
      match: 97,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 101,
      title: "The Mandalorian",
      image: "/shows/mandalorian.jpg",
      duration: "45m",
      rating: "13+",
      year: 2019,
      genres: ["Acción", "Ciencia ficción"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 102,
      title: "24",
      image: "/shows/24.jpg",
      duration: "45m",
      rating: "16+",
      year: 2001,
      genres: ["Acción", "Drama"],
      match: 94,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 103,
      title: "Daredevil",
      image: "/shows/daredevil.jpg",
      duration: "50m",
      rating: "16+",
      year: 2015,
      genres: ["Acción", "Crimen"],
      match: 96,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const comedyContent: Movie[] = [
    {
      id: 6,
      title: "Superbad",
      image: "/movies/superbad.jpg",
      duration: "1h 53m",
      rating: "16+",
      year: 2007,
      genres: ["Comedia"],
      match: 92,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 7,
      title: "The Hangover",
      image: "/movies/hangover.jpg",
      duration: "1h 40m",
      rating: "16+",
      year: 2009,
      genres: ["Comedia"],
      match: 93,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 106,
      title: "Friends",
      image: "/shows/friends.jpg",
      duration: "22m",
      rating: "13+",
      year: 1994,
      genres: ["Comedia", "Romance"],
      match: 96,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 107,
      title: "The Office (US)",
      image: "/shows/the-office.jpg",
      duration: "22m",
      rating: "13+",
      year: 2005,
      genres: ["Comedia"],
      match: 94,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 108,
      title: "Brooklyn Nine-Nine",
      image: "/shows/brooklyn99.jpg",
      duration: "22m",
      rating: "13+",
      year: 2013,
      genres: ["Comedia", "Crimen"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const dramaContent: Movie[] = [
    {
      id: 11,
      title: "The Shawshank Redemption",
      image: "/movies/shawshank.jpg",
      duration: "2h 22m",
      rating: "16+",
      year: 1994,
      genres: ["Drama"],
      match: 98,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 12,
      title: "The Godfather",
      image: "/movies/godfather.jpg",
      duration: "2h 55m",
      rating: "16+",
      year: 1972,
      genres: ["Drama", "Crimen"],
      match: 99,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 111,
      title: "Breaking Bad",
      image: "/shows/breaking-bad.jpg",
      duration: "50m",
      rating: "16+",
      year: 2008,
      genres: ["Drama", "Crimen"],
      match: 98,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 112,
      title: "The Crown",
      image: "/shows/crown.jpg",
      duration: "58m",
      rating: "16+",
      year: 2016,
      genres: ["Drama", "Historia"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 113,
      title: "The Handmaid's Tale",
      image: "/shows/handmaids-tale.jpg",
      duration: "50m",
      rating: "16+",
      year: 2017,
      genres: ["Drama", "Ciencia ficción"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const horrorContent: Movie[] = [
    {
      id: 16,
      title: "The Conjuring",
      image: "/movies/conjuring.jpg",
      duration: "1h 52m",
      rating: "16+",
      year: 2013,
      genres: ["Terror", "Suspenso"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 17,
      title: "Hereditary",
      image: "/movies/hereditary.jpg",
      duration: "2h 7m",
      rating: "16+",
      year: 2018,
      genres: ["Terror", "Drama"],
      match: 93,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 116,
      title: "American Horror Story",
      image: "/shows/ahs.jpg",
      duration: "45m",
      rating: "16+",
      year: 2011,
      genres: ["Terror", "Drama"],
      match: 94,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 117,
      title: "The Walking Dead",
      image: "/shows/walking-dead.jpg",
      duration: "45m",
      rating: "16+",
      year: 2010,
      genres: ["Terror", "Drama"],
      match: 92,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 118,
      title: "Stranger Things",
      image: "/shows/stranger-things.jpg",
      duration: "50m",
      rating: "16+",
      year: 2016,
      genres: ["Terror", "Ciencia ficción"],
      match: 96,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const scifiContent: Movie[] = [
    {
      id: 21,
      title: "Blade Runner 2049",
      image: "/movies/blade-runner.jpg",
      duration: "2h 44m",
      rating: "16+",
      year: 2017,
      genres: ["Ciencia ficción", "Drama"],
      match: 96,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 22,
      title: "Interstellar",
      image: "/movies/interstellar.jpg",
      duration: "2h 49m",
      rating: "13+",
      year: 2014,
      genres: ["Ciencia ficción", "Drama"],
      match: 97,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 121,
      title: "Black Mirror",
      image: "/shows/black-mirror.jpg",
      duration: "60m",
      rating: "16+",
      year: 2011,
      genres: ["Ciencia ficción", "Drama"],
      match: 96,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 122,
      title: "The Expanse",
      image: "/shows/expanse.jpg",
      duration: "45m",
      rating: "16+",
      year: 2015,
      genres: ["Ciencia ficción", "Drama"],
      match: 95,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 123,
      title: "Westworld",
      image: "/shows/westworld.jpg",
      duration: "60m",
      rating: "16+",
      year: 2016,
      genres: ["Ciencia ficción", "Drama"],
      match: 94,
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <Header showNav />
      <div key={key} className="pt-20 bg-black min-h-screen">
        {selectedMovie && (
          <VideoPlayer
            videoUrl={selectedMovie.videoUrl}
            title={selectedMovie.title}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        <HeroVideo
          title="Contenido destacado"
          description="Descubre las mejores películas y series en un solo lugar."
          onPlay={() => handlePlayMovie(actionContent[0])}
        />

        <div className="pt-4">
          <MovieRow title="Acción" movies={actionContent} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Comedia" movies={comedyContent} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Drama" movies={dramaContent} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Terror" movies={horrorContent} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Ciencia Ficción" movies={scifiContent} onPlayMovie={handlePlayMovie} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Browse;