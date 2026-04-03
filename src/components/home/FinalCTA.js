"use client";
import React, { useEffect, useRef } from "react";
import { Pin, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = ({ setIsHovering, onContactClick }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const word1AnimRef = useRef(null);
  const word2AnimRef = useRef(null);
  const flyingManRef = useRef(null);
  const buttonRef = useRef(null);
  const magneticButtonRef = useRef(null);
  const bgTextRef = useRef(null);

  const anims = useRef({});

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. STYLED TEXT REVEAL (Character Masking)
      if (textRef.current) {
        const split = new SplitType(textRef.current, { types: "lines, chars" });
        gsap.set(split.lines, { overflow: "hidden" });
        
        gsap.from(split.chars, {
          yPercent: 100,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        });
      }

      // 2. BOUNCING BADGES
      gsap.to(word1AnimRef.current, {
        y: -15, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(word2AnimRef.current, {
        y: 15, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3,
      });

      // 3. CURVED FLYING MAN PATH (Dynamic "S" Curve)
      if (flyingManRef.current) {
        gsap.set(flyingManRef.current, {
          left: "-10%", top: "100%", rotate: -15, opacity: 0
        });

        const flightTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        flightTl.to(flyingManRef.current, {
          opacity: 1,
          duration: 0.1,
        }).to(flyingManRef.current, {
          keyframes: [
            { left: "15%", top: "70%", rotate: -5, x: 0, y: 0 },
            { left: "45%", top: "40%", rotate: 10, x: 20, y: -20 },
            { left: "75%", top: "20%", rotate: 0, x: -10, y: 10 },
            { left: "110%", top: "0%", rotate: -10, x: 0, y: 0 }
          ],
          ease: "none",
          duration: 1,
        });
      }

      // 4. PARALLAX BACKGROUND TEXT
      gsap.to(bgTextRef.current, {
        xPercent: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 5. MAGNETIC BUTTON SETUP
      anims.current.btnX = gsap.quickTo(magneticButtonRef.current, "x", { duration: 0.3, ease: "power3.out" });
      anims.current.btnY = gsap.quickTo(magneticButtonRef.current, "y", { duration: 0.3, ease: "power3.out" });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!magneticButtonRef.current) return;
    const rect = magneticButtonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Apply 30% strength pull
    anims.current.btnX?.(x * 0.35);
    anims.current.btnY?.(y * 0.35);
  };

  const handleMouseLeave = () => {
    setIsHovering?.(false);
    anims.current.btnX?.(0);
    anims.current.btnY?.(0);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-40 px-6 bg-[#FDFDFD] text-center relative overflow-hidden">
      
      {/* Parallax Background Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-slate-100/50 whitespace-nowrap pointer-events-none select-none z-0 uppercase"
      >
        Transform Your Business Transform Your Business
      </div>

      {/* Decorative Flying Man */}
      <div ref={flyingManRef} className="absolute z-20 pointer-events-none w-32 sm:w-52 lg:w-72">
        <img
          src="/images/man-flying.webp"
          alt="Flying Man"
          className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] animate-pulse"
          style={{ animationDuration: '3s' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="inline-flex items-center gap-2 mb-8 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
          <Sparkles size={14} className="text-blue-600" />
          <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Ready to Transform?</span>
        </div>

        <h2 className="text-6xl md:text-9xl font-black text-slate-950 tracking-tighter leading-[0.8] mb-12">
          <div ref={textRef}>
            Let's Build Your <br />
            Digital Success
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <span ref={word1AnimRef} className="relative inline-block px-6 py-2 bg-blue-600 text-white rotate-1 shadow-xl rounded-lg text-4xl md:text-6xl">
              Together
            </span>
            <span ref={word2AnimRef} className="relative inline-block px-6 py-2 bg-slate-900 text-white -rotate-2 shadow-xl rounded-lg text-4xl md:text-6xl">
              Today
            </span>
          </div>
        </h2>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-16 leading-relaxed font-medium">
          Ready to leverage AI-powered digital solutions for your brand? Taha Media is here to transform your vision into reality with cutting-edge technology and proven strategies.
        </p>

        {/* Magnetic Button Container */}
        <div 
          className="inline-block p-10 -m-10" 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave}
        >
          <button
            ref={magneticButtonRef}
            className="group relative px-12 py-6 bg-slate-900 text-white rounded-full text-xl font-bold shadow-2xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsHovering?.(true)}
            onClick={onContactClick}
          >
            <span className="relative z-10 flex items-center gap-3">
              Start a Project
              <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" />
            </span>
            
            {/* Liquid Background Fill */}
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <Pin
              className="absolute -top-1 right-8 text-blue-400 opacity-30 rotate-12"
              size={24}
            />
          </button>
        </div>
      </div>

      {/* Background Decorative Particles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default FinalCTA;