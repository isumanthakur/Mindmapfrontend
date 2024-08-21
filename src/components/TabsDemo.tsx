"use client";

import React from "react";
import { Tabs } from "@/components/ui/tabs";
import DummyContent from "./DummyContent";


const TabsDemo: React.FC = () => {
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
};

export default TabsDemo;
