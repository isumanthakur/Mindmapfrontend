"use client";

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceSadCry, faFaceMeh, faFaceAngry, faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { motion } from "framer-motion";

interface MoodSelectionProps {
  selectedMood: string;
  handleMoodSelection: (mood: string) => void;
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ selectedMood, handleMoodSelection }) => {
  const moods = [
    { mood: 'angry', icon: faFaceAngry },
    { mood: 'happy', icon: faFaceSmile },
    { mood: 'neutral', icon: faFaceMeh },
    { mood: 'sad', icon: faFaceSadCry },
    { mood: 'anxious', icon: faFaceFrown },
  ];

  return (
    <div className="flex justify-around md:justify-between gap-2">
      {moods.map(({ mood, icon }) => (
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
  );
};

export default MoodSelection;
