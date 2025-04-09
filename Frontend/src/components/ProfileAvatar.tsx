import React from 'react';
import { useProfile } from '../contexts/ProfileContext';

const ProfileAvatar = () => {
  const { currentProfile } = useProfile();

  if (!currentProfile) return null;

  return (
    <img
      src={currentProfile.avatar_url}
      alt={currentProfile.name}
      className="w-8 h-8 rounded cursor-pointer"
    />
  );
};

export default ProfileAvatar;