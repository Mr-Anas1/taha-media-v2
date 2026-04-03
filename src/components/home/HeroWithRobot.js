"use client";
import React, { useEffect, useRef, useState } from "react";
import { Pin, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot.jsx";


const HeroWithRobot = ({ setIsHovering, onContactClick }) => {
  const heroSectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Separation of concerns for animations
  const robotFloatRef = useRef(null);
  const robotParallaxRef = useRef(null);
  
  const scrollOutRef = useRef(null);
  const textRef = useRef(null);
  const word1AnimRef = useRef(null);
  const word2AnimRef = useRef(null);

  const ROBOT_SCENE_URL =
    "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  // Detect mobile once on mount
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  // --- 1. MAIN GSAP TIMELINES ---
  useEffect(() => {
    if (!heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      // 🔹 Floating badge animation
      if (word1AnimRef.current && word2AnimRef.current) {
        gsap.to(word1AnimRef.current, {
          y: -15, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(word2AnimRef.current, {
          y: 15, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2,
        });
      }

      // 🔹 Scroll reveal (Right side container)
      if (scrollOutRef.current) {
        gsap.fromTo(
          scrollOutRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: scrollOutRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 🔹 Split text animation
      if (textRef.current) {
        const split = new SplitType(textRef.current, { types: "lines" });
        gsap.from(split.lines, {
          y: 50, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        });
      }

      // 🔹 Robot Entrance + Continuous Float (Attached to inner wrapper)
      if (robotFloatRef.current) {
        gsap.fromTo(
          robotFloatRef.current,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 1.4, ease: "power3.out",
            scrollTrigger: {
              trigger: robotFloatRef.current,
              start: "top 85%",
            },
          }
        );

        gsap.to(robotFloatRef.current, {
          y: -12, rotation: 2, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // --- 2. HIGH-PERFORMANCE MOUSE PARALLAX (Desktop Only) ---
  useEffect(() => {
    // Skip on touch devices - mouse parallax is meaningless and wastes CPU
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice || !robotParallaxRef.current) return;

    const xTo = gsap.quickTo(robotParallaxRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(robotParallaxRef.current, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFDFD] py-14"
    >
      {/* Background - blur effects hidden on mobile for perf */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-blue-50 rounded-full blur-[60px] opacity-40 hidden sm:block" />
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-slate-100 rounded-full blur-[40px] opacity-30 hidden sm:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* LEFT COLUMN */}
          <div className="order-2 lg:order-1 text-center lg:text-left px-4 sm:px-0">
            
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-8 h-0.5 bg-blue-600" />
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                Fastest Growing Agency in Tamil Nadu
              </span>
              <div className="w-8 h-0.5 bg-blue-600" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
              <div ref={textRef} className="pb-2 text-center lg:text-left">
                Digital Excellence <br />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span ref={word1AnimRef} className="relative inline-block px-6 py-2 bg-blue-600 text-white -rotate-2 shadow-xl rounded-lg">
                  for Modern
                </span>
                <span ref={word2AnimRef} className="relative inline-block px-6 py-2 bg-slate-900 text-white rotate-2 shadow-xl rounded-lg">
                  Brands
                </span>
              </div>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Taha Media delivers cutting-edge digital solutions with AI-powered automation, personalized branding, and results-driven marketing strategies that transform businesses.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                className="group relative overflow-hidden px-8 py-4 bg-blue-600 text-white font-bold rounded-lg"
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
                onClick={onContactClick}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project
                  <Pin size={16} className="rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                View Our Work
                <Zap size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="order-1 lg:order-2 relative z-20 w-full flex justify-center lg:justify-end">
            <div
              ref={scrollOutRef}
              className="w-full max-w-[520px] md:max-w-[640px] h-[400px] md:h-[600px] rounded-2xl relative"
            >
              {/* Outer Wrapper: Handles Mouse Parallax */}
              <div ref={robotParallaxRef} className="w-full h-full will-change-transform">
                
                {/* Inner Wrapper: Handles Entry & Float */}
                <div ref={robotFloatRef} className="w-full h-full will-change-transform rounded-2xl overflow-hidden">
                  {/* Load heavy Spline only on desktop; show a lightweight image on mobile */}
                  {isMobile ? (
                    <div className="w-full h-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 overflow-hidden">
                      <img
                        src="/images/guy-thinking.webp"
                        alt="Digital Excellence"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                      />
                    </div>
                  ) : (
                    <InteractiveRobotSpline
                      scene={ROBOT_SCENE_URL}
                      className="w-full h-full"
                    />
                  )}
                </div>

              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-4 right-4 md:right-4 lg:bottom-2 lg:right-2 z-30 p-5 rounded-2xl w-40 sm:w-44 md:w-48 border-l-4 border-l-blue-600 bg-white/70 backdrop-blur-md shadow-lg mx-auto md:mx-0 overflow-visible">
                <h4 className="text-xl md:text-2xl font-extrabold text-slate-900">40+</h4>
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Brands Elevated
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements - hidden on mobile to reduce paint cost */}
        <div className="absolute top-6 right-1/4 w-3 h-3 bg-blue-600 rounded-full hidden sm:block floating-ui" />
        <div className="absolute bottom-1/3 right-0 w-2 h-2 bg-slate-200 rounded-full hidden sm:block floating-delayed-ui" />

        <div className="absolute top-1/2 left-0 z-10 opacity-20 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0L33.5 26.5L60 30L33.5 33.5L30 60L26.5 33.5L0 30L26.5 26.5L30 0Z" fill="#1e293b" />
          </svg>
        </div>
      </div>
      
    </section>
  );
};

export default HeroWithRobot;