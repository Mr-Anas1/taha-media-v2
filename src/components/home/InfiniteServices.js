"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const servicesRow1 = [
  "UI/UX Design", "Branding", "Strategy", "Web Development", "Mobile Apps", "E‑Commerce"
];

const servicesRow2 = [
  "SEO & Growth", "Content Creation", "Digital Marketing", "Product Design", "Animation", "Consulting"
];

const InfiniteServices = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const glowRef = useRef(null);
  
  const tl1 = useRef(null);
  const tl2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Setup Infinite Loops using xPercent for perfect responsiveness
      // Row 1: Moves Left
      tl1.current = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // Row 2: Moves Right (Starts at -50% and moves to 0%)
      gsap.set(row2Ref.current, { xPercent: -50 });
      tl2.current = gsap.to(row2Ref.current, {
        xPercent: 0,
        ease: "none",
        duration: 25, // Slightly different speed for parallax feel
        repeat: -1,
      });

      // 2. High-Performance Mouse Tracker for the Glow
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // Center the glow on the cursor
        xTo(e.clientX - rect.left - 200); 
        yTo(e.clientY - rect.top - 200);
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Slow down marquees on hover
  const handleMouseEnter = () => {
    gsap.to([tl1.current, tl2.current], { timeScale: 0.3, duration: 0.8, ease: "power2.out" });
    setIsHovering?.(true);
  };

  const handleMouseLeave = () => {
    gsap.to([tl1.current, tl2.current], { timeScale: 1, duration: 0.8, ease: "power2.out" });
    setIsHovering?.(false);
  };

  // Helper to render the looping text items
  const renderMarqueeItems = (services) => {
    // Quadruple the array to ensure it fills ultra-wide monitors before resetting
    const duplicatedServices = [...services, ...services, ...services, ...services];
    
    return duplicatedServices.map((service, idx) => (
      <div key={idx} className="flex items-center">
        <span 
          className={`text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase whitespace-nowrap px-6 lg:px-10 tracking-tighter
            ${idx % 2 === 0 ? 'text-slate-900' : 'text-transparent [-webkit-text-stroke:2px_#0f172a] opacity-60'}
          `}
        >
          {service}
        </span>
        <span className="text-blue-600 text-3xl md:text-5xl">✦</span>
      </div>
    ));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-[#FDFDFD] py-20 lg:py-32 cursor-default border-y border-slate-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* High-Performance Mouse Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          ref={glowRef}
          className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] will-change-transform"
          style={{ top: 0, left: 0 }}
        />
      </div>

      {/* Marquee Row 1 */}
      <div className="relative z-10 flex whitespace-nowrap mb-6 lg:mb-10 w-max">
        <div ref={row1Ref} className="flex w-max will-change-transform">
          {renderMarqueeItems(servicesRow1)}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative z-10 flex whitespace-nowrap w-max">
        <div ref={row2Ref} className="flex w-max will-change-transform">
          {renderMarqueeItems(servicesRow2)}
        </div>
      </div>

      {/* Subtle overlay gradients to fade the edges seamlessly */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#FDFDFD] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#FDFDFD] to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default InfiniteServices;