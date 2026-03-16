import React from "react";
import DogEarCard from "./DogEarCard";
import WorkSticker from "./WorkSticker";

const Portfolio = () => (
  <section className="py-32 px-6 bg-white relative">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center mb-20">
        <DogEarCard color="bg-blue-600" className="w-fit -rotate-2">
          <h2 className="text-5xl font-black text-white italic">our work</h2>
        </DogEarCard>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <WorkSticker
          img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
          title="PixelCraft Studios"
          tag="UI Design"
          rotation="-rotate-2"
        />
        <WorkSticker
          img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
          title="Visualize Limits"
          tag="3D Mastery"
          rotation="rotate-1"
          className="md:translate-y-12"
        />
        <WorkSticker
          img="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
          title="Illustrative Odyssey"
          tag="Creative Art"
          rotation="rotate-3"
        />
      </div>
    </div>
  </section>
);

export default Portfolio;
