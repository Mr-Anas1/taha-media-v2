"use client";
import { useEffect, useState } from "react";

const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // prevent tiny scroll jitter
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;

      // always show near top
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // scrolling UP
        setIsVisible(true);
      } else {
        // scrolling DOWN
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
};

export default useNavbarVisibility;