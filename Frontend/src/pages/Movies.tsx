import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';

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

  useEffect(() => {
    // Cada vez que cambie el perfil, actualizamos la key para forzar el re-render
    setKey(prev => prev + 1);
  }, [currentProfile]);

  const actionMovies: Movie[] = [
    {
      id: 1,
      title: "John Wick",
      image: "/movies/john-wick.jpg",
      duration: "1h 41m",
      rating: "16+",
      year: 2014,
      genres: ["Acción", "Thriller"],
      match: 95,
      description: "Un exasesino a sueldo busca vengar la muerte de su perro, un regalo de su esposa fallecida.",
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
      description: "En un mundo posapocalíptico, un fugitivo y una guerrera rebelde luchan contra un tirano por la libertad.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 3,
      title: "Gladiator",
      image: "/movies/gladiator.jpg",
      duration: "2h 35m",
      rating: "16+",
      year: 2000,
      genres: ["Acción", "Drama", "Historia"],
      match: 96,
      description: "Un general romano traicionado busca vengar la muerte de su familia como gladiador.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 4,
      title: "The Dark Knight",
      image: "/movies/dark-knight.jpg",
      duration: "2h 32m",
      rating: "13+",
      year: 2008,
      genres: ["Acción", "Drama", "Crimen"],
      match: 98,
      description: "Batman enfrenta al Joker, un villano caótico que desestabiliza Ciudad Gótica.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 5,
      title: "Taken",
      image: "/movies/taken.jpg",
      duration: "1h 30m",
      rating: "13+",
      year: 2008,
      genres: ["Acción", "Thriller"],
      match: 94,
      description: "Un exagente de la CIA rastrea a su hija secuestrada en Europa.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const comedyMovies: Movie[] = [
    {
      id: 6,
      title: "Superbad",
      image: "/movies/superbad.jpg",
      duration: "1h 53m",
      rating: "16+",
      year: 2007,
      genres: ["Comedia"],
      match: 92,
      description: "Dos adolescentes intentan conseguir alcohol para una fiesta y viven un sinfín de aventuras hilarantes.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 7,
      title: "Dumb and Dumber",
      image: "/movies/dumb-and-dumber.jpg",
      duration: "1h 47m",
      rating: "13+",
      year: 1994,
      genres: ["Comedia"],
      match: 91,
      description: "Dos amigos increíblemente torpes se embarcan en un viaje para devolver un maletín perdido.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 8,
      title: "The Hangover",
      image: "/movies/hangover.jpg",
      duration: "1h 40m",
      rating: "16+",
      year: 2009,
      genres: ["Comedia"],
      match: 93,
      description: "Tres amigos despiertan tras una loca despedida de soltero sin recordar nada y buscan al novio perdido.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 9,
      title: "Mean Girls",
      image: "/movies/mean-girls.jpg",
      duration: "1h 37m",
      rating: "13+",
      year: 2004,
      genres: ["Comedia"],
      match: 94,
      description: "Una adolescente nueva se enfrenta al mundo feroz de las 'chicas populares' en su instituto.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 10,
      title: "Napoleon Dynamite",
      image: "/movies/napoleon-dynamite.jpg",
      duration: "1h 36m",
      rating: "13+",
      year: 2004,
      genres: ["Comedia"],
      match: 90,
      description: "Un joven excéntrico ayuda a su amigo a ganar la presidencia del consejo estudiantil.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const dramaMovies: Movie[] = [
    {
      id: 11,
      title: "Forrest Gump",
      image: "/movies/forrest-gump.jpg",
      duration: "2h 22m",
      rating: "13+",
      year: 1994,
      genres: ["Drama", "Romance"],
      match: 98,
      description: "La vida extraordinaria de un hombre simple que se cruza con momentos históricos icónicos.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 12,
      title: "The Pursuit of Happyness",
      image: "/movies/pursuit-of-happyness.jpg",
      duration: "1h 57m",
      rating: "13+",
      year: 2006,
      genres: ["Drama", "Biografía"],
      match: 95,
      description: "Un hombre lucha por superar la pobreza mientras cuida de su hijo pequeño.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 13,
      title: "The Shawshank Redemption",
      image: "/movies/shawshank-redemption.jpg",
      duration: "2h 22m",
      rating: "16+",
      year: 1994,
      genres: ["Drama", "Crimen"],
      match: 99,
      description: "Dos presos forjan una amistad en una cárcel mientras planean su libertad.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 14,
      title: "A Star is Born",
      image: "/movies/a-star-is-born.jpg",
      duration: "2h 16m",
      rating: "16+",
      year: 2018,
      genres: ["Drama", "Romance", "Música"],
      match: 94,
      description: "Una joven cantante asciende a la fama mientras su mentor lidia con sus propios demonios.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 15,
      title: "12 Years a Slave",
      image: "/movies/12-years-a-slave.jpg",
      duration: "2h 14m",
      rating: "16+",
      year: 2013,
      genres: ["Drama", "Historia", "Biografía"],
      match: 96,
      description: "La historia real de un hombre libre capturado y vendido como esclavo en el siglo XIX.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const horrorMovies: Movie[] = [
    {
      id: 16,
      title: "The Conjuring",
      image: "/movies/conjuring.jpg",
      duration: "1h 52m",
      rating: "16+",
      year: 2013,
      genres: ["Terror", "Suspenso"],
      match: 95,
      description: "Una familia busca la ayuda de investigadores paranormales para enfrentar una entidad maligna.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 17,
      title: "Hereditary",
      image: "/movies/hereditary.jpg",
      duration: "2h 7m",
      rating: "16+",
      year: 2018,
      genres: ["Terror", "Drama", "Misterio"],
      match: 93,
      description: "Una familia enfrenta secretos oscuros y eventos aterradores tras la muerte de su abuela.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 18,
      title: "It",
      image: "/movies/it.jpg",
      duration: "2h 15m",
      rating: "16+",
      year: 2017,
      genres: ["Terror", "Aventura"],
      match: 94,
      description: "Un grupo de niños enfrenta a un payaso demoníaco que acecha su pueblo.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 19,
      title: "A Quiet Place",
      image: "/movies/quiet-place.jpg",
      duration: "1h 30m",
      rating: "13+",
      year: 2018,
      genres: ["Terror", "Ciencia ficción"],
      match: 96,
      description: "Una familia sobrevive en un mundo donde criaturas cazan por el sonido.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 20,
      title: "The Exorcist",
      image: "/movies/exorcist.jpg",
      duration: "2h 12m",
      rating: "16+",
      year: 1973,
      genres: ["Terror", "Sobrenatural"],
      match: 92,
      description: "Un sacerdote lucha contra una poderosa posesión demoníaca en una niña.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

  const scifiMovies: Movie[] = [
    {
      id: 21,
      title: "Blade Runner 2049",
      image: "/movies/blade-runner.jpg",
      duration: "2h 44m",
      rating: "16+",
      year: 2017,
      genres: ["Ciencia ficción", "Drama"],
      match: 96,
      description: "Un 'blade runner' descubre un secreto que podría cambiar la sociedad para siempre.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 22,
      title: "Interstellar",
      image: "/movies/interstellar.jpg",
      duration: "2h 49m",
      rating: "13+",
      year: 2014,
      genres: ["Ciencia ficción", "Aventura", "Drama"],
      match: 97,
      description: "Un grupo de astronautas busca un nuevo hogar para la humanidad más allá de las estrellas.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 23,
      title: "The Matrix",
      image: "/movies/matrix.jpg",
      duration: "2h 16m",
      rating: "16+",
      year: 1999,
      genres: ["Ciencia ficción", "Acción"],
      match: 98,
      description: "Un hacker descubre la verdad detrás de la realidad y lidera una rebelión contra las máquinas.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 24,
      title: "Arrival",
      image: "/movies/arrival.jpg",
      duration: "1h 56m",
      rating: "13+",
      year: 2016,
      genres: ["Ciencia ficción", "Drama", "Misterio"],
      match: 94,
      description: "Una lingüista trata de comunicarse con alienígenas para evitar un conflicto global.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 25,
      title: "Inception",
      image: "/movies/inception.jpg",
      duration: "2h 28m",
      rating: "13+",
      year: 2010,
      genres: ["Ciencia ficción", "Acción", "Thriller"],
      match: 97,
      description: "Un ladrón de sueños acepta una misión para plantar una idea en la mente de un magnate.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

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
        title="Spider-Man"
        description="¡Spider-Man vuelve a la gran pantalla! Prepárate para una nueva aventura épica con tu amigable vecino."
        onPlay={() => handlePlayMovie(actionMovies[0])}
      />

      <div className="pt-8">
        <MovieRow title="Acción" movies={actionMovies} onPlayMovie={handlePlayMovie} />
        <MovieRow title="Comedia" movies={comedyMovies} onPlayMovie={handlePlayMovie} />
        <MovieRow title="Drama" movies={dramaMovies} onPlayMovie={handlePlayMovie} />
        <MovieRow title="Terror" movies={horrorMovies} onPlayMovie={handlePlayMovie} />
        <MovieRow title="Ciencia Ficción" movies={scifiMovies} onPlayMovie={handlePlayMovie} />
      </div>
    </div>
  );
};

export default Movies;