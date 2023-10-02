"use client"

import { useRef } from "react";

import { Cormorant } from "next/font/google";


const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Video = () => {
  const videoRef = useRef();

  return (
    <div className="mt-12 px-4 h-full w-full">
      <div className={`text-center mb-12 max-w-[500px] mx-auto`}>
        <p
          className={`${cormorant.className} text-[20px] md:text-[32px] font-bold text-green-800 uppercase tracking-[1px] whitespace-pre-wrap`}
        >
          As Daylight Fades, Beauty Awakens: Experience Diani Beach's
          Mesmerizing Sunset
        </p>
      </div>
      <div className="h-full md:w-[90%] mx-auto relative">
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            src="/videos/diani.mp4"
            type="video/mp4"
            muted
            autoPlay={true}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Video;
