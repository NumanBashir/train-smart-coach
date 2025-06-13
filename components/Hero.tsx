import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/training1.png" // Place your image in /public and name it hero-bg.jpg
          alt="Football Player"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="z-10 max-w-3xl text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          BE PART <br />
          <span className="text-green-500">OF THE GAME</span>
        </h1>
        <p className="mt-6 text-lg text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
          nonummy nibh euismod tincidunt ut laoreet.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="btn bg-[#407734] text-white hover:bg-[#2B4A11] px-6 py-2 rounded-full">
            LOGIN
          </button>
          <button className="btn bg-gray-700 text-white hover:bg-gray-600 px-6 py-2 rounded-full">
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
