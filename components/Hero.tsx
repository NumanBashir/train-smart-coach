import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="hero min-h-[80vh] md:min-h-screen"
      style={{
        backgroundImage: "url('/assets/training1.png')",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center justify-center px-4">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-4xl md:text-7xl font-bold">
            TrainSmartCoach
          </h1>
          <p className="mb-5 text-base md:text-lg">
            TrainSmartCoach is a web application designed to help coaches and
            athletes manage training sessions, track performance, and enhance
            overall athletic development. It provides tools for creating drills,
            monitoring progress, and optimizing training routines.
          </p>
          <button className="btn btn_primary">
            <a href="/login">JOIN NOW</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
