// "use client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
// } from "react";
// import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
// import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";
// import WaveSurfer from "wavesurfer.js";
// import { useWavesurfer } from "@wavesurfer/react";
// import { usePathname } from "next/navigation";

// type WavesurferProps = {
//   isReady: boolean;
//   isPlaying: boolean;
//   currentTime: number;
//   wavesurfer: WaveSurfer | null;
// };

// interface AudioPlayerContextType {
//   // urlIndex: number;
//   // currentTime: number;
//   isPlaying: boolean;
//   audioUrls: string[];
//   onPlayPause: () => void;
//   // divTag: React.JSX.Element;
//   divTag2: React.JSX.Element;
//   // onUrlChange: () => void;
//   // setWavesurfer: React.Dispatch<React.SetStateAction<WaveSurfer | null>>;
//   // wavesurfer: WavesurferProps | null;
//   containerRef1: React.RefObject<HTMLDivElement> | null;
// }

// // Define initial values for the context
// const initialState: AudioPlayerContextType = {
//   // urlIndex: 0,
//   // currentTime: 0,
//   isPlaying: false,
//   audioUrls: [],
//   onPlayPause: () => {},
//   // divTag: <></>,
//   divTag2: <></>,
//   // onUrlChange: () => {},
//   // setWavesurfer: () => {},
//   // wavesurfer: null,
//   containerRef1: null,
// };

// // Create the context with a proper type
// const AudioPlayerContext = createContext<AudioPlayerContextType>(initialState);

// // Array of audio URLs
// const audioUrls: string[] = [
//   "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
//   "https://wavesurfer.xyz/wavesurfer-code/examples/audio/audio.wav",
//   "https://wavesurfer.xyz/wavesurfer-code/examples/audio/mono.mp3",
//   "https://wavesurfer.xyz/wavesurfer-code/examples/audio/stereo.mp3",
//   "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
// ];

// // Provider component for audio player state
// export const AudioPlayerProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const path = usePathname();
//   // const [urlIndex, setUrlIndex] = useState<number>(0);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   // Separate refs for two waveform containers
//   const containerRef1 = useRef<HTMLDivElement>(null);
//   const containerRef2 = useRef<HTMLDivElement>(null);

//   const wavesurfer1 = useWavesurfer({
//     container: containerRef1,
//     height: 40,
//     barWidth: 1,
//     barGap: 1,
//     barRadius: 10,
//     autoplay: false,
//     url: audioUrls[urlIndex],
//     plugins: useMemo(
//       () => [
//         HoverPlugin.create({
//           lineColor: "#ff0000",
//           lineWidth: 2,
//           labelBackground: "#555",
//           labelColor: "#fff",
//           labelSize: "11px",
//         }),
//         Timeline.create(),
//       ],
//       []
//     ),
//   });

//   // Configure Wavesurfer instance for the second track (muted)
//   const wavesurfer2 = useWavesurfer({
//     container: containerRef2,
//     height: 40,
//     barWidth: 1,
//     barGap: 1,
//     barRadius: 10,
//     autoplay: false,
//     url: audioUrls[urlIndex], // This can be different if you want different tracks
//     plugins: useMemo(
//       () => [
//         HoverPlugin.create({
//           lineColor: "#00ff00", // Different color for second waveform
//           lineWidth: 2,
//           labelBackground: "#333",
//           labelColor: "#fff",
//           labelSize: "11px",
//         }),
//         Timeline.create(),
//       ],
//       []
//     ),
//   });

//   // Mute second track
//   useEffect(() => {
//     if (wavesurfer1) {
//       wavesurfer1.wavesurfer?.setMuted(true); // Mute the second track
//       // wavesurfer1.wavesurfer?.load(audioUrls[urlIndex]);
//     }
//   }, [wavesurfer1]);

//   useEffect(() => {
//     if (wavesurfer2) {
//       wavesurfer2.wavesurfer?.on("audioprocess", (e) => {
//         setCurrentTime(e);
//       });
//     }
//   }, [wavesurfer2]);

//   // useEffect(() => {
//   //   if (path === "/") {
//   //     wavesurfer1?.wavesurfer?.load(audioUrls[urlIndex]);
//   //     wavesurfer1.isReady = true;
//   //     wavesurfer1.isPlaying = true;
//   //     wavesurfer1.wavesurfer?.setTime(currentTime);
//   //     wavesurfer1?.wavesurfer?.setMuted(true);
//   //     console.log(wavesurfer1);
//   //     console.log(wavesurfer2);
//   //   } else {
//   //     wavesurfer1?.wavesurfer?.pause();
//   //   }
//   // }, [path]);

//   const onPlayPause = useCallback(() => {
//     if (wavesurfer1) {
//       wavesurfer1.wavesurfer?.playPause();
//       setIsPlaying(!wavesurfer1.isPlaying);
//     }
//     if (wavesurfer2) {
//       wavesurfer2.wavesurfer?.playPause(); // Play/Pause for second waveform (muted)
//     }
//   }, [wavesurfer1, wavesurfer2]);

//   // const onUrlChange = useCallback(() => {
//   //   const nextIndex = (urlIndex + 1) % audioUrls.length;
//   //   setUrlIndex(nextIndex);
//   //   if (wavesurfer1) {
//   //     wavesurfer1.wavesurfer?.load(audioUrls[nextIndex]);
//   //   }
//   //   if (wavesurfer2) {
//   //     wavesurfer2.wavesurfer?.load(audioUrls[nextIndex]); // Load the next URL for the second waveform
//   //   }
//   // }, [wavesurfer1, wavesurfer2, urlIndex]);

//   // const divTag = <div ref={containerRef1} />;
//   const divTag2 = <div ref={containerRef2} />;

//   return (
//     <AudioPlayerContext.Provider
//       value={{
//         onPlayPause,
//         audioUrls,
//         isPlaying,
//         divTag2,
//         containerRef1,
//         // wavesurfer: wavesurfer2,
//       }}
//     >
//       {/* <div ref={containerRef} /> */}
//       {children}
//     </AudioPlayerContext.Provider>
//   );
// };

// // Hook to access audio player context
// // export const useAudioPlayer = () => useContext(AudioPlayerContext);

// export const useAudioPlayer = () => {
//   const context = useContext(AudioPlayerContext);
//   if (!context) {
//     throw new Error(
//       "useAudioPlayer must be used within an AudioPlayerProvider"
//     );
//   }
//   return context;
// };
