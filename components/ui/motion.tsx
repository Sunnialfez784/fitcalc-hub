"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

type MotionFadeProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/** Reusable fade-in wrapper for design system surfaces. */
export function MotionFade({ className, delay = 0, children, ...props }: MotionFadeProps) {
  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      exit={fadeIn.exit}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type MotionScaleProps = HTMLMotionProps<"div">;

/** Scale-in animation for modals, cards, popovers. */
export function MotionScale({ className, children, ...props }: MotionScaleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
