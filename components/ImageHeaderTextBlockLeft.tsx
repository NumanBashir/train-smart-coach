import React from "react";

interface ImageHeaderTextBlockProps {
  mobileReverse?: boolean;
}

const ImageHeaderTextBlockLeft = ({
  mobileReverse = false,
}: ImageHeaderTextBlockProps) => {
  return (
    <div className="w-full py-8 sm:py-12 lg:py-16 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex ${
            mobileReverse ? "flex-col-reverse" : "flex-col"
          } lg:flex-row items-center justify-between gap-8 lg:gap-12`}
        >
          {/* Left: Image block - Square */}
          <div className="w-full lg:w-1/2 max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0">
            <div
              className="aspect-square bg-gray-200 flex items-center justify-center rounded-lg shadow-sm bg-cover bg-center"
              style={{
                backgroundImage: "url('/assets/training2.png')",
              }}
            ></div>
          </div>

          {/* Right: Text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Unlock Your Coaching Potential with Us
            </h2>
            <p className="mt-3 sm:mt-4 w-full sm:w-10/12 mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              Transform your coaching experience with our comprehensive
              platform. Streamline training sessions and enhance player
              development effortlessly.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="btn_primary sm:w-auto bg-black text-white px-6 py-3 rounded transition duration-200">
                Learn More
              </button>
              <a
                href="#"
                className="text-black font-medium hover:underline transition duration-200"
              >
                Sign Up →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageHeaderTextBlockLeft;
