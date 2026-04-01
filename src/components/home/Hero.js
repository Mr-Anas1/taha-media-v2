"use client";
import React, { useEffect, useRef } from "react";
import { Pin, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ setIsHovering }) => {
  const heroSectionRef = useRef(null);
  const imageRef = useRef(null);
  const hoverAnimRef = useRef({});
  const scrollOutRef = useRef(null);
  
  // Text Animation Refs
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const word1AnimRef = useRef(null);
  const word2AnimRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current || !word1AnimRef.current || !word2AnimRef.current) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      
      // 1. PREMIUM TEXT REVEAL (Masked Character Stagger)
      if (textRef.current) {
        const split = new SplitType(textRef.current, {
          types: "lines, words, chars",
          tagName: "span",
        });

        // Set overflow hidden on the lines to create the "mask" effect
        gsap.set(split.lines, { overflow: "hidden" });

        gsap.from(split.chars, {
          yPercent: 100, // Slide up from bottom of the line
          rotationZ: 8,  // Slight tilt for an organic feel
          opacity: 0,
          duration: 0.8,
          stagger: 0.03, // Delay between each letter
          ease: "power4.out",
          delay: 0.1,
        });
      }

      // 2. SUBTITLE & BUTTON REVEAL
      gsap.from([subtitleRef.current, buttonRef.current], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8, // Wait for the main text to finish
      });

      // 3. BOUNCING TAGS ANIMATION
      gsap.to(word1AnimRef.current, {
        y: -15,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(word2AnimRef.current, {
        y: 15,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      });

      // 4. IMAGE ENTRY ANIMATION
      if (scrollOutRef.current) {
        gsap.set(scrollOutRef.current, { clearProps: "all", x: 0, opacity: 1, visibility: "visible" });
      }
      gsap.set(imageRef.current, { clearProps: "all", opacity: 1, visibility: "visible" });

      gsap.fromTo(
        imageRef.current,
        { x: 200, opacity: 0, y: 40, scale: 0.96, rotate: -2 },
        { x: 0, opacity: 1, y: 0, scale: 1, rotate: 0, duration: 2, ease: "power3.out", delay: 0.2 }
      );

      // FLOATING IMAGE
      gsap.to(imageRef.current, {
        y: -12,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });

      // 5. 3D HOVER EFFECT PREP
      gsap.set(imageRef.current, { transformPerspective: 800, transformOrigin: "center" });
      hoverAnimRef.current = {
        xTo: gsap.quickTo(imageRef.current, "x", { duration: 0.35, ease: "power3.out" }),
        yTo: gsap.quickTo(imageRef.current, "y", { duration: 0.35, ease: "power3.out" }),
        rXTo: gsap.quickTo(imageRef.current, "rotationX", { duration: 0.35, ease: "power3.out" }),
        rYTo: gsap.quickTo(imageRef.current, "rotationY", { duration: 0.35, ease: "power3.out" }),
      };

      // 6. SCROLL OUT PARALLAX
      if (heroSectionRef.current && scrollOutRef.current) {
        const createScrollOut = (offsetPx) => {
          gsap.to(scrollOutRef.current, {
            x: 220,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: `bottom bottom+=${offsetPx}`,
              end: `bottom 70%+=${offsetPx}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        };

        mm.add("(max-width: 767px)", () => createScrollOut(220));
        mm.add("(min-width: 768px)", () => createScrollOut(0));
      }
    }, heroSectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const handleImageMouseMove = (e) => {
    if (!scrollOutRef.current) return;
    const { xTo, yTo, rXTo, rYTo } = hoverAnimRef.current;
    if (!xTo || !yTo || !rXTo || !rYTo) return;

    const rect = scrollOutRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    
    xTo((relX - 0.5) * 26);
    yTo((relY - 0.5) * 18);
    rYTo((relX - 0.5) * 10);
    rXTo(-(relY - 0.5) * 8);
  };

  const handleImageMouseLeave = () => {
    const { xTo, yTo, rXTo, rYTo } = hoverAnimRef.current;
    if (!xTo || !yTo || !rXTo || !rYTo) return;
    xTo(0); yTo(0); rXTo(0); rYTo(0);
  };

  return (
    <section ref={heroSectionRef} className="min-h-screen pt-36 md:pt-44 px-6 relative">
      <div className="max-w-7xl mx-auto grid items-center gap-14 md:gap-10 md:grid-cols-2">
        <div className="relative text-left">
          <div className="absolute -top-10 -left-6 animate-pulse">
            <Zap className="text-blue-600 fill-blue-600" size={40} />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-black leading-[0.9] tracking-tighter text-blue-950">
            {/* Protected text container for SplitType */}
            <div ref={textRef} className="pb-2">
              <span className="text-blue-600">/</span>build <br />
              brands that win <span className="text-blue-600">—</span>
            </div>
            
            {/* Tags moved OUTSIDE the SplitType container to protect their refs */}
            <div className="mt-4 flex items-center flex-wrap">
              <span ref={word1AnimRef} className="relative inline-block px-4 py-2 bg-blue-600 text-white -rotate-2 mr-2 shadow-lg">
                Taha
              </span>
              <span ref={word2AnimRef} className="relative inline-block px-4 py-2 bg-slate-900 text-white rotate-2 shadow-lg">
                Media
              </span>
            </div>
          </h1>

          <div className="mt-10">
            <p ref={subtitleRef} className="text-slate-400 text-sm mb-4 font-bold uppercase tracking-widest">
              Let's start discussing your project
            </p>

            <button
              ref={buttonRef}
              className="px-10 py-4 bg-blue-950 text-white rounded-md text-lg font-bold shadow-2xl relative z-10 transition-transform hover:-translate-y-1"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Start a Project
              <div className="absolute top-0 right-0 p-1 opacity-50">
                <Pin size={16} />
              </div>
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-full min-h-[520px] md:min-h-[600px]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] bg-blue-50 rounded-full blur-[100px] opacity-60" />
            <div className="absolute top-14 right-0 w-56 h-56 md:w-64 md:h-64 border border-slate-100 rounded-full opacity-50 floating-delayed" />
          </div>

          <div className="absolute top-1/4 -right-4 md:-right-10 z-30 hidden sm:flex flex-col space-y-4">
            <div className="service-tag glass-card px-4 py-2 rounded-full text-sm font-bold text-slate-700 shadow-sm cursor-default flex items-center space-x-2 floating">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>UI/UX Design</span>
            </div>
            <div className="service-tag glass-card px-4 py-2 rounded-full text-sm font-bold text-slate-700 shadow-sm cursor-default flex items-center space-x-2 floating-delayed translate-x-12">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Branding</span>
            </div>
            <div className="service-tag glass-card px-4 py-2 rounded-full text-sm font-bold text-slate-700 shadow-sm cursor-default flex items-center space-x-2 floating-fast">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Strategy</span>
            </div>
          </div>

          <div className="relative z-20 w-full flex justify-center md:justify-end">
            <div
              ref={scrollOutRef}
              className="w-full max-w-[520px] md:max-w-[640px]"
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
            >
              <img
                ref={imageRef}
                src="/images/guy.webp"
                alt="Hero"
                className="w-full h-auto object-contain will-change-transform drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>

          <div className="absolute bottom-14 -left-2 md:-left-10 z-30 glass-card p-5 rounded-2xl w-44 sm:w-48 floating-fast border-l-4 border-l-blue-600">
            <h4 className="text-2xl font-extrabold text-slate-900">40+</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Brands Elevated
            </p>
          </div>

          <div className="absolute top-6 right-1/4 w-3 h-3 bg-blue-600 rounded-full floating-ui" />
          <div className="absolute bottom-1/3 right-0 w-2 h-2 bg-slate-200 rounded-full floating-delayed-ui" />
        </div>
      </div>
    </section>
  );
};

export default Hero;