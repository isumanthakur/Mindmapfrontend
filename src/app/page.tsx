"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Tabs } from "@/components/ui/tabs";

interface DummyContentProps {
  imageSrc: string;
}

export function TabsDemo() {
  const tabs = [
    {
      title: "Privacy",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white glassmorphism">
          <p>Your account is secure, not even mind-map has access to your data</p>
          <DummyContent imageSrc="/10.jpg" />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white glassmorphism">
          <p>Get all you fav music integrated right in the page</p>
          <DummyContent imageSrc="/2.jpg" />
        </div>
      ),
    },
    {
      title: "Moods",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white glassmorphism">
          <p>Understand your moods, and identify patterns with chart and AI</p>
          <DummyContent imageSrc="/31.jpeg" />
        </div>
      ),
    },
    {
      title: "Community",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white glassmorphism">
          <p>Have no one to talk to? Not anymore with anonymous chat.</p>
          <DummyContent imageSrc="/images.jpeg" />
        </div>
      ),
    },
    {
      title: "Search",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white glassmorphism">
          <p>No one knows who you are, not even you! Find yourself.</p>
          <DummyContent imageSrc="/5.jpeg" />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col items-center justify-center w-[90%] max-w-7xl mx-auto my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <Image
      src={imageSrc}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover opacity-40 object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
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
      // Play audio when the card is active
      audioRef.current?.play();
    } else {
      document.body.style.overflow = "auto";
      // Fix: Check if audioRef.current exists before setting currentTime
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset the audio to the beginning
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
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
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
                  width={150} // Reduced the size of the image
                  height={150} // Reduced the size of the image
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
                  {typeof active.content === "function"
                    ? active.content()
                    : active.content}
                </motion.div>
              </div>
              {active.audioSrc && (
                <audio ref={audioRef} src={active.audioSrc} />
              )}
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
}

// Close Icon Component
export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Sample card data
const cards = [
  {
    description: "Lana Del Rey",
    title: "Young & Beautiful",
    src: "/lana.jpg",
    ctaText: "Play",
    audioSrc: "/lana.mp3", // Replace with the actual path in your public folder
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music style. Born Elizabeth Woolridge Grant in New York City, she has captivated audiences worldwide with her haunting voice and introspective lyrics. <br /> <br /> Her songs often explore themes of tragic romance, glamour, and melancholia, drawing inspiration from both contemporary and vintage pop culture. With a career that has seen numerous critically acclaimed albums, Lana Del Rey has established herself as a unique and influential figure in the music industry, earning a dedicated fan base and numerous accolades.
        </p>
      );
    },
  },
  {
    description: "Arijit Singh",
    title: "Sajni re",
    src: "/sajni.jpg",
    ctaText: "Play",
    audioSrc: "/sajnire.mp3", // Replace with the actual path in your public folder
    content: () => {
      return (
        <p>&quot;Sajni Re&quot; from the movie Lappata Ladies is a soulful and melodic song that combines traditional Indian music with contemporary elements. The track features hauntingly beautiful vocals that express longing and emotion, set against a backdrop of acoustic instruments like the sitar and tabla, along with subtle electronic beats. The lyrics convey themes of love, yearning, and the passage of time, creating a poignant and reflective mood. The fusion of classical and modern sounds in &quot;Sajni Re&quot; makes it a captivating and evocative piece, resonating with both traditional and modern audiences.</p>
      );
    },
  },
  {
    description: "Aasa Kooda",
    title: "Aasa Kooda",
    src: "/asa.jpeg",
    ctaText: "Play",
    audioSrc: "/3.mp3", // Replace with the actual path in your public folder
    content: () => {
      return (
        <p>&quot;Aasa Kooda&quot; is a popular Tamil song from the movie Attakathi (2012). Composed by Santhosh Narayanan and sung by Pradeep Kumar, the song is known for its soulful melody and heartfelt lyrics. The song beautifully captures the emotions of longing and unrequited love, portraying the internal struggles of the protagonist. With its simple yet evocative music arrangement, &quot;Aasa Kooda&quot; has resonated with many listeners, making it one of the memorable tracks in Tamil cinema. The lyrics, penned by Kabilan, further enhance the emotional depth of the song, making it a favorite among fans of Tamil music.</p>
 );
    },
  },
  {
    description: "Kety Perry",
    title: "You & I",
    src: "/uandi.jpeg",
    ctaText: "Play",
    audioSrc: "/4.mp3", // Replace with the actual path in your public folder
    content: () => {
      return (
        <p>&quot;Harleys in Hawaii&quot; by Katy Perry is a dreamy, tropical pop song that captures the essence of a romantic escapade in Hawaii. With its smooth, laid-back melody and Perry&apos;s sultry vocals, the song paints a picture of riding motorcycles along scenic Hawaiian roads, enjoying the warm breeze and the thrill of adventure with a lover. The track&apos;s lush instrumentals and catchy chorus evoke a sense of freedom and island vibes, making it a perfect soundtrack for a sun-soaked getaway.</p>
 );
    },
  },
  {
    description: "Charlie Puth",
    title: "We Don't Talk Anymore",
    src: "/we.jpg",
    ctaText: "Play",
    audioSrc: "/5.mp3", // Replace with the actual path in your public folder
    content: () => {
      return (
        <p>&quot;We Don&apos;t Talk Anymore&quot; by Charlie Puth, featuring Selena Gomez, is a catchy pop song that delves into the aftermath of a breakup. Released in 2016, the song features a smooth, tropical-inspired beat paired with Puth and Gomez&apos;s emotive vocals. The lyrics reflect the pain and longing that come from losing touch with someone you once cared deeply about, capturing the bittersweet feeling of moving on while still being haunted by memories. The blend of mellow instrumentals and heartfelt lyrics makes it a relatable anthem about love, loss, and the distance that often follows a breakup.</p>
 );
    },
  },
];

