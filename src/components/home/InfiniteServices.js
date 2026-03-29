"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const services = [
  "UI/UX Design",
  "Branding",
  "Strategy",
  "Web Development",
  "Mobile Apps",
  "E‑Commerce",
  "SEO & Growth",
  "Content Creation",
  "Digital Marketing",
  "Product Design",
  "Animation & Motion",
  "Consulting",
];

const InfiniteServices = () => {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!innerRef.current) return;

    const ctx = gsap.context(() => {
      const inner = innerRef.current;
      const totalWidth = inner.scrollWidth;
      const halfWidth = totalWidth / 2;

      gsap.set(inner, {
        x: 0,
      });

      const tl = gsap.timeline({ repeat: -1, ease: "none" });
      tl.to(inner, {
        x: -halfWidth,
        duration: 90,
        ease: "none",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;
    
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <section className="overflow-hidden">
      <div 
        ref={wrapperRef} 
        className="relative w-full scrolling-text-container"
        onMouseMove={handleMouseMove}
      >
        {/* Glowing Circle */}
        <div
          className="glowing-circle"
          style={{
            transform: `translate(${mousePosition.x - 150}px, ${mousePosition.y - 150}px)`,
          }}
        />
        <div ref={innerRef} className="flex whitespace-nowrap py-20 md:py-35 lg:py-40">
          {/* Render twice for seamless loop */}
          {[...services, ...services].map((service, idx) => (
            <span
              key={idx}
              className="inline-block mx-12 text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteServices;
