
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once globally
gsap.registerPlugin(ScrollTrigger);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {

  useEffect(() => {
    // Only enable Lenis smooth scroll on desktop — mobile uses native scroll for best performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let lenis = null;
    let rafId = null;

    if (!isMobile) {
      lenis = new Lenis({
        lerp: 0.1,          // slightly higher = snappier response
        smoothWheel: true,
        syncTouch: false,   // don't intercept touch events
      });

      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init("YOUR_PUBLIC_KEY");
      }
    };
    document.body.appendChild(script);

    return () => {
      if (lenis) {
        lenis.destroy();
        delete window.lenis;
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
