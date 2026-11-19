"use client";

import { useLayoutEffect, useRef, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = HTMLAttributes<HTMLDivElement> & {
  scale?: number;
  speed?: number;
};

/** Keep the CSS-sized frame intact; animate only an oversized inner layer. */
export default function StableParallax({
  children,
  style,
  scale = 1.4,
  speed = 1.5,
  ...rest
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const zoom = Math.max(1, scale);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const travel = () =>
        ((frame.clientHeight * (zoom - 1)) / 2) *
        Math.min(1, Math.max(0, speed - 1));
      gsap.fromTo(
        layer,
        { y: () => -travel() },
        {
          y: travel,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, [zoom, speed]);

  return (
    <div {...rest} ref={frameRef} style={{ ...style, overflow: "hidden" }}>
      <div
        ref={layerRef}
        data-parallax-layer
        style={{
          position: "absolute",
          left: 0,
          top: `${-(zoom - 1) * 50}%`,
          width: "100%",
          height: `${zoom * 100}%`,
          backgroundImage: style?.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
