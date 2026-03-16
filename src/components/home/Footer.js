import React from "react";

const Footer = () => (
  <footer className="py-12 border-t border-slate-200 px-6 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-xl font-black tracking-tighter text-blue-950">
        AURA<span className="text-blue-600">.</span>
      </div>

      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
        {["Service", "Portfolios", "Work", "Contact"].map((item) => (
          <a key={item} href="#" className="hover:text-blue-950 transition-colors">
            {item}
          </a>
        ))}
      </div>

      <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
        © 2024 Aura Social. Built for scale.
      </p>
    </div>
  </footer>
);

export default Footer;
