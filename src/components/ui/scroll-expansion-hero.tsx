import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, Pause, Play } from "lucide-react";

export function ScrollExpansionHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
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
        !paused &&
        !reduced &&
        visible &&
        !document.hidden &&
        !connection?.saveData
      )
        void video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [paused, reduced, visible]);
  return (
    <section
      className="hero"
      id="home"
      ref={ref}
      aria-label="Welcome to Voitto Ventures"
    >
      <motion.div
        className="hero-media"
        style={reduced ? undefined : { scale, y }}
      >
        <video
          ref={videoRef}
          poster="/media/voitto-hero-poster-1600.webp"
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-hidden="true"
        >
          <source src="/media/voitto-home-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-shade" />
      <motion.div
        className="hero-content"
        style={reduced ? undefined : { y: textY }}
      >
        {children}
      </motion.div>
      <div className="hero-bottom">
        <a href="#stays" className="scroll-cue">
          <ArrowDown size={17} /> A slower kind of discovery
        </a>
        <button
          className="film-control"
          aria-label={
            playing ? "Pause background film" : "Play background film"
          }
          onClick={() => {
            if (playing) {
              setPaused(true);
              videoRef.current?.pause();
            } else {
              setPaused(false);
              void videoRef.current?.play().catch(() => setPlaying(false));
            }
          }}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span>{playing ? "Pause film" : "Play film"}</span>
        </button>
      </div>
    </section>
  );
}
