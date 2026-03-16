import React from "react";
import { Pin } from "lucide-react";

const FinalCTA = ({ setIsHovering }) => (
  <section className="py-40 px-6 bg-slate-50 text-center relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
      <svg width="100%" height="100%">
        <path
          d="M0,50 Q250,0 500,50 T1000,50"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="10,10"
        />
      </svg>
    </div>

    <div className="max-w-4xl mx-auto relative z-10">
      <h2 className="text-6xl md:text-9xl font-black text-blue-950 tracking-tighter leading-[0.8] mb-12">
        let's works <br />
        /together{" "}
        <span className="relative inline-block px-4 py-2 bg-blue-600 text-white rotate-1 mx-2">
          stay.
        </span>{" "}
        <br />
        <span className="relative inline-block px-4 py-2 bg-blue-950 text-white -rotate-2 mt-4">
          creative
        </span>
      </h2>

      <div className="flex justify-center mt-12">
        <button
          className="relative px-12 py-6 bg-blue-950 text-white rounded-md text-2xl font-black shadow-2xl hover:scale-105 transition-transform"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Start a Project
          <Pin
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-blue-600"
            size={32}
          />
        </button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
