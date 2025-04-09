import React, { createContext, useContext, useState, useCallback } from 'react';
import axiosInstance from '../axiosConfig';

interface Profile {
  id: number;
  name: string;
  is_kids: boolean;
  avatar_url: string;
}

interface ProfileData {
  name: string;
  is_kids: boolean;
  avatar_url: string;
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
  createProfile: (profileData: ProfileData) => Promise<void>;
  loadProfiles: () => Promise<void>;
  deleteProfile: (profileId: number) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  const loadProfiles = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/users/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }, []);

  const createProfile = async (profileData: ProfileData) => {
    try {
      const response = await axiosInstance.post('/users/profiles', profileData);
      setProfiles(prevProfiles => [...prevProfiles, response.data]);
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const deleteProfile = async (profileId: number) => {
    try {
      await axiosInstance.delete(`/users/profiles/${profileId}`);
      setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        profiles, 
        currentProfile, 
        setCurrentProfile, 
        createProfile, 
        loadProfiles,
        deleteProfile 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};