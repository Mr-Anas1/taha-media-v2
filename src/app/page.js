"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import ContactPopup from "../components/ui/ContactPopup";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HeroWithRobot from "../components/home/HeroWithRobot";
import AboutUs from "../components/home/AboutUs";
import InfiniteServices from "../components/home/InfiniteServices";
import Navbar from "../components/home/Navbar";
import Portfolio from "../components/home/Portfolio";
import AnimatedServices from "../components/home/AnimatedServices";
import ResultsSection from "../components/home/ResultsSection";
import ClientsSection from "../components/home/ClientsSection";
import Squiggles from "../components/home/Squiggles";
import WhyUs from "../components/home/WhyUs";
import useNavbarVisibility from "../hooks/useNavbarVisibility";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isVisible = useNavbarVisibility();


  useEffect(() => {
    // Only track mouse on non-touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);


  return (
    <div className="bg-grid bg-[#FDFDFD] text-slate-950 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden min-h-screen">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Squiggles />

      <div
        className={`hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full bg-blue-600 pointer-events-none z-[9999] transition-transform duration-75 ease-out ${isHovering ? "scale-[4] opacity-20" : ""}`}
        style={{
          transform: `translate3d(${mousePos.x - 8}px, ${mousePos.y - 8}px, 0)`,
        }}
      />

       <Navbar
        setIsMenuOpen={setIsMenuOpen}
        setIsHovering={setIsHovering}
        showNavbar={true}
        isVisible={isVisible}
        onContactClick={() => setIsContactOpen(true)}
      />

      <main className="relative z-10">
        <HeroWithRobot setIsHovering={setIsHovering} onContactClick={() => setIsContactOpen(true)} />
        <ClientsSection setIsHovering={setIsHovering} />

        <AboutUs setIsHovering={setIsHovering} />
        <WhyUs setIsHovering={setIsHovering} onContactClick={() => setIsContactOpen(true)} />
        <AnimatedServices setIsHovering={setIsHovering} />
        <Portfolio setIsHovering={setIsHovering} />
        <ResultsSection setIsHovering={setIsHovering} />
        {/* <InfiniteServices /> */}
        <FinalCTA setIsHovering={setIsHovering} onContactClick={() => setIsContactOpen(true)} />
      </main>

      <Footer />
      
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center space-y-8 text-4xl font-black p-10 text-blue-950">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-blue-950"
          >
            <X size={32} />
          </button>
          {[
            { name: 'Work', href: '#portfolio' },
            { name: 'Services', href: '#services' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '#contact' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
