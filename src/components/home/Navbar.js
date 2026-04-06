"use client";
import React from "react";
import Link from "next/link";
import { Menu, Pin } from "lucide-react";

const Navbar = ({ setIsMenuOpen, setIsHovering, showNavbar, isVisible, onContactClick }) => {
  if (!showNavbar) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter flex items-center gap-2 text-blue-950 hover:text-blue-600 transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-sm" />
          Taha Media<span className="text-blue-600">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-slate-500">
          {[
            { name: "About us", href: "/about" },
            { name: "Service", href: "/#services" },
            { name: "Work", href: "/#portfolio" },
            { name: "Contact", href: "/#contact" }
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-950 transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {link.name}
            </Link>
          ))}

          <button 
            className="px-5 py-2 bg-blue-950 text-white rounded shadow-md flex items-center gap-2 group"
            onClick={onContactClick}
          >
            Start a Project <Pin size={12} className="rotate-45" />
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-blue-950"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;