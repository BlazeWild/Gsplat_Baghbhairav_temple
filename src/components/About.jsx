import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-6 bg-gray-50 text-gray-700">
      <h1 className="text-4xl text-center font-bold mb-4">
        About Bagh Bhairav
      </h1>
      <p className="text-center text-sm leading-relaxed max-w-3xl">
        Bagh Bhairab is a revered deity in Hindu mythology, depicted as a fierce
        and protective aspect of Lord Shiva. Known as the Tiger Bhairab, this
        form symbolizes strength, courage, and protection. The{" "}
        <a
          href="https://en.wikipedia.org/wiki/Bagh_Bhairab_Temple"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Bagh Bhairab Temple
        </a>
        , located in Kirtipur, Nepal, is one of the most significant temples
        dedicated to this powerful deity. It is a site of historical, cultural,
        and spiritual importance, visited by devotees and tourists alike.
      </p>
      <p className="text-center text-sm leading-relaxed max-w-3xl mt-4">
        This platform celebrates the essence of Bagh Bhairab, blending ancient
        mysticism with modern technology to create a unique and immersive
        experience. Through 3D visualization and digital storytelling, we aim to
        bring the legend of Bagh Bhairab closer to people around the world.
      </p>
    </div>
  );
};

export default About;
