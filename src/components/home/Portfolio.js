"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DogEarCard from "./DogEarCard";
import WorkSticker from "./WorkSticker";


const Portfolio = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  const handleViewMore = () => {
    const clientsSection = document.getElementById('clients');
    if (clientsSection) {
      clientsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const projects = [
    {
      img: "/images/work1.jpeg",
      title: "Arabian Garden",
      tag: "AI Video",
      rotation: "-rotate-2",
      offset: "",
    },
    {
      img: "/images/work2.jpeg",
      title: "Arasan Construction",
      tag: "Social Media",
      rotation: "rotate-1",
      offset: "md:translate-y-12",
    },
    {
      img: "/images/work3.jpeg",
      title: "Aruvi Bakery",
      tag: "Social Media",
      rotation: "rotate-3",
      offset: "",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Title Reveal Animation
      gsap.fromTo(
        titleWrapperRef.current,
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.8, 
          rotation: -5 // Start with a slight tilt
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0, // Snap to original rotation
          duration: 1.2,
          ease: "back.out(1.5)", // Creates a premium bouncy effect
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Staggered Portfolio Cards Reveal
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0, 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15, // Stagger effect
            scrollTrigger: {
              trigger: sectionRef.current, // Triggered by the section, not individual cards for a unified wave
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 lg:py-32 px-6 bg-[#FDFDFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Wrapper */}
        <div ref={titleWrapperRef} className="flex justify-center mb-20 lg:mb-28">
          <DogEarCard color="bg-blue-600" className="w-fit -rotate-2 shadow-xl shadow-blue-900/10">
            <h2 className="text-5xl font-black text-white italic tracking-tighter">
              our work
            </h2>
          </DogEarCard>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`will-change-transform ${project.offset}`}
              onMouseEnter={() => setIsHovering?.(true)}
              onMouseLeave={() => setIsHovering?.(false)}
            >
              <WorkSticker
                img={project.img}
                title={project.title}
                tag={project.tag}
                rotation={project.rotation}
                className="hover:scale-105 transition-transform duration-500 ease-out shadow-lg hover:shadow-2xl"
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={handleViewMore}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            className="group relative px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            <span className="relative z-10 flex items-center gap-2">
              View More
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default Portfolio;