"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const AnimatedServices = ({ setIsHovering }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const services = [
    { title: "CONTENT CREATION", color: "bg-[#FDE7F0]", description: "Creating compelling content for all types of brands across social media, websites, and marketing campaigns." },
    { title: "PERSONAL BRANDING", color: "bg-[#A7F3D0]", description: "Our signature service - building powerful personal brands that stand out and drive meaningful connections." },
    { title: "WEBSITE & APP BUILDING", color: "bg-[#F9A8D4]", description: "Custom websites and mobile applications that deliver exceptional user experiences and drive business growth." },
    { title: "META & LINKEDIN ADS", color: "bg-[#DCFCE7]", description: "Targeted advertising campaigns on Meta and LinkedIn platforms that reach your ideal audience and convert." },
    { title: "GOOGLE ADS", color: "bg-[#FEF9C3]", description: "Strategic Google Ads campaigns that maximize ROI and put your brand in front of ready-to-buy customers." },
    { title: "SEO OPTIMIZATION", color: "bg-[#FBCFE8]", description: "Comprehensive SEO strategies that boost your search rankings and drive organic traffic to your business." },
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // --- DESKTOP ANIMATION (FAN + PINNING) ---
      const cards = cardsRef.current;
      
      gsap.set(cards, {
        xPercent: -50,
        y: 100,
        opacity: 0,
        transformOrigin: "50% 100%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          onLeaveBack: () => setActiveIndex(null),
        },
      });

      tl.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
      }).to(cards, {
        rotation: (i) => (i - (services.length - 1) / 2) * (50 / (services.length - 1)),
        x: (i) => (i - (services.length - 1) / 2) * 160,
        y: (i) => Math.abs(i - (services.length - 1) / 2) * 20,
        duration: 1,
        ease: "power2.out",
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // --- MOBILE: VERTICAL STACKING ON SCROLL ---
      const cards = cardsRef.current;
      
      // Initial state: all cards at the bottom
      gsap.set(cards, { xPercent: -50, x: 0, y: 700, opacity: 0, rotation: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // Longer scroll for mobile stacking
          scrub: 1,
          pin: true,
          onLeaveBack: () => setActiveIndex(null),
        }
      });

      // Cards fly up one by one and stack with a small offset
      tl.to(cards, {
        y: (i) => i * 70, // Stacked effect (each card 20px lower than previous)
        opacity: 1,
        stagger: 0.2,
        duration: 2,
        ease: "power3.out"
      });
    });

    return () => mm.revert();
  }, []);

  // Handle scroll to close active card on all screens
  useEffect(() => {
    if (activeIndex === null) return;

    const handleScroll = () => {
      if (activeIndex !== null) {
        // Close the active card with smooth animation on any screen size
        handleCardClick(activeIndex);
      }
    };

    // Add scroll listener with a small delay to prevent immediate triggering
    const scrollTimeout = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 300);

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

 const handleCardClick = (index) => {
    const isMobile = window.innerWidth < 1024;
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);

    cardsRef.current.forEach((card, i) => {
      if (i === index && newIndex !== null) {
        // --- POP UP ACTIVE CARD ---
        gsap.to(card, {
          y: isMobile ? 0 : -120, // Increased from -50 to -120 for more upward movement
          x: 0,
          rotation: 0,
          scale: isMobile ? 1.05 : 1.1,
          zIndex: 100,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      } else {
        // --- RESET OTHERS ---
        const isDesktop = window.innerWidth >= 1024;
        
        // Desktop positions
        const dAngle = (i - (services.length - 1) / 2) * (50 / (services.length - 1));
        const dX = (i - (services.length - 1) / 2) * 160;
        const dY = Math.abs(i - (services.length - 1) / 2) * 20;

        gsap.to(card, {
          y: isDesktop ? dY : i * 70, // Fixed: Changed from i * 20 to i * 70 to match initial stacking
          x: isDesktop ? dX : 0,
          rotation: isDesktop ? dAngle : 0,
          scale: 1,
          zIndex: i,
          // Hide others on mobile click to focus, dim on desktop
          opacity: newIndex === null ? 1 : (isMobile ? 0 : 0.05),
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    });
  };

  return (
    <section 
      ref={containerRef} 
      id="services"
      className="relative bg-white w-full min-h-screen overflow-x-hidden lg:overflow-hidden  lg:py-0"
    >
      <div className="flex flex-col items-center justify-start lg:justify-center min-h-screen">
        
        {/* Header — sticky on mobile so cards scrolling up don't cover it */}
        <div className={`
          sticky top-0 z-50 pt-8 pb-4 bg-white w-full text-center
          lg:static lg:pt-0 lg:pb-0 lg:bg-transparent lg:mb-20
          transition-opacity duration-500
          ${activeIndex !== null ? 'opacity-100 lg:opacity-20' : 'opacity-100'}
        `}>
          <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-[#1A1A1A] mt-2 tracking-tighter leading-none">
            OUR SERVICES
          </h2>
        </div>

        {/* Cards Container */}
        {/* On mobile, we change from relative height to auto-growing height */}
        <div className="relative w-full h-[500px] lg:h-[600px] flex flex-col lg:flex-row justify-center items-center lg:items-end pb-2 md:pb-30">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleCardClick(index)}
              className={`
                absolute lg:absolute 
                w-[90%] sm:w-80 h-[350px] lg:h-[450px] 
                p-6 lg:p-8 rounded-[2rem] shadow-xl 
                ${service.color} border border-black/10 
                flex flex-col justify-between 
                cursor-default lg:cursor-pointer select-none
              `}
              style={{
                left: "50%",
                zIndex: index,
              }}
              onMouseEnter={() => window.innerWidth >= 1024 && setIsHovering?.(true)}
              onMouseLeave={() => setIsHovering?.(false)}
            >
              <div className="flex flex items-center lg:flex-col lg:items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-2xl lg:text-3xl font-black leading-[0.9] text-black tracking-tighter uppercase">
                  {service.title}
                </h3>
              </div>
              
              <p className={`
                text-sm lg:text-base font-semibold text-black leading-snug
              
              `}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Click-away hint */}
        {activeIndex !== null && (
          <button 
          onClick={() => handleCardClick(null)}
          className={`fixed bottom-8 lg:bottom-24 px-8 py-3 bg-black text-white rounded-full text-xs font-black tracking-widest z-[110] transition-all duration-500 transform ${
            activeIndex !== null ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          CLOSE DETAILS
        </button>
        )}
      </div>
    </section>
  );
};

export default AnimatedServices;