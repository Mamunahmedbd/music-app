"use client";
import { useAudioPlayer } from "@/context/ContextProvider";
import React from "react";
import WavesurferCustomPlayer2 from "./WavePlayer2";

// A utility function to format time as mm:ss
// const formatTime = (seconds: number): string =>
//   [seconds / 60, seconds % 60]
//     .map((v) => `0${Math.floor(v)}`.slice(-2))
//     .join(":");

const PersistentPlayer = () => {
  const { onPlayPause, audioUrls, isPlaying } = useAudioPlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
      {/* {divTag2} */}
      {/* <WaveRef containerRef={containerRef} /> */}
      <WavesurferCustomPlayer2 />

      <div className="flex items-center justify-between">
        {/* Audio Information */}
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-semibold">Now Playing</p>
          <p className="text-xs text-gray-300 truncate">{audioUrls[0]}</p>
        </div>

        {/* Time and Control Section */}
        <div className="flex items-center space-x-6">
          {/* <p className="text-sm">{formatTime(currentTime || 0)}</p> */}

          {/* Control Buttons */}
          <div className="flex space-x-4">
            {/* <button
              onClick={onUrlChange}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition"
            >
              Change
            </button> */}
            <button
              onClick={onPlayPause}
              className={`px-4 py-2 rounded-md transition ${
                isPlaying
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-green-500 hover:bg-green-400"
              }`}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistentPlayer;
