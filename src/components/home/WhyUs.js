"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { TrendingUp, Trophy, Globe, Briefcase, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WhyUs = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const stats = [
    {
      id: "01",
      prefix: "$",
      number: 812,
      suffix: "M+",
      label: "Money Raised",
      desc: "Total revenue impact generated for our clients through strategic digital initiatives.",
      icon: TrendingUp,
      delay: 0,
    },
    {
      id: "02",
      prefix: "",
      number: 12,
      suffix: "+",
      label: "Unicorn Awards",
      desc: "Recognized globally for excellence in design, development, and strategy.",
      icon: Trophy,
      delay: 0.1,
    },
    {
      id: "03",
      prefix: "",
      number: 400,
      suffix: "+",
      label: "Global Clients",
      desc: "Trusted by forward-thinking companies and enterprise brands worldwide.",
      icon: Globe,
      delay: 0.2,
    },
    {
      id: "04",
      prefix: "",
      number: 425,
      suffix: "+",
      label: "Projects Completed",
      desc: "Successfully launched platforms, campaigns, and digital products on time.",
      icon: Briefcase,
      delay: 0.3,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal (Slide up & fade)
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 2. Liquid Text Reveal for Title
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "lines, words", tagName: "span" });
        gsap.set(split.lines, { overflow: "hidden", paddingBottom: "0.2em", marginBottom: "-0.2em" });
        
        gsap.from(split.words, {
          yPercent: 100,
          opacity: 0,
          rotationZ: 3,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        });
      }

      // 3. Staggered Card Reveal
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: stats[index].delay,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 4. Number Count-Up Animation
      const counters = gsap.utils.toArray(".count-up");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        gsap.to(counter, {
          innerText: target,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: "expo.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="relative py-24 lg:py-32 bg-[#FDFDFD] overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-2xl">
            <div ref={headerRef} className="inline-flex items-center space-x-2 mb-6">
              <div className="w-8 h-0.5 bg-blue-600" />
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>
            
            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Recognize success. <br />
              <span className="text-blue-600">Strive for more.</span>
            </h2>
          </div>

          <button 
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            className="group relative flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-full font-bold text-sm overflow-hidden hover:border-blue-600 transition-colors duration-300"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
            <ArrowRight size={16} className="relative z-10 text-blue-600 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>

        {/* 2x2 Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
                className="group relative bg-white rounded-[2rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative hover gradient corner */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-300 font-black text-sm tracking-widest">
                      {stat.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-4 flex items-baseline">
                      <span className="text-blue-600 mr-1">{stat.prefix}</span>
                      <span className="count-up" data-target={stat.number}>0</span>
                      <span className="text-blue-600">{stat.suffix}</span>
                    </h3>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {stat.label}
                    </h4>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;