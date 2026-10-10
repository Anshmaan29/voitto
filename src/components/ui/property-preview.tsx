import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import type { Property } from "@/data/content";

export function PropertyPreview({
  property,
  index,
  y,
  onOpen,
}: {
  property: Property;
  index: number;
  y: MotionValue<number>;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const film = property.media.find((item) => item.type === "video");
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manualPlayback, setManualPlayback] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      if (
        visible &&
        !document.hidden &&
        !paused &&
        !failed &&
        (manualPlayback || (!reduced && !connection?.saveData))
      ) {
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [visible, paused, failed, manualPlayback, reduced]);

  return (
    <div className="property-preview" ref={ref}>
      <button
        className="property-image"
        onClick={onOpen}
        aria-label={`Explore ${property.name}`}
      >
        <motion.div
          className="property-parallax"
          style={reduced ? undefined : { y }}
        >
          {film && !failed ? (
            <video
              ref={videoRef}
              poster={film.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => {
                setFailed(true);
                setPlaying(false);
              }}
            >
              <source src={film.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={film?.poster ?? `/media/${property.cover}-800.webp`}
              alt={film?.alt ?? property.coverAlt}
              loading="lazy"
            />
          )}
        </motion.div>
        <span className="property-number">0{index + 1}</span>
        <span className="gallery-hint">
          View photos & films <ArrowUpRight size={18} />
        </span>
      </button>
      {film && !failed && (
        <button
          className="property-film-control"
          aria-label={`${playing ? "Pause" : "Play"} ${property.name} preview`}
          onClick={() => {
            if (playing) {
              setPaused(true);
              videoRef.current?.pause();
            } else {
              setManualPlayback(true);
              setPaused(false);
              void videoRef.current?.play().catch(() => setPlaying(false));
            }
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}
    </div>
  );
}
