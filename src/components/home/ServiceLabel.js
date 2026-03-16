import React from "react";
import { Paperclip } from "lucide-react";

const ServiceLabel = ({ icon, text, color, textColor = "text-white", rotation }) => (
  <div
    className={`p-6 ${color} ${textColor} flex items-center gap-4 shadow-2xl ${rotation} rounded-sm border border-white/10 group cursor-pointer hover:scale-110 transition-transform`}
  >
    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="text-xl font-black uppercase tracking-tighter">{text}</span>
    <Paperclip className="opacity-20" size={16} />
  </div>
);

export default ServiceLabel;
