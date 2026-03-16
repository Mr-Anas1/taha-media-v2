import React from "react";
import { Menu, Pin } from "lucide-react";

const Navbar = ({ setIsMenuOpen, setIsHovering }) => (
  <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-white/80 backdrop-blur-md">
    <div
      className="text-xl font-black tracking-tighter flex items-center gap-2 text-blue-950"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-6 h-6 bg-blue-900 rounded-sm rotate-12 flex items-center justify-center">
        <span className="text-white text-[10px]">A</span>
      </div>
      AURA<span className="text-blue-600">.</span>
    </div>

    <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-slate-500">
      {["Service", "Portfolios", "Work", "Contact"].map((link) => (
        <a
          key={link}
          href="#"
          className="hover:text-blue-950 transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {link}
        </a>
      ))}
      <button className="px-5 py-2 bg-blue-950 text-white rounded shadow-md flex items-center gap-2 group">
        Start a Project <Pin size={12} className="rotate-45" />
      </button>
    </div>

    <button className="md:hidden text-blue-950" onClick={() => setIsMenuOpen(true)}>
      <Menu size={24} />
    </button>
  </nav>
);

export default Navbar;
