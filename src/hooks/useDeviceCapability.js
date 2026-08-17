import { useState, useEffect } from "react";

export function useDeviceCapability() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    canStartTypingExperience: true
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    function checkDevice() {
      const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
      
      // Basic mobile regex check or narrow screen width
      const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isMobileWidth = window.innerWidth < 768;
      const isMobile = mobileRegex || isMobileWidth;
      
      // Tablet check: iPad / standard tablets or mid-width screens
      const tabletRegex = /iPad|PlayBook|Silk|Tablet/i.test(userAgent);
      const isTabletWidth = window.innerWidth >= 768 && window.innerWidth <= 1024;
      const isTablet = (tabletRegex || isTabletWidth) && !mobileRegex;
      
      const isDesktop = !isMobile && !isTablet;
      const canStartTypingExperience = isDesktop;

      setDevice({
        isMobile,
        isTablet,
        isDesktop,
        canStartTypingExperience
      });
    }

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return device;
}
