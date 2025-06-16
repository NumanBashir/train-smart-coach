import React from "react";
import Image from "next/image";

const USP = () => {
  const clubs = [
    { src: "/assets/fck.png", alt: "F.C. København" },
    { src: "/assets/realmadrid.png", alt: "Real Madrid" },
    { src: "/assets/fck.png", alt: "F.C. København" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-[--brand-dark]">
          Honorable clubs using{" "}
          <span className="text-[--brand-primary]">TrainSmartCoach</span>
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {clubs.map((club, index) => (
            <div
              key={index}
              className="w-[120px] h-[80px] relative grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={club.src}
                alt={club.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USP;
