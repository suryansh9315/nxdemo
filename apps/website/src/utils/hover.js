"use client";
import { useState, useEffect } from "react";

export default function useHover3d(ref, { x = 0, y = 0, z = 0 }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e) => {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      const rect = ref.current.getBoundingClientRect();
      const xCoord = (e.clientX - rect.left - width / 2) / width;
      const yCoord = (e.clientY - rect.top - height / 2) / height;
      setCoords({ x: xCoord, y: yCoord });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const current = ref.current;
    current.addEventListener("mousemove", handleMouseMove);
    current.addEventListener("mouseenter", handleMouseEnter);
    current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      current.removeEventListener("mousemove", handleMouseMove);
      current.removeEventListener("mouseenter", handleMouseEnter);
      current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  const { x: xCoord, y: yCoord } = coords;

  const xTransform = isHovering ? xCoord * x : 0;
  const yTransform = isHovering ? yCoord * y : 0;
  const zTransform = isHovering ? z : 0;

  const transform = `perspective(1000px) rotateX(${yTransform}deg) rotateY(${-xTransform}deg) translateZ(${zTransform}px)`;
  const transition = isHovering ? "none" : "all 0.5s ease";

  return { transform, transition };
}
