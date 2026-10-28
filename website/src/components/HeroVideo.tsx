"use client";

import { useEffect, useRef, useState } from "react";

// Muted looping background video. Reduced-motion users keep the still poster image.
export function HeroVideo({ sources, poster }: { sources: { src: string; media?: string }[]; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <>
      <video ref={ref} className="hero__video" autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true" onPlay={() => setPaused(false)} onPause={() => setPaused(true)}>
        {sources.map((s) => (
          <source key={s.src} src={s.src} media={s.media} type="video/mp4" />
        ))}
      </video>
      <button type="button" className="hero__video-toggle" onClick={toggle} aria-label={paused ? "Play background video" : "Pause background video"}>
        {paused ? "▶" : "❚❚"}
      </button>
    </>
  );
}
