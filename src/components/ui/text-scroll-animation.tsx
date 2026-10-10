import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function TextScrollAnimation({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-label={text}
      className="word-reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ staggerChildren: reduced ? 0 : 0.075 }}
    >
      {text.split(" ").map((word, i) => (
        <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
          <motion.span
            variants={{
              hidden: { y: reduced ? 0 : "105%", rotate: reduced ? 0 : 3 },
              visible: { y: 0, rotate: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
