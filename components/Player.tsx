"use client";
import React from "react";

import { useAudioPlayer } from "@/context/ContextProvider";
import WavesurferCustomPlayer1 from "./WavePlayer1";

const Player = () => {
  const { onPlayPause, isPlaying, audioUrls } = useAudioPlayer();

  return (
    <React.Fragment>
      <WavesurferCustomPlayer1 />

      <p>Current audio: {audioUrls[0]}</p>

      {/* <p>Current time: {formatTime(currentTime || 0)}</p> */}

      <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        {/* <button onClick={onUrlChange}>Change audio</button> */}

        <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Player;
