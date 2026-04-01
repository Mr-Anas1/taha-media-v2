"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HeroWithRobot from "../components/home/HeroWithRobot";
import AboutUs from "../components/home/AboutUs";
import InfiniteServices from "../components/home/InfiniteServices";
import Navbar from "../components/home/Navbar";
import Portfolio from "../components/home/Portfolio";
import AnimatedServices from "../components/home/AnimatedServices";
import Squiggles from "../components/home/Squiggles";
import WhyUs from "../components/home/WhyUs";
import useNavbarVisibility from "../hooks/useNavbarVisibility";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);



  const isVisible = useNavbarVisibility();


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      />

      <main className="relative z-10">
        <HeroWithRobot setIsHovering={setIsHovering} />
        <AboutUs setIsHovering={setIsHovering} />
        <WhyUs setIsHovering={setIsHovering} />
        <AnimatedServices setIsHovering={setIsHovering} />
        <Portfolio setIsHovering={setIsHovering} />
        <InfiniteServices />
        <FinalCTA setIsHovering={setIsHovering} />
      </main>

      <Footer />

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center space-y-8 text-4xl font-black p-10 text-blue-950">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-blue-950"
          >
            <X size={32} />
          </button>
          {['Work', 'Services', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600"
            >
              /{item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
