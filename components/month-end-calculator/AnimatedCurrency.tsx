"use client";

import { useEffect, useRef } from "react";
import { formatCurrency, roundCost } from "@/lib/month-end-calculator";

export default function AnimatedCurrency({
  value,
  animate,
  onComplete,
}: {
  value: number;
  animate: boolean;
  onComplete?: () => void;
}) {
  const displayValue = roundCost(value);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (!animate) {
      node.textContent = formatCurrency(displayValue);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      node.textContent = formatCurrency(displayValue);
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }

    let frame = 0;
    const durationMs = 900;
    const start = performance.now();
    node.textContent = formatCurrency(0);

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round((displayValue * eased) / 10) * 10;
      if (node) {
        node.textContent = formatCurrency(current);
      }
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, displayValue, onComplete]);

  return (
    <span ref={nodeRef}>
      {formatCurrency(animate ? 0 : displayValue)}
    </span>
  );
}
