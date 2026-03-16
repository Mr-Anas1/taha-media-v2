import React from "react";
import { Pin, Zap } from "lucide-react";

const Hero = ({ setIsHovering }) => (
  <section className="min-h-screen pt-40 px-6 flex flex-col items-center text-center relative">
    <div className="max-w-4xl relative">
      <div className="absolute -top-10 -left-10 animate-pulse">
        <Zap className="text-blue-600 fill-blue-600" size={40} />
      </div>

      <h1 className="text-6xl md:text-[9rem] font-black leading-[0.8] tracking-tighter text-blue-950 mb-8">
        /real <br />
        agency with its — <br />
        <span className="relative inline-block px-4 py-2 bg-blue-600 text-white -rotate-2 mx-2">
          super.
        </span>
        <span className="relative inline-block px-4 py-2 bg-slate-900 text-white rotate-2 mx-2">
          digital.
        </span>
      </h1>

      <div className="flex justify-center mt-12">
        <div className="relative group">
          <p className="text-slate-400 text-sm mb-4 font-bold uppercase tracking-widest">
            Let's start discussing your project
          </p>
          <button
            className="px-12 py-4 bg-blue-950 text-white rounded-md text-lg font-bold shadow-2xl relative z-10 overflow-hidden group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Start a Project
            <div className="absolute top-0 right-0 p-1 opacity-50">
              <Pin size={16} />
            </div>
          </button>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-blue-200 -z-10 rounded-md group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
        </div>
      </div>
    </div>

    <div className="mt-20 opacity-20">
      <svg width="200" height="100" viewBox="0 0 200 100">
        <path
          d="M10,90 Q100,10 190,90"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  </section>
);

export default Hero;
