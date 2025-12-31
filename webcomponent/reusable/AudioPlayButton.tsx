"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayButtonProps {
  id: string;
  src: string;
  size?: number;
  activeId: string | null;
  onPlayRequest: (id: string) => void;
}

export const AudioPlayButton = ({
  id,
  src,
  size = 30,
  activeId,
  onPlayRequest,
}: AudioPlayButtonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  const isPlaying = activeId === id;

  useEffect(() => {
    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnd = () => {
      setProgress(0);
      onPlayRequest(""); // reset active
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [src, onPlayRequest]);

  /** 🔁 Sync play / pause based on activeId */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleClick = () => {
    onPlayRequest(isPlaying ? "" : id);
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center justify-center rounded-full bg-[#D4915D1A] text-[#D4915D]"
      style={{ width: size, height: size }}
    >
      {/* Progress Ring */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 4) / 2}
          stroke="#D4915D33"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 4) / 2}
          stroke="#D4915D"
          strokeWidth="3"
          fill="none"
          strokeDasharray={Math.PI * (size - 4)}
          strokeDashoffset={Math.PI * (size - 4) * (1 - progress / 100)}
          strokeLinecap="round"
        />
      </svg>

      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
    </button>
  );
};
