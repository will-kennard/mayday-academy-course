"use client";

import { useEffect, useRef, useState } from "react";

type DemoVideoProps = {
  src: string;
  label?: string;
};

export default function DemoVideo({
  src,
  label = "Product demo",
}: DemoVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (video) {
            void video.play().catch(() => {
              // Autoplay can be blocked; muted + playsInline usually works.
            });
          }
        } else if (video) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-6 w-full max-w-3xl overflow-hidden rounded-lg shadow-sm sm:mt-8"
    >
      <video
        ref={videoRef}
        className="aspect-video h-auto w-full bg-black/5 object-cover"
        muted
        loop
        playsInline
        preload={shouldLoad ? "auto" : "none"}
        aria-label={label}
        {...(shouldLoad ? { src } : {})}
      />
    </div>
  );
}
