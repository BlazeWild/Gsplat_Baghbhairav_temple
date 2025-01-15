import React, { useState, useRef, useEffect } from "react";
import { styles } from "../styles"; // Assuming this contains some predefined styles
import { Canvas3D } from "./canvas";

const HomePage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (canvasRef.current) {
        const element = canvasRef.current;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
    } else {
      document.exitFullscreen();
    }
  };

  // Synchronize `isFullscreen` with actual DOM fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen mx-auto bg-white bg-cover bg-no-repeat bg-center">
        <div
          className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col lg:flex-row items-center gap-5`}
        >
          {/* Description of Baghbhairav */}
          <div className="flex flex-col items-start text-justify lg:w-1/2 lg:order-1">
            <h2 className="text-xl font-semibold text-black">Baghbhairav</h2>
            <p className="mt-3 text-base text-gray-600 max-w-3xl">
              Baghbhairav is an ancient mystical concept that embodies strength
              and power in mythology. This model reflects the graceful yet
              fierce nature of Baghbhairav, blending tradition with modern 3D
              visualization techniques.
            </p>
          </div>

          {/* Canvas Container */}
          <div
            ref={canvasRef}
            className={`relative mt-5 lg:mt-0 ${
              isFullscreen
                ? "w-screen h-screen" // Fullscreen
                : `w-[500px] h-[400px] max-w-full` // Fixed 800x600 (scaled for device pixels)
            }`}
            style={{
              aspectRatio: "4 / 3", // Ensures aspect ratio is maintained
              border: !isFullscreen ? "2px solid white" : "none", // Border when not fullscreen
              overflow: "hidden", // No overflow
            }}
          >
            {/* Canvas3D Display */}
            <Canvas3D />

            {/* Overlay for Fullscreen Prompt */}
            {!isFullscreen && (
              <div
                onClick={toggleFullscreen}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 cursor-pointer"
              >
                <p className="text-white text-base font-semibold">
                  Click here for fullscreen
                </p>
              </div>
            )}

            {/* Exit Fullscreen Button */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-5 right-5 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 sm:hidden z-20"
              >
                Exit Fullscreen
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
