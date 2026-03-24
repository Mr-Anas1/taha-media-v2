"use client";
import React, { useEffect, useRef } from "react";
import DogEarCard from "./DogEarCard";
import StatCard from "./StatCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const sectionRef = useRef(null);
  const guyRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !guyRef.current) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        gsap.set(guyRef.current, { x: -140, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(guyRef.current, {
          x: 0,
          autoAlpha: 1,
          ease: "none",
          duration: 0.4,
        });

        tl.to(guyRef.current, {
          x: 120,
          autoAlpha: 0,
          ease: "none",
          duration: 0.4,
        });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="relative py-32">
      <div
        ref={guyRef}
        className="relative z-20 pointer-events-none flex justify-center mt-12 lg:mt-0 lg:absolute lg:right-4 lg:bottom-8"
      >
        <img
          src="/images/guy-right.png"
          alt="Guy Right"
          className="w-56 sm:w-72 lg:w-96 h-auto"
        />
      </div>

      <div className="px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center justify-items-center">
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
      </div>
    </section>
  );
};

export default WhyUs;
