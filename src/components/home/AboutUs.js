"use client";
import React, { useEffect, useRef, useState } from "react";
import { Users, Target, Award, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";


const AboutUs = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const bgTextRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // 1. UNIVERSAL ANIMATIONS (All Screens)
    const ctx = gsap.context(() => {
      // Set initial background text position
      gsap.set(bgTextRef.current, {
        position: "absolute",
        top: "10%",
        left: "0%",
        opacity: 0.1,
        zIndex: 0
      });

      // Background text horizontal parallax - desktop only to reduce mobile repaint
      const isMobileScreen = window.matchMedia('(max-width: 768px)').matches;
      if (!isMobileScreen) {
        gsap.to(bgTextRef.current, {
          xPercent: -30,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Liquid Title Animation
      const titleSplit = new SplitType(".about-title", { types: "chars" });
      gsap.from(titleSplit.chars, {
        opacity: 0,
        y: 30,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 85%",
        },
      });

      // Count-up Animation for Stats
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat) => {
        const endValue = parseInt(stat.getAttribute("data-value"));
        gsap.to(stat, {
          innerText: endValue,
          duration: 2.5,
          snap: { innerText: 1 }, // Forces integers
          ease: "expo.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 95%",
          },
        });
      });
    }, sectionRef);

    // 2. DESKTOP SPECIFIC (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      // Enhanced background text for desktop
      gsap.set(bgTextRef.current, { opacity: 0.15 });
      
      gsap.to(bgTextRef.current, {
        xPercent: -50,
        opacity: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Sticky Left Column
      gsap.to(leftColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
        },
      });
    });

    // 3. MOBILE SPECIFIC (max-width: 1023px)
    mm.add("(max-width: 1023px)", () => {
      // Header Content Slide Up
      gsap.from(".about-header-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-header-content",
          start: "top 90%",
        }
      });

      // Staggered Card Reveal
      const mobileCards = gsap.utils.toArray(".mobile-card");
      mobileCards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          rotate: i % 2 === 0 ? -2 : 2, // Alternating subtle tilt
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Subtle BG Text Movement for mobile
      gsap.to(bgTextRef.current, {
        xPercent: -15,
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const stats = [
    { number: "40", label: "Brands Elevated", suffix: "+" },
    { number: "3", label: "Years Experience", suffix: "+" },
    { number: "100", label: "Satisfaction", suffix: "%" },
  ];

  const values = [
    { title: "Innovation First", desc: "We push boundaries and challenge conventions to create unique digital experiences.", icon: "01" },
    { title: "Quality Driven", desc: "Meticulous attention to detail and unwavering commitment to excellence.", icon: "02" },
    { title: "Client Success", desc: "We build partnerships that last beyond project delivery.", icon: "03" },
    { title: "Future Ready", desc: "We anticipate trends and build solutions that evolve with technology.", icon: "04" },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-20 lg:py-40 px-6 bg-white overflow-hidden">
      
      {/* Background Parallax Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-10 lg:top-20 left-0 text-[25vw] lg:text-[18vw] font-black text-slate-100 select-none whitespace-nowrap -z-10 pointer-events-none uppercase"
      >
        Taha Media Digital
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Column (Sticky on Desktop) */}
        <div ref={leftColRef} className="lg:w-1/2 lg:h-fit about-header-content">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-100 bg-blue-50 text-blue-600 font-bold text-[10px] lg:text-xs uppercase tracking-widest">
            Who we are
          </div>
          <h2 className="about-title text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] mb-8">
            CRAFTING <br />
            <span className="text-blue-600">DIGITAL</span> <br />
            LEGACIES.
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-md">
            Taha Media is a creative powerhouse where technology meets art to build brands that matter.
          </p>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-10">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl lg:text-3xl font-black text-slate-900 flex items-baseline">
                  <span className="stat-number" data-value={stat.number}>0</span>
                  <span className="text-blue-600">{stat.suffix}</span>
                </div>
                <div className="text-[9px] lg:text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Scrolling Cards) */}
        <div ref={cardsContainerRef} className="lg:w-1/2 space-y-4 lg:space-y-6">
          {values.map((value, i) => (
            <div 
              key={i}
              className="mobile-card group p-8 lg:p-16 bg-slate-50 rounded-[2rem] lg:rounded-[2.5rem] 
                         hover:bg-blue-600 active:scale-[0.98] transition-all duration-500 
                         cursor-pointer lg:cursor-none border border-transparent hover:border-blue-400"
              onMouseEnter={() => window.innerWidth >= 1024 && setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex justify-between items-start mb-10 lg:mb-12">
                <span className="text-xs lg:text-sm font-black text-blue-600 group-hover:text-blue-200 transition-colors uppercase">
                  {value.icon}
                </span>
                
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-white mb-4 transition-colors uppercase tracking-tighter">
                {value.title}
              </h3>
              <p className="text-sm lg:text-lg text-slate-600 group-hover:text-blue-100 transition-colors leading-snug lg:leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;