import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export function ContainerScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  return (
    <div ref={ref} className="perspective">
      <motion.div
        style={reduced ? undefined : { rotateX, scale }}
        className="scroll-panel"
      >
        {children}
      </motion.div>
    </div>
  );
}
