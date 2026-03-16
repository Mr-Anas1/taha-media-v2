import React from "react";
import { Paperclip } from "lucide-react";
import DogEarCard from "./DogEarCard";

const StatCard = ({ title, label, desc, className = "" }) => (
  <DogEarCard
    className={`max-w-xs transform hover:-translate-y-2 transition-transform cursor-default ${className}`}
  >
    <div className="absolute top-2 right-4 text-slate-300">
      <Paperclip size={20} />
    </div>
    <h4 className="text-3xl font-black text-blue-950">{title}</h4>
    <p className="font-bold text-xs uppercase tracking-widest mt-1 text-blue-600">
      {label}
    </p>
    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{desc}</p>
  </DogEarCard>
);

export default StatCard;
