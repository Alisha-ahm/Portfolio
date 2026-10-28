import React, { useRef, useState, useEffect } from 'react';
import { LightPurple3DBackground } from './LightPurple3DBackground';
import { Play, Pause, Video, Sparkles } from 'lucide-react';

const REEL_VIDEOS = [
  {
    name: "Cyber Plexus Network (Original)",
    url: "./videos/section.mp4"
  },
  {
    name: "Significo Creative Reel",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789157989/significo_iv5ol6.mp4"
  },
  {
    name: "Fanta 3D Web Experience",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158196/fanta_kdkchv.mp4"
  },
  {
    name: "Gym Dynamic Fitness",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158374/gym_dnlg52.mp4"
  },
  {
    name: "Compiler Rule Logic",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158423/compiler_s8dvxg.mp4"
  }
];

export const InteractiveHeroLens: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [mouseNormalized, setMouseNormalized] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Play ambient background video quietly in loop with aggressive autoplay bypass
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setVideoLoaded(true);
        })
        .catch(() => {
          // If browser policy blocks initial autoplay, play on first user interaction
          const handleFirstInteraction = () => {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('mousemove', handleFirstInteraction);
          };
          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
          window.addEventListener('mousemove', handleFirstInteraction, { once: true });
        });
    };

    attemptPlay();
  }, [activeVideoIndex]);

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });
    setMouseNormalized({
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setLensPos({ x, y });
    setMouseNormalized({
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => {
        setIsInside(false);
        setMouseNormalized({ x: 0, y: 0 });
      }}
      onTouchStart={() => setIsInside(true)}
      className="relative w-full py-16 sm:py-20 select-none overflow-hidden cursor-crosshair group flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] rounded-3xl border border-white/10 bg-[#000000] shadow-2xl"
    >
      {/* 1. Background Video Layer (Luminous 3D Cyber Plexus Video) */}
      <video
        ref={videoRef}
        key={REEL_VIDEOS[activeVideoIndex].url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 pointer-events-none mix-blend-screen ${
          videoLoaded ? 'opacity-65' : 'opacity-40'
        }`}
      >
        <source src={REEL_VIDEOS[activeVideoIndex].url} type="video/mp4" />
        <source src="./videos/section.mp4" type="video/mp4" />
        <source src="/section.mp4" type="video/mp4" />
      </video>

      {/* 2. Lightest Purple 3D Interactive WebGL Three.js Particle Mesh */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <LightPurple3DBackground mouseNormalized={mouseNormalized} />
      </div>

      {/* 3. Subtle dark vignette to keep typography razor-sharp */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-[2] pointer-events-none" />

      {/* Video Status & Controls Badge */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <button
          onClick={toggleVideoPlayback}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 border border-white/15 backdrop-blur-md text-xs font-mono transition-all hover:scale-105 hover:border-[#b651f0]"
          title={isPlaying ? "Pause ambient video" : "Play ambient video"}
        >
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Pause className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] font-semibold">Video Active</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#b651f0] fill-current" />
              <span className="text-[11px] font-semibold text-slate-300">Play Video</span>
            </>
          )}
        </button>

        {/* Video selector toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveVideoIndex((prev) => (prev + 1) % REEL_VIDEOS.length);
          }}
          className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-all hover:border-[#b651f0]"
          title={`Switch video feed (Current: ${REEL_VIDEOS[activeVideoIndex].name})`}
        >
          <Video className="w-3.5 h-3.5 text-[#b651f0]" />
        </button>
      </div>

      {/* Base Text Layer: MAKING GOOD SHIT SINCE 2021 */}
      <h1 className="font-bebas text-center leading-[0.82] tracking-widest text-zinc-400 text-6xl sm:text-7xl md:text-8xl lg:text-9xl transition-colors duration-300 select-none z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
        MAKING <br />
        GOOD SHIT <br />
        SINCE 2021
      </h1>

      {/* Overlay Text Layer: HIDING BAD SHIT SINCE 2021 inside Purple Circular Lens */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-[clip-path] duration-75 z-20"
        style={{
          clipPath: isInside
            ? `circle(125px at ${lensPos.x}px ${lensPos.y}px)`
            : `circle(95px at 50% 50%)`,
          WebkitClipPath: isInside
            ? `circle(125px at ${lensPos.x}px ${lensPos.y}px)`
            : `circle(95px at 50% 50%)`,
          backgroundColor: '#581c87', // Rich purple disc
          boxShadow: '0 0 60px rgba(182, 81, 240, 0.5)'
        }}
      >
        <h1 className="font-bebas text-center leading-[0.82] tracking-widest text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          HIDING <br />
          BAD SHIT <br />
          SINCE 2021
        </h1>
      </div>
    </div>
  );
};
