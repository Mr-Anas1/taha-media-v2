
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Analytics } from "@vercel/analytics/next"

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

    // Load EmailJS script (once) + init with env key
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const existingScript = document.getElementById("emailjs-sdk");
    let script = existingScript;

    const initEmailJs = () => {
      if (!publicKey) return;
      if (window.emailjs && !window.__emailjs_inited) {
        window.emailjs.init(publicKey);
        window.__emailjs_inited = true;
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = "emailjs-sdk";
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
      script.async = true;
      script.onload = initEmailJs;
      document.body.appendChild(script);
    } else {
      initEmailJs();
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        delete window.lenis;
      }
      if (rafId) cancelAnimationFrame(rafId);
      // Don't remove the EmailJS script on unmount; RootLayout can remount during navigation.
    };
  }, []);


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
