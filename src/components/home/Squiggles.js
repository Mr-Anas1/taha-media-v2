import React from "react";

const Squiggles = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-10 z-0">
    <path
      d="M100,200 Q150,150 200,200 T300,200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-blue-950"
    />
    <path
      d="M1200,400 C1100,500 1300,600 1200,700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-blue-950"
    />
    <circle
      cx="20%"
      cy="80%"
      r="50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="5,5"
      className="text-blue-900"
    />
  </svg>
);

export default Squiggles;
