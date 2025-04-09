import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Plus } from 'lucide-react';

interface HeroVideoProps {
  title: string;
  description: string;
  onPlay: () => void;
}

const HeroVideo = ({ title, description, onPlay }: HeroVideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-[70vh] mb-8">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      >
        <source 
          src="\public\El Sorprendente Hombre Araña - Tráiler.mp4" 
          type="video/mp4"
        />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent">
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 bg-gray-800/60 p-2 rounded-full hover:bg-gray-700/60"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        <div className="absolute bottom-16 left-4 md:left-16 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-4">{description}</p>
          <div className="flex space-x-4">
            <button
              className="flex items-center bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/90"
              onClick={onPlay}
            >
              <Play className="w-5 h-5 mr-2" />
              Reproducir
            </button>
            <button className="flex items-center bg-gray-500/70 px-6 py-2 rounded font-semibold hover:bg-gray-500/50">
              <Plus className="w-5 h-5 mr-2" />
              Mi Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo; 