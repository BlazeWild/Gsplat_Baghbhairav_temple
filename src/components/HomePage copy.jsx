import React, { useState, useRef, useEffect } from "react";
import { styles } from "../styles"; // Assuming this contains some predefined styles
import { Canvas3D } from "./canvas";

const HomePage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCanvasSmall, setIsCanvasSmall] = useState(true);
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
      if (document.fullscreenElement) {
        setIsFullscreen(true);
        setIsCanvasSmall(false);
      } else {
        setIsFullscreen(false);
        setIsCanvasSmall(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Ensure `isCanvasSmall` updates on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isFullscreen) {
        setIsCanvasSmall(window.innerWidth < 768);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="relative w-full h-screen mx-auto bg-blue bg-cover bg-no-repeat bg-center">
        <div
          className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col lg:flex-row items-center gap-5`}
        >
          {/* Description of Baghbhairav */}
          <div className="flex flex-col items-center text-center lg:w-1/2 lg:order-1">
            <h2 className="text-2xl font-semibold text-black">Baghbhairav</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              Baghbhairav is an ancient mystical concept that embodies strength
              and power in mythology. This model reflects the graceful yet
              fierce nature of Baghbhairav, blending tradition with modern 3D
              visualization techniques.
            </p>
          </div>

          {/* Canvas Container */}
          <div
            ref={canvasRef}
            className={`relative transition-all duration-500 ease-in-out ${
              isFullscreen
                ? "w-screen h-screen"
                : "w-[500px] h-[500px] lg:w-[50%] lg:h-auto"
            } mt-5 lg:mt-0`}
          >
            <Canvas3D />

            {/* Overlay for Fullscreen Prompt */}
            {!isFullscreen && (
              <div
                onClick={toggleFullscreen}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 cursor-pointer"
              >
                <p className="text-white text-lg font-semibold">
                  Click here for fullscreen
                </p>
              </div>
            )}

            {/* Exit Fullscreen Button for Small Screens */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-5 right-5 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 sm:hidden"
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
