"use client";
import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Globe, Rocket, Star, Trophy, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactPopup from "@/components/ui/ContactPopup";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  
  const pageRef = useRef(null);
  const heroTitleRef = useRef(null);
  const founderRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. MASSIVE HERO TEXT MASK REVEAL (Editorial Style)
      gsap.from(".huge-text-mask", {
        y: 120,
        opacity: 0,
        rotationX: -15,
        transformPerspective: 1000,
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.1,
      });

      // Tiny Captions Fade
      gsap.from(".hero-caption", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });

      // Secondary "Modern Experiences" Reveal
      if (heroTitleRef.current) {
        const split = new SplitType(heroTitleRef.current, { types: "lines, words", tagName: "span" });
        gsap.set(split.lines, { overflow: "hidden", paddingBottom: "0.2em", marginBottom: "-0.2em" });
        
        gsap.from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out",
          delay: 0.8,
        });
      }

      // 2. FOUNDER SECTION
      if (founderRef.current) {
        gsap.to(".bg-giant-text", {
          xPercent: -15,
          scrollTrigger: {
            trigger: founderRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        gsap.from(".founder-header", {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: founderRef.current, start: "top 80%" }
        });

        gsap.from(".founder-quote", {
          x: -40, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: founderRef.current, start: "top 75%" }
        });

        gsap.from(".founder-image", {
          y: 60, opacity: 0, scale: 0.95, duration: 1, ease: "expo.out", delay: 0.1,
          scrollTrigger: { trigger: founderRef.current, start: "top 75%" }
        });

        gsap.from(".founder-stat", {
          x: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: founderRef.current, start: "top 75%" }
        });

        const founderCounters = gsap.utils.toArray(".founder-count");
        founderCounters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power3.out",
            scrollTrigger: { trigger: counter, start: "top 85%" }
          });
        });
      }

      // 3. DYNAMIC TIMELINE LINE
      if (timelineLineRef.current && timelineRef.current) {
        gsap.fromTo(timelineLineRef.current, 
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            }
          }
        );

        const timelineItems = gsap.utils.toArray(".timeline-item");
        timelineItems.forEach((item) => {
          gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          });
        });
      }

      // 4. MOMENTS GALLERY REVEAL
      const momentCards = gsap.utils.toArray(".moment-card");
      if (momentCards.length > 0) {
        gsap.from(momentCards, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".moments-container",
            start: "top 80%",
          }
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const timelineData = [
  {
    year: "2023",
    title: "Started",
    description: "Taha Media began its journey with a vision to transform digital experiences.",
    icon: Star,
    color: "text-blue-600 bg-blue-50 border-blue-200"
  },
  {
    year: "2024",
    title: "Award Winner",
    description: "Recognized as the Best Digital Marketer in Tamil Nadu for innovative and results-driven strategies.",
    icon: Trophy,
    color: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    year: "2025",
    title: "Design & Development",
    description: "Expanded into web design and development, building high-performance websites alongside marketing solutions.",
    icon: Rocket,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200"
  },
  {
    year: "2026",
    title: "AI & Automation",
    description: "Evolving into a full-service digital agency, now building AI-powered tools and automation systems to scale businesses smarter.",
    icon: Globe,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200"
  }
];

  const moments = [
    { 
      id: 1, 
      img: "/images/moment1.jpeg", 
      caption: "Recieving Award", 
      category: "Culture", 
      span: "md:col-span-2 md:row-span-2" 
    },
    { 
      id: 2, 
      img: "/images/work2.jpeg", 
      caption: "Recording Podcast", 
      category: "Work", 
      span: "md:col-span-1 md:row-span-1" 
    },
    { 
      id: 3, 
      img: "/images/moment2.jpeg", 
      caption: "Closing Clients", 
      category: "Clients", 
      span: "md:col-span-1 md:row-span-1" 
    },
    { 
      id: 4, 
      img: "/images/moment3.jpeg", 
      caption: "Behind The Scenes", 
      category: "Work", 
      span: "md:col-span-1 md:row-span-1" 
    },
    { 
      id: 5, 
      img: "/images/moment4.jpeg", 
      caption: "Guest Lecture", 
      category: "Work", 
      span: "md:col-span-2 md:row-span-1" 
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFDFD] font-sans">
      <Navbar
        setIsMenuOpen={setIsMenuOpen}
        setIsHovering={setIsHovering}
        showNavbar={true}
        isVisible={isVisible}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* Hero Section - Magazine / Editorial Layout */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto">
          
          {/* Huge Image-Masked Text */}
          <div className="flex flex-col w-full leading-[0.8] tracking-tighter uppercase font-black text-[22vw] sm:text-[18vw]">
            <div 
              className="huge-text-mask w-full text-left bg-cover bg-center bg-clip-text text-transparent"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
            >
              OUR
            </div>
            <div 
              className="huge-text-mask w-full text-right bg-cover bg-center bg-clip-text text-transparent"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')" }}
            >
              VISION
            </div>
          </div>

          {/* Tiny Captions (Magazine style spacing) */}
          <div className="flex justify-between items-center text-[9px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-900 mt-8 px-2 border-b border-slate-100 pb-4">
            <span className="hero-caption">Digital Innovation</span>
            <span className="hero-caption hidden md:block">Strategic Design</span>
            <span className="hero-caption text-right">Measurable Impact</span>
          </div>

          {/* Secondary Header & Paragraph */}
          <div className="mt-20 md:mt-32 max-w-7xl mx-auto">
            <h2 ref={heroTitleRef} className="text-5xl md:text-7xl lg:text-[7rem] font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Modern <br /> <span className="text-blue-600">Experiences</span>
            </h2>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="hidden md:block md:col-span-5 lg:col-span-7"></div>
              <p className="hero-caption text-lg md:text-xl text-slate-500 leading-relaxed font-medium md:col-span-7 lg:col-span-5">
                We're not just another digital agency. We're a team of passionate creators, 
                strategists, and innovators dedicated to transforming businesses through 
                cutting-edge digital solutions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        
        {/* Giant Parallax Background Text */}
        <div 
          className="bg-giant-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-slate-200/50 tracking-tighter pointer-events-none select-none z-0 whitespace-nowrap"
        >
          FOUNDER
        </div>

        <div ref={founderRef} className="max-w-7xl mx-auto relative z-10">
          
          <div className="founder-header text-center md:text-left mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm border border-slate-100">
              <Star size={14} /> Our Founder
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              <span className="text-blue-600">Afzal Rahman</span> CEO
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="founder-quote lg:col-span-3 order-2 lg:order-1">
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl font-black text-blue-100 font-serif opacity-70">"</span>
                <p className="relative z-10 text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                  This journey began with one simple decision: to start before I felt ready. I told myself I'd learn the rest along the way. And I did. Step by step, mistake by mistake, the path revealed itself — as it always does for anyone willing to keep going.
                </p>
              </div>
            </div>

            <div className="founder-image lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] lg:aspect-auto lg:h-[600px] rounded-[2.5rem] bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50 group">
                <img 
                  src="/images/afzal.webp" 
                  alt="Founder" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-500" />
              </div>
            </div>

            <div className="lg:col-span-3 order-3 lg:order-3 space-y-12">
              <div className="founder-stat">
                <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-2 flex items-baseline">
                  <span className="founder-count" data-target="200">0</span>
                  <span className="text-blue-600">+</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Successful Projects</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Over 200 successful projects delivered with uncompromised quality and care.
                </p>
              </div>

              <div className="founder-stat">
                <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-2 flex items-baseline">
                  <span className="founder-count" data-target="15">0</span>
                  <span className="text-blue-600">+</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Skilled Professionals</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Our dedicated team of 15+ experts ensures top-quality delivery.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
              Our <span className="text-blue-600">Journey.</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              From startup to industry leader, here's how we've grown and evolved over the years.
            </p>
          </div>
          
          <div ref={timelineRef} className="relative pb-10">
            <div className="absolute left-6 md:left-1/2 md:-ml-[2px] top-0 bottom-0 w-1 bg-slate-100 rounded-full">
              <div ref={timelineLineRef} className="w-full h-full bg-blue-600 rounded-full" />
            </div>
            
            <div className="space-y-16">
              {timelineData.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute left-6 top-8 w-6 border-t-2 border-dashed border-slate-200 md:hidden" />

                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className="bg-slate-50 p-8 rounded-3xl shadow-lg shadow-slate-200/20 border border-slate-100 hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border ${item.color}`}>
                          <Icon size={14} />
                          {item.year}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter mb-3">{item.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full shadow-[0_0_0_8px_rgba(255,255,255,1)] z-10" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Moments Section */}
      <section className="py-32 px-6 bg-[#FDFDFD] border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm border border-blue-100">
              <Star size={14} /> Behind The Scenes
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
              Our <span className="text-blue-600">Moments.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              A glimpse into our studio, our culture, and the people who make the magic happen every day.
            </p>
          </div>
          
          {/* Asymmetrical Bento Grid */}
          <div className="moments-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {moments.map((moment) => (
              <div 
                key={moment.id} 
                className={`moment-card group relative overflow-hidden rounded-[2rem] bg-slate-100 ${moment.span} cursor-pointer`}
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
              >
                {/* Image with slow zoom on hover */}
                <img 
                  src={moment.img} 
                  alt={moment.caption} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Caption Content sliding up on hover */}
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    {moment.category}
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-black tracking-tighter">
                    {moment.caption}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#FDFDFD] border-y border-slate-100 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm border border-blue-100">
            <Star size={14} /> Let's Connect
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-slate-900">
            Ready to Start Your <br />
            <span className="text-blue-600">Digital Journey?</span>
          </h2>
          <p className="text-xl text-slate-500 mb-12 font-medium">
            Let's collaborate to create something extraordinary for your brand.
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setIsContactOpen(true)}
              onMouseEnter={() => setIsHovering?.(true)}
              onMouseLeave={() => setIsHovering?.(false)}
              className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm overflow-hidden shadow-xl"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get in Touch</span>
              <ArrowRight size={16} className="relative z-10 text-blue-400 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center space-y-8 text-4xl font-black p-10 text-blue-950">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900">
            <X size={32} />
          </button>
          {[
            { name: 'Work', href: '/#portfolio' },
            { name: 'Services', href: '/#services' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/#contact' }
          ].map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 tracking-tighter">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutPage;