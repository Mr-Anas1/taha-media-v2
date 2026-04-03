
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

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
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    // Make lenis available globally
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS with your public key
      // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
      if (window.emailjs) {
        window.emailjs.init("YOUR_PUBLIC_KEY");
      }
    };
    document.body.appendChild(script);

    return () => {
      lenis.destroy();
      delete window.lenis;
      // Clean up EmailJS script
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
