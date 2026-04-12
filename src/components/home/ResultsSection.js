"use client";
import React, { useEffect, useRef } from "react";
import { TrendingUp, Users, Eye, ArrowUpRight, BarChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ResultsSection = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const headerWrapperRef = useRef(null);

  const results = [
    {
      name: "AXS Architect",
      stat: "3.0M",
      metric: "Views",
      sub: "+25K Followers",
      desc: "Achieved massive reach through strategic content on Meta.",
    },
    {
      name: "Dr. N. Gayathri",
      stat: "5.0M",
      metric: "Views",
      sub: "+6.5K Followers",
      desc: "High engagement growth in just 60 days.",
    },
    {
      name: "Pragaspathi Audit",
      stat: "150K",
      metric: "Views",
      sub: "+15K Followers",
      desc: "Transformed brand visibility in the financial sector.",
    },
    // {
    //   name: "Sri Venkateswara",
    //   stat: "1.2M",
    //   metric: "Views",
    //   sub: "+8K Followers",
    //   desc: "Educational content reaching millions of students.",
    // },
    // {
    //   name: "Madhav Silks",
    //   stat: "800K",
    //   metric: "Views",
    //   sub: "+12K Followers",
    //   desc: "Traditional brand modernized for a digital audience.",
    // },
    // {
    //   name: "Vasan Eye Care",
    //   stat: "3.5M",
    //   metric: "Views",
    //   sub: "+20K Followers",
    //   desc: "Healthcare awareness campaigns with massive impact.",
    // }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Pill & Description Fade
      gsap.from(".results-sub", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerWrapperRef.current,
          start: "top 80%",
        }
      });

      // 2. Liquid Typography Reveal
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "lines, chars", tagName: "span" });
        gsap.set(split.lines, { overflow: "hidden", paddingBottom: "0.2em", marginBottom: "-0.2em" });
        
        gsap.from(split.chars, {
          yPercent: 100,
          rotationZ: 5,
          opacity: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "power4.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: headerWrapperRef.current,
            start: "top 80%",
          }
        });
      }

      // 3. Staggered Cards Reveal
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            delay: (index % 3) * 0.1 // Stagger by column
          }
        );

        // 4. Data Bar Animation
        const dataBar = card.querySelector('.data-bar');
        gsap.fromTo(dataBar, 
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
            delay: ((index % 3) * 0.1) + 0.4
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 bg-[#FDFDFD] relative overflow-hidden border-y border-slate-100">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0">
        <div className="w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div ref={headerWrapperRef} className="text-center mb-20 lg:mb-24">
          <div className="results-sub inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm border border-slate-100">
            <TrendingUp size={14} strokeWidth={2.5} />
            Proven Impact
          </div>
          <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter leading-[0.85] mb-6">
            Results That <span className="text-blue-600">Speak.</span>
          </h2>
          <p className="results-sub text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            We don't guess. We deliver measurable growth, undeniable engagement, and real impact for our clients.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {results.map((result, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-white p-8 lg:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
              onMouseEnter={() => setIsHovering?.(true)}
              onMouseLeave={() => setIsHovering?.(false)}
            >
              {/* Header: Client Name & Diagonal Arrow */}
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {result.name}
                </h3>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2.5} />
                </div>
              </div>

              {/* Main Metric */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-6xl font-black text-slate-900 tracking-tighter">
                    {result.stat}
                  </div>
                  <div className="text-lg font-bold text-slate-400 uppercase tracking-widest">
                    {result.metric}
                  </div>
                </div>

                {/* Animated Data Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="data-bar h-full bg-blue-600 rounded-full transform origin-left" />
                </div>
                
                <div className="flex items-center justify-between text-sm font-bold">
                  <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    <Users size={14} strokeWidth={2.5} />
                    <span>{result.sub}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 uppercase tracking-wider text-[10px]">
                    <BarChart size={12} />
                    Growth
                  </div>
                </div>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {result.desc}
              </p>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-slate-700 rounded-full text-xs font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            50+ Successful Campaigns Delivered
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;