import React from 'react';
import { Play, Plus, ThumbsUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MovieProps {
  movie: {
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
    seasons?: string;
    first_air_date?: string;
  };
  onPlay: (movie: any) => void;
  type?: 'movie' | 'tv';
}

const MovieCard: React.FC<MovieProps> = ({ movie, onPlay, type = 'movie' }) => {
  // Tomar el primer género si existe
  const mainGenre = movie.genres && movie.genres.length > 0 ? movie.genres[0] : null;
  const navigate = useNavigate();

  const [liked, setLiked] = React.useState(() => {
    const likes = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    return likes.includes(movie.id);
  });
  const [inList, setInList] = React.useState(() => {
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    return list.includes(movie.id);
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // Evitar que el click en los botones internos dispare la navegación
    if ((e.target as HTMLElement).closest('button')) return;
    let cardType = type;
    if (!cardType) {
      if (movie.seasons || movie.first_air_date) cardType = 'tv';
      else cardType = 'movie';
    }
    navigate(`/watch/${movie.id}`, { state: { type: cardType } });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const likes = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    let newLikes;
    if (likes.includes(movie.id)) {
      newLikes = likes.filter((id: number) => id !== movie.id);
    } else {
      newLikes = [...likes, movie.id];
    }
    localStorage.setItem('likedMovies', JSON.stringify(newLikes));
    setLiked(!liked);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    let newList;
    if (list.includes(movie.id)) {
      newList = list.filter((id: number) => id !== movie.id);
    } else {
      newList = [...list, movie.id];
    }
    localStorage.setItem('myList', JSON.stringify(newList));
    setInList(!inList);
  };

  return (
    <div className="group relative cursor-pointer" onClick={handleCardClick}>
      <img
        src={movie.image}
        alt={movie.title}
        className="rounded-md w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-20"
      />
      {/* Hover Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-md flex flex-col justify-between p-4 z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-white flex-1 break-words whitespace-normal">{movie.title}</h3>
            {movie.year > 0 && (
              <span className="text-xs text-gray-300 bg-gray-700 rounded px-2 py-0.5 ml-1">{movie.year}</span>
            )}
            {movie.rating && (
              <span className="text-xs text-gray-300 border border-gray-500 rounded px-2 py-0.5 ml-1">{movie.rating}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center text-yellow-400 text-xs font-semibold">
              <Star className="w-4 h-4 mr-1" fill="#facc15" />
              {movie.match}/100
            </span>
            {mainGenre && (
              <span className="text-xs text-gray-400 bg-gray-800 rounded px-2 py-0.5 ml-1">{mainGenre}</span>
            )}
            {movie.seasons && (
              <span className="text-xs text-blue-300 bg-blue-900 rounded px-2 py-0.5 ml-1">{movie.seasons}</span>
            )}
          </div>
          <p className="text-gray-200 text-xs mb-3 line-clamp-4 min-h-[3.5em]">{movie.description || 'Sin descripción disponible.'}</p>
        </div>
        <div className="flex items-center space-x-3 mt-2">
          <button 
            onClick={() => onPlay(movie)}
            className="bg-white rounded-full p-2 hover:bg-white/90 transition-colors shadow"
            title="Reproducir"
          >
            <Play className="w-5 h-5 text-black" fill="black" />
          </button>
          <button className={`border-2 rounded-full p-2 transition-colors shadow ${inList ? 'border-green-500' : 'border-gray-400 hover:border-white'}`} title="Agregar a mi lista" onClick={handleAddToList}>
            <Plus className={`w-5 h-5 ${inList ? 'text-green-500' : 'text-white'}`} />
          </button>
          <button className={`border-2 rounded-full p-2 transition-colors shadow ${liked ? 'border-pink-500' : 'border-gray-400 hover:border-white'}`} title="Me gusta" onClick={handleLike}>
            <ThumbsUp className={`w-5 h-5 ${liked ? 'text-pink-500' : 'text-white'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;