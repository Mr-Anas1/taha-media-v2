import React from "react";
import { Palette, Target, TrendingUp, Users, Zap } from "lucide-react";
import DogEarCard from "./DogEarCard";
import ServiceLabel from "./ServiceLabel";

const Services = () => (
  <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="mb-20">
        <DogEarCard color="bg-blue-600" className="w-fit rotate-2">
          <h2 className="text-5xl font-black italic">services</h2>
        </DogEarCard>
        <p className="mt-12 text-2xl font-bold text-slate-400 max-w-sm">
          — Not what we make but your satisfaction matters
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        <ServiceLabel
          icon={<Target />}
          text="UI/UX Design"
          color="bg-blue-600"
          rotation="-rotate-3"
        />
        <ServiceLabel
          icon={<Palette />}
          text="Illustration"
          color="bg-white"
          textColor="text-slate-950"
          rotation="rotate-2"
        />
        <ServiceLabel
          icon={<TrendingUp />}
          text="Design Graphic"
          color="bg-slate-800"
          rotation="-rotate-1"
        />
        <ServiceLabel
          icon={<Zap />}
          text="3D Design"
          color="bg-blue-950"
          rotation="rotate-3"
        />
      </div>
    </div>

    <div className="absolute top-20 right-20 opacity-10">
      <Users size={200} />
    </div>
  </section>
);

export default Services;
