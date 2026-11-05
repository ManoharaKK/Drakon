"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollFloatProps = {
  children: ReactNode;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

export default function ScrollFloat({
  children,
  animationDuration = 1,
  stagger = 0.03,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const text = typeof children === "string" ? children : null;

  const durationS = `${animationDuration}s`;
  const timingFn =
    "cubic-bezier(0.34, 1.56, 0.64, 1)"; /* approx. overshoot “back” ease */

  if (text != null) {
    return (
      <span ref={containerRef} className="inline-block">
        {text.split("").map((char, i) => (
          <span
            key={`${i}-${char}`}
            className="inline-block will-change-transform"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(1.25rem)",
              transitionProperty: "opacity, transform",
              transitionDuration: durationS,
              transitionTimingFunction: timingFn,
              transitionDelay: `${i * stagger}s`,
            }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      ref={containerRef}
      className="inline-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(1rem)",
        transition: `opacity ${durationS} ${timingFn}, transform ${durationS} ${timingFn}`,
      }}
    >
      {children}
    </span>
  );
}
