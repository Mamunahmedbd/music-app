import React, { useMemo } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import { useAudioPlayer } from "@/context/ContextProvider";

const WavesurferCustomPlayer2 = () => {
  const { setWavesurfer2, audioUrls } = useAudioPlayer();

  const plugins = useMemo(() => {
    return [
      HoverPlugin.create({
        lineColor: "#00ff00", // Different color for second waveform
        lineWidth: 2,
        labelBackground: "#333",
        labelColor: "#fff",
        labelSize: "11px",
      }),
      TimelinePlugin.create(),
    ];
  }, []);

  return (
    <>
      <WavesurferPlayer
        height={100}
        waveColor="violet"
        url={audioUrls[0]}
        onReady={setWavesurfer2}
        plugins={plugins}
        backend="MediaElement"
        interact
        onPlay={(e) => console.log(e)}
      />
    </>
  );
};

export default WavesurferCustomPlayer2;
