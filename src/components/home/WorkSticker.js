import React from "react";
import { Paperclip } from "lucide-react";
import DogEarCard from "./DogEarCard";

const WorkSticker = ({ img, title, tag, rotation, className = "" }) => (
  <div className={`group cursor-pointer ${className} ${rotation}`}
  >
    <DogEarCard className="p-4 group-hover:-translate-y-4 transition-all duration-500">
      <div className="relative aspect-square overflow-hidden mb-6 rounded-sm">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-2 left-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Paperclip size={14} />
          </div>
        </div>
      </div>
      <h4 className="text-lg font-black text-blue-950 uppercase">{title}</h4>
      <p className="text-xs font-bold text-blue-600 mt-1">{tag}</p>
    </DogEarCard>
  </div>
);

export default WorkSticker;
