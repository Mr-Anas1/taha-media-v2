"use client";
import React, { useEffect, useRef } from "react";
import { Users, Target, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = ({ setIsHovering }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      if (textRef.current) {
        const split = new SplitType(textRef.current, {
          types: "words, lines, chars",
          tagName: "span",
        });

        gsap.from(split.lines, {
          y: 40,
          opacity: 0.3,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }

      // Stats animation
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        });
      }

      // Cards animation
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "40+", label: "Brands Elevated", icon: Users },
    { number: "8+", label: "Years Experience", icon: Award },
    { number: "100%", label: "Client Satisfaction", icon: Target },
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push boundaries and challenge conventions to create unique digital experiences that stand out.",
      color: "bg-blue-600",
    },
    {
      title: "Quality Driven",
      description: "Every project is crafted with meticulous attention to detail and unwavering commitment to excellence.",
      color: "bg-slate-900",
    },
    {
      title: "Client Success",
      description: "Your growth is our success. We build partnerships that last beyond project delivery.",
      color: "bg-blue-600",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-50 rounded-full blur-[80px] opacity-40 floating" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-slate-100 rounded-full blur-[60px] opacity-30 floating-delayed" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-0.5 bg-blue-600" />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              About Taha Media
            </span>
            <div className="w-8 h-0.5 bg-blue-600" />
          </div>
          
          <h2 ref={textRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
            We're a team of <span className="text-blue-600">creative thinkers</span> and <br />
            <span className="text-slate-900">digital innovators</span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for digital excellence, Taha Media has been transforming ideas into powerful digital experiences. We combine creativity with technology to help brands connect with their audience in meaningful ways.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="glass-card p-8 rounded-2xl relative group cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${value.color} rounded-t-2xl`} />
              
              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${value.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-6 h-6 bg-white rounded-sm" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
