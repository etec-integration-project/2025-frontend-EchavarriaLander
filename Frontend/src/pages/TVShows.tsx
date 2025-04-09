import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';

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
            <MovieCard movie={show} onPlay={onPlayShow} />
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

  useEffect(() => {
    // Cada vez que cambie el perfil, actualizamos la key para forzar el re-render
    setKey(prev => prev + 1);
  }, [currentProfile]);

  const actionShows: Show[] = [
    {
      id: 1,
      title: "The Mandalorian",
      image: "/shows/mandalorian.jpg",
      duration: "45m",
      rating: "13+",
      year: 2019,
      genres: ["Acción", "Ciencia ficción", "Aventura"],
      match: 95,
      description: "Un cazarrecompensas se aventura en la galaxia mientras protege a un misterioso niño.",
      seasons: "3 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 2,
      title: "Breaking Bad",
      image: "/shows/breaking-bad.jpg",
      duration: "50m",
      rating: "16+",
      year: 2008,
      genres: ["Drama", "Crimen", "Thriller"],
      match: 98,
      description: "Un profesor de química se convierte en un fabricante de metanfetaminas para asegurar el futuro de su familia.",
      seasons: "5 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 3,
      title: "24",
      image: "/shows/24.jpg",
      duration: "45m",
      rating: "16+",
      year: 2001,
      genres: ["Acción", "Drama", "Thriller"],
      match: 94,
      description: "El agente Jack Bauer enfrenta amenazas terroristas en tiempo real, una hora por episodio.",
      seasons: "9 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 4,
      title: "Daredevil",
      image: "/shows/daredevil.jpg",
      duration: "50m",
      rating: "16+",
      year: 2015,
      genres: ["Acción", "Crimen", "Drama"],
      match: 96,
      description: "Un abogado ciego combate el crimen por la noche como el vigilante Daredevil.",
      seasons: "3 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 5,
      title: "Vikings",
      image: "/shows/vikings.jpg",
      duration: "45m",
      rating: "16+",
      year: 2013,
      genres: ["Acción", "Drama", "Historia"],
      match: 95,
      description: "Sigue las aventuras del legendario Ragnar Lothbrok y sus conquistas vikingas.",
      seasons: "6 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];
  
  const comedyShows: Show[] = [
    {
      id: 6,
      title: "Friends",
      image: "/shows/friends.jpg",
      duration: "22m",
      rating: "13+",
      year: 1994,
      genres: ["Comedia", "Romance"],
      match: 96,
      description: "Un grupo de amigos navega por la vida, el amor y el trabajo en Nueva York.",
      seasons: "10 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 7,
      title: "The Office (US)",
      image: "/shows/the-office.jpg",
      duration: "22m",
      rating: "13+",
      year: 2005,
      genres: ["Comedia"],
      match: 94,
      description: "Las hilarantes vidas de los empleados de una oficina en Scranton, Pensilvania.",
      seasons: "9 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 8,
      title: "Brooklyn Nine-Nine",
      image: "/shows/brooklyn-99.jpg",
      duration: "22m",
      rating: "13+",
      year: 2013,
      genres: ["Comedia", "Crimen"],
      match: 95,
      description: "Detectives de una comisaría de Nueva York resuelven casos mientras enfrentan situaciones cómicas.",
      seasons: "8 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 9,
      title: "Parks and Recreation",
      image: "/shows/parks-and-rec.jpg",
      duration: "22m",
      rating: "13+",
      year: 2009,
      genres: ["Comedia"],
      match: 93,
      description: "Los empleados del departamento de parques de una pequeña ciudad trabajan juntos en medio de absurdos desafíos.",
      seasons: "7 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 10,
      title: "How I Met Your Mother",
      image: "/shows/himym.jpg",
      duration: "22m",
      rating: "13+",
      year: 2005,
      genres: ["Comedia", "Romance"],
      match: 92,
      description: "Un hombre cuenta a sus hijos cómo conoció a su madre a través de anécdotas divertidas y emotivas.",
      seasons: "9 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];
  
  const dramaShows: Show[] = [
    {
      id: 11,
      title: "The Crown",
      image: "/shows/the-crown.jpg",
      duration: "60m",
      rating: "16+",
      year: 2016,
      genres: ["Drama", "Historia"],
      match: 97,
      description: "La vida de la Reina Isabel II y los eventos históricos que marcaron su reinado.",
      seasons: "6 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 12,
      title: "The Sopranos",
      image: "/shows/sopranos.jpg",
      duration: "60m",
      rating: "16+",
      year: 1999,
      genres: ["Drama", "Crimen"],
      match: 98,
      description: "Un mafioso italoamericano equilibra su vida familiar y sus actividades criminales.",
      seasons: "6 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 13,
      title: "Game of Thrones",
      image: "/shows/got.jpg",
      duration: "60m",
      rating: "16+",
      year: 2011,
      genres: ["Drama", "Fantasía"],
      match: 99,
      description: "Casas nobles luchan por el control del Trono de Hierro en un mundo lleno de intriga y dragones.",
      seasons: "8 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 14,
      title: "The Handmaid's Tale",
      image: "/shows/handmaids-tale.jpg",
      duration: "50m",
      rating: "16+",
      year: 2017,
      genres: ["Drama", "Ciencia ficción"],
      match: 95,
      description: "En un futuro distópico, las mujeres fértiles son forzadas a ser siervas reproductoras.",
      seasons: "5 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 15,
      title: "Succession",
      image: "/shows/succession.jpg",
      duration: "60m",
      rating: "16+",
      year: 2018,
      genres: ["Drama"],
      match: 96,
      description: "Una poderosa familia lucha por el control de su imperio mediático.",
      seasons: "4 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];
  
  const horrorShows: Show[] = [
    {
      id: 16,
      title: "Stranger Things",
      image: "/shows/stranger-things.jpg",
      duration: "50m",
      rating: "13+",
      year: 2016,
      genres: ["Horror", "Ciencia ficción", "Drama"],
      match: 97,
      description: "Un grupo de niños enfrenta misterios sobrenaturales en un pequeño pueblo.",
      seasons: "4 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 17,
      title: "The Walking Dead",
      image: "/shows/walking-dead.jpg",
      duration: "45m",
      rating: "16+",
      year: 2010,
      genres: ["Horror", "Drama"],
      match: 94,
      description: "Sobrevivientes intentan resistir en un mundo invadido por zombis.",
      seasons: "11 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 18,
      title: "American Horror Story",
      image: "/shows/ahs.jpg",
      duration: "45m",
      rating: "16+",
      year: 2011,
      genres: ["Horror", "Drama", "Thriller"],
      match: 93,
      description: "Serie antológica que explora diferentes historias de terror en cada temporada.",
      seasons: "12 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 19,
      title: "The Haunting of Hill House",
      image: "/shows/hill-house.jpg",
      duration: "50m",
      rating: "16+",
      year: 2018,
      genres: ["Horror", "Drama"],
      match: 95,
      description: "Una familia enfrenta los traumas y los secretos de una casa embrujada.",
      seasons: "1 Temporada",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 20,
      title: "Penny Dreadful",
      image: "/shows/penny-dreadful.jpg",
      duration: "50m",
      rating: "16+",
      year: 2014,
      genres: ["Horror", "Drama", "Fantasía"],
      match: 92,
      description: "Iconos del terror como Drácula y Frankenstein convergen en una sombría Londres victoriana.",
      seasons: "3 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];
  
  const scifiShows: Show[] = [
    {
      id: 21,
      title: "Black Mirror",
      image: "/shows/black-mirror.jpg",
      duration: "60m",
      rating: "16+",
      year: 2011,
      genres: ["Ciencia ficción", "Drama", "Thriller"],
      match: 96,
      description: "Serie antológica que explora los impactos oscuros de la tecnología en la sociedad.",
      seasons: "6 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 22,
      title: "The Expanse",
      image: "/shows/expanse.jpg",
      duration: "45m",
      rating: "16+",
      year: 2015,
      genres: ["Ciencia ficción", "Drama"],
      match: 95,
      description: "Una conspiración interplanetaria amenaza la frágil paz entre la Tierra, Marte y el cinturón de asteroides.",
      seasons: "6 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 23,
      title: "Westworld",
      image: "/shows/westworld.jpg",
      duration: "60m",
      rating: "16+",
      year: 2016,
      genres: ["Ciencia ficción", "Drama", "Misterio"],
      match: 94,
      description: "Un parque temático lleno de androides se convierte en un caos cuando estos desarrollan consciencia.",
      seasons: "4 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 24,
      title: "Doctor Who",
      image: "/shows/doctor-who.jpg",
      duration: "45m",
      rating: "13+",
      year: 2005,
      genres: ["Ciencia ficción", "Aventura", "Drama"],
      match: 93,
      description: "Un alienígena viaja en el tiempo y el espacio para salvar el universo.",
      seasons: "13 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    },
    {
      id: 25,
      title: "Fringe",
      image: "/shows/fringe.jpg",
      duration: "45m",
      rating: "16+",
      year: 2008,
      genres: ["Ciencia ficción", "Drama", "Misterio"],
      match: 92,
      description: "Un equipo investiga fenómenos paranormales mientras lidia con un universo alterno.",
      seasons: "5 Temporadas",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
    }
  ];

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
        title="Spider-Man"
        description="¡Spider-Man vuelve a la gran pantalla! Prepárate para una nueva aventura épica con tu amigable vecino."
        onPlay={() => handlePlayShow(actionShows[0])}
      />

      <div className="pt-8">
        <ShowRow title="Series de Acción" shows={actionShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Comedias" shows={comedyShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Dramas" shows={dramaShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Terror" shows={horrorShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Ciencia Ficción" shows={scifiShows} onPlayShow={handlePlayShow} />
      </div>
    </div>
  );
};

export default TVShows;