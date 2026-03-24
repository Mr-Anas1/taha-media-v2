"use client";
import React, { useEffect, useRef } from "react";
import { Pin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const FinalCTA = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const word1AnimRef = useRef(null);
  const word2AnimRef = useRef(null);
  const flyingManRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (word1AnimRef.current) {
        gsap.to(word1AnimRef.current, {
          y: -15,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (word2AnimRef.current) {
        gsap.to(word2AnimRef.current, {
          y: 15,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      if (flyingManRef.current) {
        gsap.set(flyingManRef.current, {
          xPercent: -50,
          yPercent: -50,
          left: "0%",
          top: "100%",
          x: -60,
          y: 80,
          rotate: -10,
          autoAlpha: 0,
          transformOrigin: "center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(flyingManRef.current, {
          autoAlpha: 1,
          duration: 0.05,
          ease: "none",
        });

        tl.to(
          flyingManRef.current,
          {
            keyframes: [
  { left: "10%", top: "90%", x: 0, y: 0, rotate: -5 },
  { left: "25%", top: "70%", x: 20, y: -30, rotate: 5 },
  { left: "45%", top: "55%", x: 10, y: -20, rotate: 8 },
  { left: "65%", top: "35%", x: -10, y: -25, rotate: 12 },
  { left: "80%", top: "20%", x: 15, y: -15, rotate: 6 },
  { left: "95%", top: "10%", x: 0, y: -10, rotate: 0 },
],
            ease: "none",
            duration: 1,
          },
          "<",
        );

        tl.to(
          flyingManRef.current,
          {
            autoAlpha: 0,
            duration: 0.1,
            ease: "none",
          },
          0.92,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return(
    <section ref={sectionRef} className="py-40 px-6 bg-slate-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <path
              d="M0,50 Q250,0 500,50 T1000,50"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="10,10"
            />
          </svg>
        </div>

        <div
          ref={flyingManRef}
          className="absolute z-20 pointer-events-none"
        >
          <img
            src="/images/man-flying.webp"
            alt="Flying Man"
            className="w-32 sm:w-44 md:w-52 lg:w-72 h-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)]"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-9xl font-black text-blue-950 tracking-tighter leading-[0.8] mb-12">
            let's works <br />
            /together{" "}
            <span ref={word1AnimRef} className="relative inline-block px-4 py-2 bg-blue-600 text-white rotate-1 mx-2">
              stay.
            </span>{" "}
            <br />
            <span ref={word2AnimRef} className="relative z-99 inline-block px-4 py-2 bg-blue-950 text-white -rotate-2 mt-4">
              creative
            </span>
          </h2>

          <div className="flex justify-center mt-12">
            <button
              className="relative px-12 py-6 bg-blue-950 text-white rounded-md text-2xl font-black shadow-2xl hover:scale-105 transition-transform"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Start a Project
              <Pin
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-blue-600"
                size={32}
              />
            </button>
          </div>
        </div>
      </section>
  )
};

export default FinalCTA;
