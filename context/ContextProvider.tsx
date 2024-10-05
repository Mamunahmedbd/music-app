"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import WaveSurfer from "wavesurfer.js";
import { usePathname } from "next/navigation";

// type WavesurferProps = {
//   isReady: boolean;
//   isPlaying: boolean;
//   currentTime: number;
//   wavesurfer: WaveSurfer | null;
// };

interface AudioPlayerContextType {
  // urlIndex: number;
  // currentTime: number;
  isPlaying: boolean;
  audioUrls: string[];
  onPlayPause: () => void;
  onUrlChange: () => void;
  setWavesurfer1: React.Dispatch<React.SetStateAction<WaveSurfer | null>>;
  setWavesurfer2: React.Dispatch<React.SetStateAction<WaveSurfer | null>>;
  // containerRef: React.RefObject<HTMLDivElement> | null;
}

// Define initial values for the context
const initialState: AudioPlayerContextType = {
  // urlIndex: 0,
  // currentTime: 0,
  isPlaying: false,
  audioUrls: [],
  onPlayPause: () => {},
  onUrlChange: () => {},
  setWavesurfer1: () => {},
  setWavesurfer2: () => {},
  // containerRef: null,
};

// Create the context with a proper type
const AudioPlayerContext = createContext<AudioPlayerContextType>(initialState);

// Array of audio URLs
const audioUrls: string[] = [
  "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
  "https://wavesurfer.xyz/wavesurfer-code/examples/audio/audio.wav",
  "https://wavesurfer.xyz/wavesurfer-code/examples/audio/mono.mp3",
  "https://wavesurfer.xyz/wavesurfer-code/examples/audio/stereo.mp3",
  "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
];

// Provider component for audio player state
const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const [wavesurfer1, setWavesurfer1] = useState<WaveSurfer | null>(null);
  const [wavesurfer2, setWavesurfer2] = useState<WaveSurfer | null>(null);
  const [urlIndex, setUrlIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // When navigating, sync wavesurfer1's time with wavesurfer2's current time
  useEffect(() => {
    if (path === "/" && wavesurfer2 && wavesurfer1) {
      wavesurfer1.setTime(wavesurfer2.getCurrentTime());
      wavesurfer1.setMuted(true); // Keep wavesurfer1 muted
      wavesurfer1.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, wavesurfer1]);

  useEffect(() => {
    if (wavesurfer1 && wavesurfer2) {
      wavesurfer1.on("click", () => {
        // set the time of wavesurfer2 to the current time of wavesurfer1
        wavesurfer2?.setTime(wavesurfer1.getCurrentTime());
      });

      wavesurfer2.on("click", () => {
        // set the time of wavesurfer1 to the current time of wavesurfer2
        wavesurfer1?.setTime(wavesurfer2.getCurrentTime());
      });

      wavesurfer1.on("finish", () => {
        // If wave 1 finishes, you might want to handle what happens to wave 2
        wavesurfer2?.stop();
      });
    }
  }, [wavesurfer1, wavesurfer2]);

  useEffect(() => {
    if (wavesurfer1) {
      wavesurfer1.setMuted(true); // Keep wavesurfer2 muted
    }
  }, [wavesurfer1]);

  // Update currentTime from wavesurfer2 while it's playing
  // useEffect(() => {
  //   const syncCurrentTime = () => {
  //     if (wavesurfer2) {
  //       const time = wavesurfer2.getCurrentTime();
  //       setCurrentTime(time); // Keep track of wave 2's current time
  //     }
  //   };

  //   const interval = setInterval(syncCurrentTime, 1000); // Sync every second
  //   return () => clearInterval(interval);
  // }, [wavesurfer2]);

  // Handle play/pause for both waveforms
  const onPlayPause = useCallback(() => {
    if (wavesurfer1 && wavesurfer2) {
      if (isPlaying) {
        wavesurfer1.pause();
        wavesurfer2.pause();
      } else {
        wavesurfer1.play();
        wavesurfer2.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [wavesurfer1, wavesurfer2, isPlaying]);

  // Handle track URL changes
  const onUrlChange = useCallback(() => {
    const nextIndex = (urlIndex + 1) % audioUrls.length;
    setUrlIndex(nextIndex);
    if (wavesurfer1) {
      wavesurfer1.load(audioUrls[nextIndex]);
      wavesurfer1.setMuted(true); // Ensure wavesurfer1 stays muted when URL changes
    }
    if (wavesurfer2) {
      wavesurfer2.load(audioUrls[nextIndex]);
    }
  }, [wavesurfer1, wavesurfer2, urlIndex]);

  return (
    <AudioPlayerContext.Provider
      value={{
        setWavesurfer1,
        setWavesurfer2,
        onPlayPause,
        audioUrls,
        isPlaying,
        onUrlChange,
      }}
    >
      {/* <div ref={containerRef} /> */}
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;

// Hook to access audio player context
// export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
};
