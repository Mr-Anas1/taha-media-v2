"use client";
import React, { useEffect, useRef } from "react";
import { Pin, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot.jsx";

gsap.registerPlugin(ScrollTrigger);

const HeroWithRobot = ({ setIsHovering }) => {
  const heroSectionRef = useRef(null);
  const robotRef = useRef(null);
  const scrollOutRef = useRef(null);
  const textRef = useRef(null);
  const word1AnimRef = useRef(null);
  const word2AnimRef = useRef(null);

  const ROBOT_SCENE_URL =
    "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  useEffect(() => {
    if (!heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      // 🔹 Floating badge animation
      if (word1AnimRef.current && word2AnimRef.current) {
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
          delay: 0.2,
        });
      }


      

      // 🔹 Scroll reveal (robot container)
      if (scrollOutRef.current) {
        gsap.fromTo(
          scrollOutRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scrollOutRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 🔹 Split text animation
      if (textRef.current) {
        const split = new SplitType(textRef.current, {
          types: "lines",
        });

        gsap.from(split.lines, {
          y: 50,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        });
      }

      // 🔹 Robot entrance + premium motion
      if (robotRef.current) {
        gsap.fromTo(
          robotRef.current,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: robotRef.current,
              start: "top 85%",
            },
          }
        );

        // ✨ Floating + slight rotation
        gsap.to(robotRef.current, {
          y: -12,
          rotation: 2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // ✨ Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!robotRef.current) return;

      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;

      gsap.to(robotRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFDFD] py-14"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-50 rounded-full blur-[80px] opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-slate-100 rounded-full blur-[60px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left px-4 sm:px-0">
            
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-8 h-0.5 bg-blue-600" />
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                Welcome to Taha Media
              </span>
              <div className="w-8 h-0.5 bg-blue-600" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[5rem] xl:text-[5.5rem] font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
              
              <div ref={textRef} className="pb-2 text-center lg:text-left">
                We Create <br />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                
                <span
                  ref={word1AnimRef}
                  className="relative inline-block px-6 py-2 bg-blue-600 text-white -rotate-2 shadow-xl rounded-lg"
                >
                  Digital
                </span>

                <span
                  ref={word2AnimRef}
                  className="relative inline-block px-6 py-2 bg-slate-900 text-white rotate-2 shadow-xl rounded-lg"
                >
                  Experiences
                </span>

              </div>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your ideas into powerful digital solutions. We're your partner in innovation, design, and growth.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              
              <button className="group relative overflow-hidden px-8 py-4 bg-blue-600 text-white font-bold rounded-lg">
                <span className="relative z-10 flex items-center gap-2">
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

          {/* RIGHT */}
          <div className="order-1 lg:order-2 relative z-20 w-full flex justify-center lg:justify-end">
            <div
              ref={scrollOutRef}
              className="w-full max-w-[520px] md:max-w-[640px] h-[400px] md:h-[600px]  rounded-2xl overflow-hidden"
            >
              <InteractiveRobotSpline
                ref={robotRef}
                scene={ROBOT_SCENE_URL}
                className="w-full h-full"
              />
            </div>

            <div className="absolute -bottom-4 right-4 md:right-4 lg:bottom-2 lg:right-2 z-30 p-5 rounded-2xl w-40 sm:w-44 md:w-48 border-l-4 border-l-blue-600 bg-white/70 backdrop-blur-md shadow-lg mx-auto md:mx-0 overflow-visible">
          <h4 className="text-xl md:text-2xl font-extrabold text-slate-900">40+</h4>
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Brands Elevated
          </p>
        </div>
          </div>
        </div>

        {/* Floating Card */}
        
      </div>
    </section>
  );
};

export default HeroWithRobot;