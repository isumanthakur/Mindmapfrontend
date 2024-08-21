"use client";

import React from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from "framer-motion";
import ReactAudioPlayer from 'react-audio-player';
import Image from 'next/image';

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

interface SongDrawerProps {
  selectedSong: Song;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const SongDrawer: React.FC<SongDrawerProps> = ({ selectedSong, setIsDrawerOpen }) => {
  const drawerBackgroundColor = "#FFDDC1";

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
      <Image
        src={selectedSong.album.images[0].url}
        alt="Album Art"
        className="album-art-large rounded-2xl mx-auto my-4"
        width={128}
        height={128}
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

export default SongDrawer;
