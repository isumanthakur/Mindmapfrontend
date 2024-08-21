"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactAudioPlayer from 'react-audio-player';
import { FaArrowLeft } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceSadCry, faFaceMeh, faFaceAngry, faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { CardStack } from "@/components/ui/card-stack"; 
import { motion } from "framer-motion";

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
  const [moodMessage, setMoodMessage] = useState<string>('Your mood has been set to happy');
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [weather, setWeather] = useState<any>(null);
  const [locationDenied, setLocationDenied] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('tokenChanged'));
    router.push('/login');
  };

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
      setMoodMessage(`Your mood has been set to ${mood}`);
      fetchSongsForMood(mood);
      fetchWeatherData();
    } catch (error) {
      const err = error as Error;
      console.error('Error setting mood:', err.message);
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
      const err = error as Error;
      console.error('Error fetching songs:', err.message);
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
      designation: "",
      content: (
        <p>
          "Your present circumstances don't determine where you can go; they merely determine where you start. It's not about erasing the past or changing what has happened, but about writing the next chapter in a way that feels true to who you are becoming."
        </p>
      ),
    },
    {
      id: 1,
      name: "David Mitchell",
      designation: "",
      content: (
        <p>
          "You are allowed to feel messed up and inside out. It doesn't mean you're defective—it just means you're human. Embrace the messiness of life, and know that every emotion, every thought, is a thread in the rich tapestry of your existence."
        </p>
      ),
    },
    {
      id: 2,
      name: "Demi Lovato",
      designation: "",
      content: (
        <p>
          "Sometimes, the bravest thing you can do is to keep going when you feel like giving up. Healing isn't about becoming someone else; it's about embracing who you already are with kindness and compassion, even when the world feels heavy."
        </p>
      ),
    },
  ];

  return (
    <div className="container mx-auto pt-14 flex flex-wrap relative" style={{ zIndex: 10, marginTop: '50px', overflow: 'hidden' }}>
      <div className="w-full flex flex-wrap">
        {/* Left Section */}
        <div className="w-full md:w-2/3 flex flex-wrap">
          {/* Top Left Section */}
          <motion.div
            className="w-full z-10 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <div className="pl-5 md:pt-5 w-full">
              {userData && (
                <h1 className="text-4xl md:text-8xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>
                  Welcome
                </h1>
              )}
              {userData && <h1 className="text-2xl md:text-4xl font-semibold mt-2 md:mt-5">{userData.username}</h1>}
            </div>
          </motion.div>
          <motion.div
            className="w-full p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <div className="rounded-3xl mt-10 md:mt-20 p-6 glassmorphism">
              <div className="flex justify-around md:justify-between gap-2">
                {[
                  { mood: 'angry', icon: faFaceAngry },
                  { mood: 'happy', icon: faFaceSmile },
                  { mood: 'neutral', icon: faFaceMeh },
                  { mood: 'sad', icon: faFaceSadCry },
                  { mood: 'anxious', icon: faFaceFrown },
                ].map(({ mood, icon }) => (
                  <motion.button
                    key={mood}
                    onClick={() => handleMoodSelection(mood)}
                    className={`mood-button ${selectedMood === mood ? 'bg-purple-300 text-black' : 'bg-transparent'} p-3 md:px-10 py-2 rounded-full`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FontAwesomeIcon icon={icon} className="text-lg md:text-xl" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Bottom Left Section */}
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
            <div
              className="rounded-3xl mt-16 md:mt-0 p-6 h-48 md:h-60"
              style={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 20,
              }}
            >
              <h2 className="text-lg font-semibold">Weather Information</h2>
              {locationDenied && (
                <p className="text-purple-500 mb-2">Permission denied. Showing default location.</p>
              )}
              {weather ? (
                <div>
                  <p>Location: {weather.location}</p>
                  <p>Temperature: {weather.temperature} °C</p>
                  <p>Condition: {weather.condition}</p>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
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
                    <img src={song.album.images[0].url} alt="Album Art" className="song-cover w-12 h-12 rounded-lg" />
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

const SongDrawer: React.FC<{ selectedSong: Song; setIsDrawerOpen: (isOpen: boolean) => void }> = ({
  selectedSong,
  setIsDrawerOpen,
}) => {
  // Use a fixed color for the drawer background instead of dynamically generating it
  const drawerBackgroundColor = "#FFDDC1"; // A light peach color for a warm, welcoming feel

  return (
    <motion.div
      className="song-drawer absolute top-0 bottom-0 left-0 right-0 text-center p-4 rounded-3xl"
      style={{ backgroundColor: drawerBackgroundColor, zIndex: 30 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } }}
    >
      <button onClick={() => setIsDrawerOpen(false)} className="text-black">
        <FaArrowLeft />
      </button>
      <img
        src={selectedSong.album.images[0].url}
        alt="Album Art"
        className="album-art-large w-32 h-32 rounded-2xl mx-auto my-4"
      />
      <h3 className="text-lg font-medium">{selectedSong.name}</h3>
      <p className="artist-list">{selectedSong.artists.map((artist: Artist) => artist.name).join(', ')}</p>
      <ReactAudioPlayer
        src={selectedSong.preview_url}
        controls
        className="w-full bg-transparent custom-audio-player"
      />
    </motion.div>
  );
};

export default HomePage;
