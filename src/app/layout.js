
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
      <head>
        {/* Primary Meta Tags */}
        <title>Taha Media - Digital Marketing & Branding Solutions</title>
        <meta name="title" content="Taha Media - Digital Marketing & Branding Solutions" />
        <meta name="description" content="Taha Media delivers cutting-edge digital solutions with AI-powered automation, personalized branding, and results-driven marketing strategies that transform your business." />
        <meta name="keywords" content="digital marketing, branding, AI automation, marketing strategies, business growth" />
        <meta name="author" content="Taha Media" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tahamedia.in/" />
        <meta property="og:title" content="Taha Media - Digital Marketing & Branding Solutions" />
        <meta property="og:description" content="Taha Media delivers cutting-edge digital solutions with AI-powered automation, personalized branding, and results-driven marketing strategies that transform your business." />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:image:alt" content="Taha Media Logo" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tahamedia.in/" />
        <meta property="twitter:title" content="Taha Media - Digital Marketing & Branding Solutions" />
        <meta property="twitter:description" content="Taha Media delivers cutting-edge digital solutions with AI-powered automation, personalized branding, and results-driven marketing strategies that transform your business." />
        <meta property="twitter:image" content="/logo.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.tahamedia.in/" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Taha Media",
              "url": "https://www.tahamedia.in/",
              "logo": "https://www.tahamedia.in/logo.jpg",
              "description": "Taha Media delivers cutting-edge digital solutions with AI-powered automation, personalized branding, and results-driven marketing strategies that transform your business.",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
