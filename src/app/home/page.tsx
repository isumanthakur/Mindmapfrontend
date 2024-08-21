"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactAudioPlayer from 'react-audio-player';
import { motion } from "framer-motion";
import Image from 'next/image';

import SongDrawer from '@/components/SongDrawer';
import MoodSelection from '@/components/MoodSelection';
import WeatherDisplay from '@/components/WeatherDisplay';
import UserGreeting from '@/components/UserGreeting';
import { CardStack } from "@/components/ui/card-stack"; 

interface Artist {
  name: string;
}

interface Song {
  name: string;
  artists: Artist[];
  preview_url: string;
  album: {
    images: { url: string }[];
  };
}

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [selectedMood, setSelectedMood] = useState<string>('happy');
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [weather, setWeather] = useState<any>(null);
  const [locationDenied, setLocationDenied] = useState<boolean>(false);
  const router = useRouter();

  const handleMoodSelection = async (mood: string) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moods/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });
      setSelectedMood(mood);
      fetchSongsForMood(mood);
      fetchWeatherData();
    } catch (error) {
      console.error('Error setting mood:', error);
    }
  };

  const fetchSongsForMood = async (mood: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moods/spotify/songs/?mood=${mood}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setSongs([]);
    }
  };

  const fetchWeatherData = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setTimeout(() => {
          setWeather({
            location: 'India',
            temperature: '31.3',
            condition: 'Partly Cloudy',
          });
        }, 2000);
      },
      (error) => {
        console.error('Error getting location:', error.message);
        setLocationDenied(true);
        setWeather({
          location: 'New York',
          temperature: '25.3',
          condition: 'Clear sky',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUserData(data);
      fetchSongsForMood('happy');
      fetchWeatherData();
    };

    fetchUserData();
  }, [router]);

  const CARDS = [
    {
      id: 0,
      name: "Nido Qubein",
      designation: "Author & Speaker",
      content: <p>&quot;Your present circumstances don&apos;t determine where you can go; they merely determine where you start.&quot;</p>,
    },
    {
      id: 1,
      name: "David Mitchell",
      designation: "Author",
      content: <p>&quot;You are allowed to feel messed up and inside out. It doesn&apos;t mean you&apos;re defective—it just means you&apos;re human.&quot;</p>,
    },
    {
      id: 2,
      name: "Demi Lovato",
      designation: "Singer & Actress",
      content: <p>&quot;Sometimes, the bravest thing you can do is to keep going when you feel like giving up.&quot;</p>,
    },
  ];

  return (
    <div className="container mx-auto pt-14 flex flex-wrap relative" style={{ zIndex: 10, marginTop: '50px', overflow: 'hidden' }}>
      <div className="w-full flex flex-wrap">
        {/* Left Section */}
        <div className="w-full md:w-2/3 flex flex-wrap">
          <UserGreeting username={userData?.username || "User"} />
          <motion.div
            className="w-full p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <div className="rounded-3xl mt-10 md:mt-20 p-6 glassmorphism">
              <MoodSelection selectedMood={selectedMood} handleMoodSelection={handleMoodSelection} />
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <div className="rounded-3xl h-40 md:h-60">
              <div className="gradient-box h-full rounded-3xl animated-gradient">
                <CardStack items={CARDS} />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <WeatherDisplay locationDenied={locationDenied} weather={weather} />
          </motion.div>
        </div>
        {/* Right Section */}
        <motion.div
          className="w-full md:w-1/3 p-4"
          style={{ height: '100%' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div className="rounded-3xl p-6 relative glassmorphism">
            <h2 className="text-2xl mb-3 font-semibold">{selectedMood} Playlist</h2>
            {selectedSong && (
              <div className="quick-controls flex flex-col items-center bg-transparent">
                <h3 className="text-md font-medium">{selectedSong.name}</h3>
                <p className="artist-list">{selectedSong.artists.map((artist: Artist) => artist.name).join(', ')}</p>
                <ReactAudioPlayer
                  src={selectedSong.preview_url}
                  controls
                  className="w-full bg-transparent custom-audio-player"
                />
              </div>
            )}
            <div className="spotify-recommendations">
              <motion.div
                className="song-list flex flex-col gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      delayChildren: 0.3,
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {songs.slice(0, 9).map((song, index) => (
                  <motion.div
                    key={index}
                    className="song-item flex items-center gap-2 p-2 rounded-md cursor-pointer"
                    onClick={() => {
                      setSelectedSong(song);
                      setIsDrawerOpen(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image src={song.album.images[0].url} alt="Album Art" className="song-cover rounded-lg" width={48} height={48} />
                    <span className="text-start">{song.name}</span>
                  </motion.div>
                ))}
              </motion.div>
              {isDrawerOpen && selectedSong && (
                <SongDrawer selectedSong={selectedSong} setIsDrawerOpen={setIsDrawerOpen} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
