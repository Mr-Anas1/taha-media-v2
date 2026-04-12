"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ClientsSection = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeTween = useRef(null);

  // Sample client data
  const clients = [
    { name: "AXS Construction", logo: "/images/axs.jpg", link: "https://www.instagram.com/axsarchitects://axsconstruction.com" },
    { name: "Pragaspathi Audit", logo: "/images/audit.jpg", link: "https://www.instagram.com/pragaspathi_audit" },
    { name: "Aruvi Bakery", logo: "/images/aruvi.jpg", link: "https://www.instagram.com/aruvibakeryandsweets" },
    { name: "Sarah Jwellers", logo: "/images/sarah.jpg", link: "https://www.instagram.com/sarah_jewellers_" },
    { name: "Arassan Construction", logo: "/images/arasan.jpg", link: "https://www.instagram.com/arasan__constructions" },
    { name: "Phd Snacks", logo: "/images/phdsnacks.jpg", link: "https://www.instagram.com/ph.dsnacks" },
    { name: "Dr. Gayathri Nagenthran", logo: "/images/doctor.jpg" , link: "https://www.instagram.com/dr.gayathri_nagenthran"},
    { name: "Taxpuram", logo: "/images/taxpuram.jpg" , link: "https://www.instagram.com/taxpuram"},
    { name: "Amudhu Karupatti Coffee", logo: "/images/amudhukarupatticoffee.jpg" , link: "https://www.instagram.com/amudhukarupatticoffee"},
    { name: "Phd PaniPuri", logo: "/images/phdpanipuri.jpg" , link: "https://www.instagram.com/ph.dpanipuri"},
    { name: "Prime Link Global", logo: "/images/primelink.jpg" , link: "https://www.instagram.com/primelink_global"},
  ];

  // Quadruple the array to ensure it fills ultra-wide screens smoothly
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Signature Typography Reveal
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
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      gsap.from(".client-sub", {
        y: 20, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });

      // 2. High-Performance Infinite Marquee
      // By translating the entire container by -50%, we loop the duplicated arrays seamlessly
      if (marqueeRef.current) {
        marqueeTween.current = gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 35, // Adjust for speed (higher = slower)
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause/Play handlers for interactive polish
  const handleMouseEnter = () => {
    gsap.to(marqueeTween.current, { timeScale: 0.2, duration: 0.5, ease: "power2.out" });
    setIsHovering?.(true);
  };

  const handleMouseLeave = () => {
    gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.5, ease: "power2.out" });
    setIsHovering?.(false);
  };

  return (
    <section ref={sectionRef} id="clients" className="py-24 lg:py-32 bg-[#FDFDFD] border-y border-slate-100 overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 lg:mb-20">
        <div className="client-sub inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm border border-blue-100">
          <Users size={14} strokeWidth={2.5} />
          Our Clients
        </div>
        
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
         Some Of Our <br className="md:hidden" />
          <span className="text-blue-600">Clients Work.</span>
        </h2>
        
        <p className="client-sub text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Helping businesses grow with strategies that deliver real results.
        </p>
      </div>

      {/* Infinite Scrolling Marquee Container */}
      <div 
        className="relative w-full flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Seamless Edge Gradients */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#FDFDFD] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#FDFDFD] to-transparent z-20 pointer-events-none" />
        
        {/* GSAP Animated Track */}
        <div ref={marqueeRef} className="flex gap-6 md:gap-8 w-max px-4 will-change-transform">
          {duplicatedClients.map((client, index) => (
            <a
              key={`${client.name}-${index}`}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group w-[200px] md:w-[280px] block"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center aspect-[4/3] h-full">
                
                <div className="w-full h-16 md:h-20 flex items-center justify-center mb-4">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl md:text-3xl font-black text-white">
                        {client.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="h-px w-8 bg-slate-200 group-hover:bg-blue-600 group-hover:w-16 transition-all duration-500 mb-4" />
                
                <p className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                  {client.name}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;