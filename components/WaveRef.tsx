import React from "react";

// ref props
type WaveRefProps = {
  containerRef: React.RefObject<HTMLDivElement> | null;
};

export default function WaveRef({ containerRef }: WaveRefProps) {
  return <div ref={containerRef} className="w-full h-12 mb-4" />;
}
