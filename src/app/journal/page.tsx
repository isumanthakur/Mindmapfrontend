"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaperclip, FaMicrophone, FaAngleLeft, FaAngleRight, FaArrowUp } from 'react-icons/fa';
import { motion } from "framer-motion";

const JournalPage: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPreviousEntries, setShowPreviousEntries] = useState<boolean>(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState<boolean>(false);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/journal/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setJournalEntries(response.data);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
        setErrorMessage('Error fetching journal entries.');
      }
    };
    fetchJournalEntries();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('content', currentEntry);
    if (attachment) formData.append('attachment', attachment);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/journal/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setJournalEntries([...journalEntries, response.data]);
      setCurrentEntry('');
      setAttachment(null);
      setErrorMessage('');
    } catch (error: any) {
      console.error('Error saving journal entry:', error.response.data);
      setErrorMessage('Error saving journal entry.');
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachment(e.target.files[0]);
      setShowAttachmentOptions(false);
    }
  };

  const startVoiceInput = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCurrentEntry(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className="container mx-auto flex flex-col h-screen md:p-10 relative overflow-hidden">
      {/* Left Sidebar with Previous Entries */}
      <motion.div
        className={`fixed h-screen left-0 top-0 bottom-0 w-screen md:w-1/4 p-4 flex flex-col overflow-y-auto rounded-r-2xl glassmorphism z-20 ${showPreviousEntries ? 'block' : 'hidden'}`}
        style={{
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        initial={{ x: -100 }}
        animate={{ x: showPreviousEntries ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h2 className="text-xl text-center font-semibold mb-4">Previous Entries</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <ul className="space-y-2">
          {journalEntries.map(entry => (
            <li key={entry.id} className="border border-black dark:border-white rounded-2xl p-2">{entry.content}</li>
          ))}
        </ul>
      </motion.div>

      {/* Toggle Button */}
      <motion.button 
        onClick={() => setShowPreviousEntries(!showPreviousEntries)} 
        className="bg-transparent border-2 border-black dark:border-white p-2 rounded-full absolute top-20 md:top-12 left-3 transform z-30 md:left-[0%] md:transform-none"
        style={{ transition: 'left 0.3s, top 0.3s' }}
        whileHover={{ scale: 1.1 }}
      >
        {showPreviousEntries ? <FaAngleLeft /> : <FaAngleRight />}
      </motion.button>

      {/* Right-Side Writing Pad */}
      <motion.div
        className={`flex-grow flex flex-col justify-end p-4 ${showPreviousEntries ? 'ml-full md:ml-[25%]' : 'ml-0'}`}
        style={{ transition: 'margin-left 0.3s' }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="relative flex items-center w-full">
          <div className="flex items-center w-full bg-transparent rounded-3xl overflow-hidden border border-black dark:border-white">
            <motion.button 
              className="text-xl text-black dark:text-white p-2" 
              onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
              whileHover={{ scale: 1.1 }}
            >
              <FaPaperclip />
            </motion.button>

            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write here..."
              className="flex-grow p-2 rounded-3xl focus:outline-none bg-transparent text-black dark:text-white"
              style={{ 
                height: 'auto', 
                minHeight: '50px',
                resize: 'none',
                overflow: 'hidden',
              }}
              rows={1}
              onInput={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
              }}
            />

            <motion.button 
              className="text-xl text-black dark:text-white p-2" 
              onClick={startVoiceInput}
              whileHover={{ scale: 1.1 }}
            >
              <FaMicrophone />
            </motion.button>
          </div>

          <motion.div
            className={`absolute bottom-full mb-2 left-0 flex flex-wrap gap-2 p-2 pt-5 rounded-xl bg-transparent text-black border-black dark:text-white ${showAttachmentOptions ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showAttachmentOptions ? 1 : 0, scale: showAttachmentOptions ? 1 : 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <label className="cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAttachmentChange} 
                className="hidden"
              />
              <span className="text-sm">Photo</span>
            </label>
            <label className="cursor-pointer">
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleAttachmentChange} 
                className="hidden"
              />
              <span className="text-sm">Video</span>
            </label>
            <label className="cursor-pointer">
              <input 
                type="file" 
                accept="audio/*" 
                onChange={handleAttachmentChange} 
                className="hidden"
              />
              <span className="text-sm">Audio</span>
            </label>
          </motion.div>
          <motion.button 
            onClick={handleSave} 
            className="ml-2 px-4 py-4 mb-1 bg-transparent border border-black dark:text-white dark:border-white text-black rounded-3xl"
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </motion.div>
      
      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(230deg, #9d174d, #9d174d, #7c3aed, #9d174d);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
          opacity: 0.5;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

      `}</style>
    </div>
  );
};

export default JournalPage;
