import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Client-side check
  useEffect(() => {
    setIsBrowser(true);
    
    if (typeof window !== 'undefined') {
      setLastScrollY(window.scrollY);
    }
  }, []);

  // CRITICAL: Forcefully check if we're on mobile
  useEffect(() => {
    // Basit bir mobil cihaz kontrolü
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      console.log("Mobile device detected");
      
      // Mobil cihazlarda ekstra event dinleyicileri ekleme
      const menuBtn = document.querySelector('.mobile-menu-btn');
      if (menuBtn) {
        // Tüm event türlerini ekleme
        ['click', 'touchstart', 'touchend', 'mousedown', 'mouseup', 'pointerdown', 'pointerup'].forEach(eventType => {
          menuBtn.addEventListener(eventType, (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Button ${eventType} event triggered`);
            setMobileMenuOpen(prev => !prev);
          }, { passive: false, capture: true });
        });
      }
    }
  }, [isBrowser]);

  // Handling click outside to close mobile menu - completely revamped
  useEffect(() => {
    if (!isBrowser || !mobileMenuOpen) return;
    
    const handleClickOutside = (event) => {
      // Menü buttonu tıklamalarını handle etme işlemini buradan çıkaralım
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target)) {
        return;
      }
      
      // Sadece menüye tıklanmazsa kapat
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        console.log("Clicked outside menu - closing");
        setMobileMenuOpen(false);
      }
    };
    
    // Tüm olası event türlerini dinle
    ['mousedown', 'touchstart', 'pointerdown'].forEach(eventType => {
      document.addEventListener(eventType, handleClickOutside, { passive: true });
    });
    
    return () => {
      ['mousedown', 'touchstart', 'pointerdown'].forEach(eventType => {
        document.removeEventListener(eventType, handleClickOutside);
      });
    };
  }, [mobileMenuOpen, isBrowser]);

  // Simplified toggle function with debug
  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('toggleMobileMenu called, current state:', mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Scroll handler with performance optimizations
  useEffect(() => {
    if (!isBrowser) return;
    
    const threshold = 50;
    const minDifference = 10;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = Math.abs(currentScrollY - lastScrollY);
      
      if (difference < minDifference) return;
      
      setScrolling(currentScrollY > lastScrollY && currentScrollY > threshold);
      setLastScrollY(currentScrollY);
    };

    // More efficient scroll handling
    let scrollTimeout;
    
    const onScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, isBrowser]);

  // Handle services link click
  const handleServicesClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      
      const servicesElement = document.getElementById("services");
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header 
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-6 sm:px-10 py-2 flex items-center justify-between z-[9999] transition-all duration-300 rounded-full shadow-lg ${
        scrolling ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 bg-white shadow-2xl"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img src="/image/logo.png" alt="Logo" className="h-12 sm:h-14 w-auto" />
          <img src="/image/logo-text.png" alt="Text" className="h-8 sm:h-10 w-auto" />
        </Link>
      </div>

      {/* Mobile menu button - Daha belirgin yapıldı */}
      <div 
        ref={menuButtonRef}
        className="mobile-menu-btn md:hidden flex items-center justify-center cursor-pointer z-[10000]"
        onClick={toggleMobileMenu}
        onTouchStart={toggleMobileMenu}
        onTouchEnd={(e) => e.preventDefault()}
        style={{ 
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          padding: '8px'
        }}
      >
        <div 
          className="w-14 h-14 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 shadow-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <Menu className="w-8 h-8 text-white" />
          )}
        </div>
      </div>

      {/* Navigation menu */}
      <nav 
        ref={mobileMenuRef}
        className={`
          absolute md:relative top-20 md:top-auto left-0 w-full md:w-auto 
          bg-white md:bg-transparent rounded-xl shadow-lg md:shadow-none 
          p-6 md:p-0 flex flex-col md:flex-row items-center md:space-x-8 
          text-lg font-medium z-[9990] transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-10 md:opacity-100 md:visible md:translate-y-0"}
        `}
      >
        {/* No need for mobile menu close button here since we have X in the toggle button */}
        
        <Link to="/" className="w-full md:w-auto text-center border-b md:border-0 border-gray-200 py-3 md:py-0 transition duration-300 cursor-pointer text-black hover:text-gray-500">
          Anasayfa
        </Link>
        
        {/* Services dropdown */}
        <div className="relative inline-block group w-full md:w-auto text-center border-b md:border-0 border-gray-200 py-3 md:py-0">
          <a 
            href="/#services" 
            onClick={handleServicesClick}
            className="flex items-center justify-center md:justify-start text-black hover:text-gray-500 transition duration-300 cursor-pointer"
          >
            Hizmetlerimiz <ChevronDown className="w-4 h-4 ml-1" />
          </a>
          
          <div className="absolute hidden group-hover:flex group-hover:flex-col top-full left-0 md:left-auto md:right-0 w-full md:w-auto bg-white shadow-lg rounded-lg py-2 px-4 gap-2 z-50 mt-2">
            <Link to="/seo" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Seo</Link>
            <Link to="/mobile-app" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Mobil Uygulama</Link>
            <Link to="/digital-growth" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Dijital Pazarlama</Link>
            <Link to="/ecommerce" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">E-Ticaret Danışmanlığı</Link>
            <Link to="/socialmedia" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Sosyal Medya Yönetimi</Link>
            <Link to="/web-development" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Kurumsal Web Sitesi Ve E-Ticaret Sitesi</Link>
          </div>
        </div>

        <Link to="/about" className="w-full md:w-auto text-center border-b md:border-0 border-gray-200 py-3 md:py-0 transition duration-300 cursor-pointer text-black hover:text-gray-500">
          Hakkımızda
        </Link>
        <Link to="/blog" className="w-full md:w-auto text-center border-b md:border-0 border-gray-200 py-3 md:py-0 transition duration-300 cursor-pointer text-black hover:text-gray-500">
          Blog
        </Link>
        <Link to="/contact" reloadDocument className="w-full md:w-auto text-center py-3 md:py-0 text-black hover:text-gray-500">
          İletişim
        </Link>
        
        {/* Detaylı Bilgi butonu - mobil görünüm için eklendi */}
        <div className="w-full mt-4 md:hidden">
          <Link
            to="/details"
            className="block w-full py-4 rounded-full font-bold text-center transition duration-300 bg-black text-white hover:bg-gray-700 text-lg whitespace-nowrap"
          >
            Detaylı Bilgi
          </Link>
        </div>
      </nav>

      {/* Details Button - Sadece desktop için */}
      <div className="hidden md:block">
        <Link
          to="/details"
          className="px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-full font-bold transition duration-300 bg-black text-white hover:bg-gray-700 text-sm sm:text-base md:text-lg whitespace-nowrap"
        >
          Detaylı Bilgi
        </Link>
      </div>
    </header>
  );
}