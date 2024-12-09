"use client";
import React, { useState } from "react";

const dogImages = [
  "/images/dog1.jpg",
  "/images/dog2.jpg",
  "/images/dog3.png",
  "/images/dog4.jpg",
];

const HomePage = () => {
  const [position, setPosition] = useState(3);

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto px-4 z-[1] pt-[50px]">
      <div className="w-full md:w-3/4 mb-6">
        <div className="pt-[50px] font-serif text-lg animate-slidein300 opacity-0 z-[1]">
          <p>
            This website is dedicated to all dog lovers who are interested in
            adopting.
          </p>
        </div>
        <div className="pt-[10px] font-serif text-lg animate-slidein500 opacity-0 z-[1]">
          <p>
            Take some time to browse through the dogs looking for new homes and
            choose the one that best fits your personality and lifestyle. Soon,
            this page will feature a personality test called Perfect Match,
            which will help you find the dogs most compatible with you!
          </p>
        </div>
        <div className="pt-[10px] font-serif text-lg animate-slidein700 opacity-0 z-[1]">
          <p>
            If you're not looking to adopt but want to support local shelters,
            you'll soon have the option to make a donation directly through this
            site.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 animate-slidein900 opacity-0">
        <div className=" h-[350px] grid grid-rows-[300px_50px] grid-cols-[1fr] items-center justify-items-center font-['Poppins']">
          <div
            className="row-start-1 row-end-2 w-full h-[300px] flex items-center justify-center overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              perspective: "400px",
              "--items": 4,
              "--middle": 3,
              "--position": position,
            }}
          >
            {dogImages.map((image, index) => (
              <div
                key={index}
                className="absolute w-[200px] h-[200px] bg-white text-center p-2 border-2 border-black rounded-xl flex flex-col items-center justify-center"
                style={{
                  "--offset": index + 1,
                  "--r": `calc(var(--position) - var(--offset))`,
                  "--abs": `max(calc(var(--r) * -1), var(--r))`,
                  transform: `rotateY(calc(-10deg * var(--r))) translateX(calc(-250px * var(--r)))`,
                  zIndex: `calc((var(--position) - var(--abs)))`,
                  transition: "all 0.25s linear",
                }}
              >
                <img
                  src={image}
                  alt={`Dog ${index + 1}`}
                  className="max-w-full max-h-full object-cover rounded-xl"
                />
                <a href="/adoption" className="text-sm font-medium mt-2">
                  Tap to see more...
                </a>
              </div>
            ))}
          </div>

          <div className="row-start-2 row-end-3 grid grid-cols-4 gap-2 justify-center">
            {[1, 2, 3, 4].map((pos) => (
              <input
                key={pos}
                type="radio"
                name="position"
                checked={position === pos}
                onChange={() => setPosition(pos)}
                className="appearance-none w-[10px] h-[10px] rounded-full cursor-pointer bg-black border-2 border-black"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
