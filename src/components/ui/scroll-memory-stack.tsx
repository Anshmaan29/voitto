import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { properties, type Property } from "@/data/content";

function MemoryCard({
  property,
  index,
  progress,
  onOpen,
}: {
  property: Property;
  index: number;
  progress: MotionValue<number>;
  onOpen: (property: Property) => void;
}) {
  const reduced = useReducedMotion();
  const distance = index - 1.5;
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [distance * 12, distance * 78, distance * 84],
  );
  const y = useTransform(
    progress,
    [0, 0.5, 1],
    [100 + index * 12, Math.abs(distance) * 24, Math.abs(distance) * 18 - 12],
  );
  const rotate = useTransform(
    progress,
    [0, 0.5, 1],
    [distance * 2, distance * 10, distance * 7],
  );
  const rotateY = useTransform(progress, [0, 0.5], [distance * -18, 0]);
  return (
    <motion.button
      className="memory-card"
      aria-label={`Discover ${property.name}`}
      onClick={() => onOpen(property)}
      style={
        reduced
          ? {
              x: distance * 78,
              y: Math.abs(distance) * 24,
              rotate: distance * 7,
            }
          : { x, y, rotate, rotateY }
      }
      whileHover={
        reduced ? undefined : { scale: 1.055, translateY: -15, zIndex: 8 }
      }
      whileFocus={{ zIndex: 8 }}
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
    >
      <img
        src={`/media/${property.cover}-800.webp`}
        alt={property.coverAlt}
        loading="lazy"
      />
      <span>
        {property.name}
        <ArrowUpRight size={12} />
      </span>
    </motion.button>
  );
}
export function ScrollMemoryStack({
  onOpen,
}: {
  onOpen: (property: Property) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <div className="memory-stack" ref={ref}>
      <div className="memory-orbit" aria-hidden="true" />
      {properties.map((property, i) => (
        <MemoryCard
          key={property.slug}
          property={property}
          index={i}
          progress={scrollYProgress}
          onOpen={onOpen}
        />
      ))}
      <span className="memory-caption">Choose a place. Make a memory.</span>
    </div>
  );
}
