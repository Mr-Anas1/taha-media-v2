import React from "react";
import DogEarCard from "./DogEarCard";
import StatCard from "./StatCard";

const WhyUs = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
    <div className="relative">
      <DogEarCard color="bg-blue-600" className="rotate-[-3deg] w-fit">
        <h2 className="text-6xl font-black text-white italic">why us?</h2>
        <div className="mt-4 border-t border-white/20 pt-2 flex gap-2">
          <div className="w-8 h-1 bg-white/40" />
          <div className="w-12 h-1 bg-white" />
        </div>
      </DogEarCard>

      <div className="mt-20 max-w-sm">
        <h3 className="text-3xl font-black text-blue-950 leading-tight">
          Recognize success, — strive for more.
        </h3>
        <button className="mt-8 px-6 py-3 border-2 border-blue-950 rounded-md font-bold hover:bg-blue-950 hover:text-white transition-all">
          Start a Project
        </button>
      </div>
    </div>

    <div className="space-y-[-20px] relative">
      <StatCard
        title="$812+"
        label="Money Raised"
        desc="Total amount of money raised as a result of working with Aura."
      />
      <StatCard
        title="12+"
        label="Unicorn Award"
        desc="We have received various awards with prayers and efforts."
        className="ml-10 z-10"
      />
      <StatCard
        title="400+"
        label="Our Client"
        desc="Total of all clients around the world who have collaborated."
        className="ml-2 z-20"
      />
      <StatCard
        title="425+"
        label="Project Complete"
        desc="Various kinds of big projects that you have completed on time."
        className="ml-8 z-30"
      />
    </div>
  </section>
);

export default WhyUs;
