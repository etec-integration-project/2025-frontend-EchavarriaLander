import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { Play } from 'lucide-react';

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI0YjJkMGFlYWMxMTRkNWVlMDIxMzQ1OTkyZmUzMiIsIm5iZiI6MTc0ODM2MzY1MS4zMTcsInN1YiI6IjY4MzVlOTgzZDliMDNiYjI3MTA1NWQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gf-snsYL4XJ6W2x3XNs5L_P75Ay9His4W7SC2zSvOA8";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Detectar tipo por query o path, default: movie
  const type = (location.state && location.state.type) || (location.pathname.includes('/tv') ? 'tv' : 'movie');

  const [details, setDetails] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [episodesBySeason, setEpisodesBySeason] = useState<{ [season: number]: any[] }>({});
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      let currentType = type;
      let data = null;
      let triedOtherType = false;
      try {
        while (true) {
          // Detalles
          const res = await fetch(`https://api.themoviedb.org/3/${currentType}/${id}?language=es-ES`, {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: 'application/json',
            },
          });
          data = await res.json();
          if (data && data.status_code === 34 && !triedOtherType) {
            // No encontrado, probar con el otro tipo
            currentType = currentType === 'movie' ? 'tv' : 'movie';
            triedOtherType = true;
            continue;
          }
          break;
        }
        setDetails(data);
        if (currentType === 'tv' && data.seasons) {
          setSeasons(data.seasons);
        } else {
          setSeasons([]);
        }
        // Reparto
        const castRes = await fetch(`https://api.themoviedb.org/3/${currentType}/${id}/credits?language=es-ES`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: 'application/json',
          },
        });
        const castData = await castRes.json();
        setCast(castData.cast ? castData.cast.slice(0, 8) : []);
        // Guardar créditos técnicos en details
        setDetails((prev: any) => ({ ...prev, credits: castData }));
        // Trailer oficial TMDB
        const videoRes = await fetch(`https://api.themoviedb.org/3/${currentType}/${id}/videos?language=es-ES`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: 'application/json',
          },
        });
        const videoData = await videoRes.json();
        let trailerObj = (videoData.results || []).find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        let trailerUrl = trailerObj ? `https://www.youtube.com/embed/${trailerObj.key}` : null;
        // Si no hay trailer oficial, buscar en YouTube
        if (!trailerUrl) {
          const query = encodeURIComponent(`${data.title || data.name} trailer`);
          const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=AIzaSyD-EXAMPLE-KEY`);
          const ytData = await ytRes.json();
          if (ytData.items && ytData.items.length > 0) {
            trailerUrl = `https://www.youtube.com/embed/${ytData.items[0].id.videoId}`;
          }
        }
        setTrailer(trailerUrl);
      } catch (err) {
        setError('No se pudo cargar la información.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  // Fetch episodios de una temporada
  const fetchEpisodes = async (seasonNumber: number) => {
    if (episodesBySeason[seasonNumber]) return; // Ya cargado
    try {
      const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=es-ES`, {
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: 'application/json',
        },
      });
      const data = await res.json();
      setEpisodesBySeason((prev) => ({ ...prev, [seasonNumber]: data.episodes || [] }));
    } catch {}
  };

  if (loading) return <div className="text-center text-piraflix-gold py-20">Cargando...</div>;
  if (error || !details) return <div className="text-center text-piraflix-red py-20">{error || 'No encontrado'}</div>;

  return (
    <div className="min-h-screen bg-piraflix text-piraflix-accent">
      {/* Backdrop horizontal */}
      {details.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt="Backdrop"
          className="w-full h-64 object-cover mb-4 rounded-b-lg shadow-lg"
        />
      )}
      <div className="max-w-5xl mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-8">
        {/* Portada */}
        <div className="flex-shrink-0">
          <img
            src={details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Imagen'}
            alt={details.title || details.name}
            className="rounded-lg w-40 md:w-56 shadow-lg border-2 border-piraflix-gold"
          />
        </div>
        {/* Info principal */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-piraflix-gold">{details.title || details.name}</h1>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {details.release_date && <span className="text-piraflix-gold">{(details.release_date || details.first_air_date).split('-')[0]}</span>}
            {details.genres && details.genres.length > 0 && (
              <span className="text-piraflix-accent">{details.genres.map((g: any) => g.name).join(', ')}</span>
            )}
            {details.runtime && <span className="text-piraflix-accent">{details.runtime} min</span>}
            {details.number_of_seasons && <span className="text-piraflix-accent">{details.number_of_seasons} temporadas</span>}
            {details.vote_average && <span className="text-piraflix-gold font-semibold">★ {details.vote_average.toFixed(1)}/10</span>}
          </div>
          <p className="mb-4 text-piraflix-accent max-w-2xl">{details.overview}</p>
          <div className="flex gap-4 mb-4 flex-wrap">
            <button
              className="bg-piraflix-red hover:bg-piraflix-gold hover:text-piraflix-black px-6 py-2 rounded font-bold flex items-center gap-2 text-piraflix-accent shadow transition"
              onClick={() => setIsPlaying(true)}
            >
              <Play className="w-5 h-5" /> Reproducir
            </button>
            {trailer && (
              <button
                className="bg-piraflix-gold hover:bg-piraflix-red hover:text-piraflix-accent px-6 py-2 rounded font-bold flex items-center gap-2 text-piraflix-black shadow transition"
                onClick={() => setShowTrailer(true)}
              >
                Ver tráiler
              </button>
            )}
            <button
              className="bg-piraflix-gray hover:bg-piraflix-gold hover:text-piraflix-black px-6 py-2 rounded font-bold flex items-center gap-2 text-piraflix-accent shadow transition"
              onClick={() => setShowCredits(true)}
            >
              Créditos
            </button>
            <button
              className="bg-piraflix-gray hover:bg-piraflix-gold hover:text-piraflix-black px-6 py-2 rounded font-bold text-piraflix-accent shadow transition"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
          {/* Reparto */}
          {cast.length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2 text-piraflix-gold">Reparto principal</h2>
              <div className="flex flex-wrap gap-4">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center w-20">
                    <img
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=Sin+Foto'}
                      alt={actor.name}
                      className="rounded-full w-16 h-16 object-cover mb-1 border border-piraflix-gold"
                    />
                    <span className="text-xs text-center text-piraflix-accent">{actor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Más fotos */}
          {details.images && details.images.backdrops && details.images.backdrops.length > 1 && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2 text-piraflix-gold">Más fotos</h2>
              <div className="flex gap-2 overflow-x-auto">
                {details.images.backdrops.slice(1, 6).map((img: any, idx: number) => (
                  <img
                    key={idx}
                    src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                    alt="Backdrop extra"
                    className="rounded w-40 h-24 object-cover border border-piraflix-gold"
                  />
                ))}
              </div>
            </div>
          )}
          {/* Temporadas y episodios para series */}
          {type === 'tv' && seasons.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold mb-4 text-xl text-piraflix-gold">Temporadas</h2>
              <div className="space-y-4">
                {seasons.map((season: any) => (
                  <div key={season.season_number} className="bg-piraflix-gray rounded-lg p-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={async () => {
                      setExpandedSeason(expandedSeason === season.season_number ? null : season.season_number);
                      if (!episodesBySeason[season.season_number]) await fetchEpisodes(season.season_number);
                    }}>
                      <div className="flex items-center gap-4">
                        <img
                          src={season.poster_path ? `https://image.tmdb.org/t/p/w185${season.poster_path}` : 'https://via.placeholder.com/185x278?text=Sin+Imagen'}
                          alt={season.name}
                          className="w-16 h-24 rounded object-cover border border-piraflix-gold"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-piraflix-gold">{season.name}</h3>
                          <p className="text-piraflix-accent text-sm">{season.air_date ? `Estreno: ${season.air_date}` : ''}</p>
                          <p className="text-piraflix-accent text-sm">{season.episode_count} episodios</p>
                        </div>
                      </div>
                      <span className="text-piraflix-gold text-2xl">{expandedSeason === season.season_number ? '−' : '+'}</span>
                    </div>
                    {expandedSeason === season.season_number && episodesBySeason[season.season_number] && (
                      <div className="mt-4 space-y-4">
                        {episodesBySeason[season.season_number].map((ep: any) => (
                          <div key={ep.id} className="flex gap-4 bg-piraflix-black rounded p-3">
                            <img
                              src={ep.still_path ? `https://image.tmdb.org/t/p/w300${ep.still_path}` : 'https://via.placeholder.com/300x169?text=Sin+Imagen'}
                              alt={ep.name}
                              className="w-32 h-20 object-cover rounded border border-piraflix-gold"
                            />
                            <div>
                              <h4 className="font-bold text-piraflix-gold">{ep.episode_number}. {ep.name}</h4>
                              <p className="text-piraflix-accent text-sm mb-1">{ep.air_date ? `Emitido: ${ep.air_date}` : ''}</p>
                              <p className="text-piraflix-accent text-sm">{ep.overview || 'Sin sinopsis.'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* VideoPlayer modal */}
      {isPlaying && (
        <div className="fixed inset-0 bg-piraflix-black/90 flex items-center justify-center z-50">
          <VideoPlayer
            videoUrl={details.videoUrl || ''}
            title={details.title || details.name}
            onClose={() => setIsPlaying(false)}
          />
        </div>
      )}
      {/* Trailer modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-piraflix-black/90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video">
            <button
              className="absolute top-2 right-2 bg-piraflix-black/80 text-piraflix-accent rounded-full p-2 z-10 hover:bg-piraflix-gold hover:text-piraflix-black"
              onClick={() => setShowTrailer(false)}
            >
              ×
            </button>
            <iframe
              src={trailer}
              title="Trailer"
              className="w-full h-full rounded-lg shadow-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}
      {/* Créditos modal */}
      {showCredits && (
        <div className="fixed inset-0 bg-piraflix-black/90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl bg-piraflix-gray rounded-lg p-6">
            <button
              className="absolute top-2 right-2 bg-piraflix-black/70 text-piraflix-accent rounded-full p-2 z-10 hover:bg-piraflix-gold hover:text-piraflix-black"
              onClick={() => setShowCredits(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-piraflix-gold">Créditos</h2>
            {cast.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-piraflix-gold">Reparto principal</h3>
                <div className="flex flex-wrap gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="flex flex-col items-center w-20">
                      <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=Sin+Foto'}
                        alt={actor.name}
                        className="rounded-full w-12 h-12 object-cover mb-1 border border-piraflix-gold"
                      />
                      <span className="text-xs text-center text-piraflix-accent">{actor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {details.credits && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-piraflix-gold">Equipo técnico</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details.credits.crew.filter((c: any) => ['Director', 'Screenplay', 'Writer', 'Producer'].includes(c.job)).map((crew: any, idx: number) => (
                    <div key={idx} className="text-piraflix-accent">
                      <span className="font-bold text-piraflix-gold">{crew.job}:</span> {crew.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!details.credits && (
              <div className="text-piraflix-gold">No hay información de créditos disponible.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;