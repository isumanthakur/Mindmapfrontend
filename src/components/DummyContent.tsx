"use client";

import React from "react";
import Image from "next/image";

interface DummyContentProps {
  imageSrc: string;
}

const DummyContent: React.FC<DummyContentProps> = ({ imageSrc }) => {
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

export default DummyContent;