// Main Home Component
const Home: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const pathHover = {
    strokeWidth: 1,
    stroke: ["#000", "#fff", "#000"],
    transition: {
      duration: 2,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center dark:text-white text-black">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl mb-4 z-10"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          MindMap
        </motion.h1>

        <motion.svg
          className="absolute inset-0 w-full h-full md:pb-40 pointer-events-none dark:stroke-white stroke-black"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice" // Keeps the SVG centered within the viewBox
          initial="hidden"
          animate="visible"
          variants={pathVariants}
          whileHover={pathHover}
          style={{
            maxWidth: '100vw', // Ensure it doesn't overflow the viewport width
            transform: 'translateX(0%)',
            width: '100%', 
          }}
        >
          <motion.path
            d="M 50 0 L 50 350 Q 50 450 100 450 Q 150 450 150 350 L 150 0"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.05"
            transform="translate(1000, -160) scale(-1.5, 3.8) rotate(-90, 90, 90)"
          />
          <motion.path
            d="M 50 0 L 50 320 Q 50 450 100 450 Q 150 450 150 320 L 150 0"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.2"
            className="m-10"
            transform="translate(0, 10) scale(1.4, 4) rotate(-90, 90, 90)"
          />
        </motion.svg>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-16">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] glassmorphism"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black  dark:text-white">
              Discover the Healing Power of Community
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-500">
              Connect with others who understand your journey. Share your experiences, support one another, and grow together.
            </p>
          </div>
          <div className="absolute gradient-bg -right-4 lg:-right-[40%] -bottom-10 object-contain rounded-2xl w-[600px] h-[300px]"></div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[300px] glassmorphism">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black  dark:text:white">
            Unlock Your Inner Strength
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-500">
          Explore the tools and practices that can help you build resilience and navigate life&apos;s challenges with confidence          </p>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] glassmorphism">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text-white">
              Embrace the Power of Mindfulness
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-500">
              Learn how to live in the moment and find peace amidst the chaos. Mindfulness is a simple, yet profound way to transform your daily life.
            </p>
          </div>
          <div className="absolute gradient-bg -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-3xl w-[700px] h-[300px]"></div>
        </WobbleCard>
      </div>

      {/* Expandable Card Demo */}
      <div className="w-full mt-36 z-20 mx-auto max-w-7xl">
        <div className="rounded-3xl glassmorphism p-4">
          <ExpandableCardDemo />
        </div>
      </div>

      <div className="w-full">
        <TabsDemo />
      </div>

      <footer className="w-full z-20 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg py-12 mt-20 rounded-t-3xl text-center glassmorphism">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-300">
            {/* Company Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Your Company</h3>
              <p>Leading provider of awesome services and products.</p>
              <p className="mt-4">1234 Street Name, City, Country</p>
              <p>Email: info@yourcompany.com</p>
              <p>Phone: +123 456 7890</p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Careers</a></li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-black dark:hover:text-white">Twitter</a>
                <a href="#" className="hover:text-black dark:hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-black dark:hover:text-white">Instagram</a>
              </div>
            </div>

            {/* App Store Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Get Our App</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:opacity-75">
                  <img src="/a2.png" alt="App Store" className="w-14 opacity-50 h-auto" />
                </a>
                <a href="#" className="hover:opacity-75">
                  <img src="/a1.png" alt="Google Play" className="w-12 opacity-50 h-auto" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-6">
            <p className="text-sm">
              © 2024 Mind-Map. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
