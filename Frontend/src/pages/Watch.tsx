import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const Watch = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(true);

  // Mock video data - in a real app, this would come from an API
  const videoData = {
    id,
    title: 'Stranger Things',
    // Using a sample video URL - in production, use your actual video CDN
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
  };

  return (
    <VideoPlayer
      videoUrl={videoData.videoUrl}
      title={videoData.title}
      onClose={() => window.history.back()}
    />
  );
};

export default Watch;