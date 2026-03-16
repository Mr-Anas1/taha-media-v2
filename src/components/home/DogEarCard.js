import React from "react";

const DogEarCard = ({ children, color = "bg-white", className = "" }) => (
  <div
    className={`relative ${color} p-8 shadow-xl border border-slate-200 ${className}`}
  >
    {/* Dog ear corner */}
    <div className="absolute bottom-0 right-0 w-10 h-10 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-full bg-slate-100 origin-bottom-right rotate-45 transform translate-x-1/2 translate-y-1/2 shadow-inner border-l border-t border-slate-300" />
    </div>
    {children}
  </div>
);

export default DogEarCard;
