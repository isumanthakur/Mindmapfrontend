"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CloseIcon } from "./CloseIcon";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface Card {
  title: string;
  src: string;
  description: string;
  ctaText: string;
  audioSrc?: string;
  content: () => JSX.Element;
}

const cards: Card[] = [
  {
    title: "Card Title 1",
    src: "/1.jpg",
    description: "Description of the card",
    ctaText: "Play",
    audioSrc: "/path/to/audio.mp3",
    content: () => (
      <p>
        Some content for this card.
      </p>
    ),
  },
  // Add more card objects here...
];

const ExpandableCardDemo: React.FC = () => {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      audioRef.current?.play();
    } else {
      document.body.style.overflow = "auto";
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-black rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col glassmorphism3 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={150}
                  height={150}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 lg:h-60 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div className="p-4 flex flex-col md:flex-row justify-between items-start">
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200 text-sm md:text-lg"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base"
                  >
                    {active.description}
                  </motion.p>
                </div>
                <motion.button
                  layoutId={`button-${active.title}-${id}`}
                  onClick={() => audioRef.current?.play()}
                  className="px-4 py-2 text-sm rounded-full font-bold border border-black bg-transparent hover:bg-black hover:text-white text-black mt-4 md:mt-0"
                >
                  {active.ctaText}
                </motion.button>
              </div>
              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {typeof active.content === "function" ? active.content() : active.content}
                </motion.div>
              </div>
              {active.audioSrc && <audio ref={audioRef} src={active.audioSrc} />}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-7xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-row justify-start items-center hover:bg-orange-100 dark:hover:bg-purple-700 rounded-xl cursor-pointer w-full"
          >
            <motion.div layoutId={`image-${card.title}-${id}`} className="flex-shrink-0">
              <Image
                width={100}
                height={100}
                src={card.src}
                alt={card.title}
                className="h-28 w-28 md:h-14 md:w-14 rounded-lg object-cover object-top"
              />
            </motion.div>
            <div className="flex-1 ml-4">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 text-sm md:text-lg"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base"
              >
                {card.description}
              </motion.p>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              onClick={() => audioRef.current?.play()}
              className="px-4 py-2 text-sm rounded-full font-bold border border-black bg-transparent hover:bg-black hover:text-white text-black ml-4"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
};

export default ExpandableCardDemo;
