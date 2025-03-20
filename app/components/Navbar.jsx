import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Client-side için kontrol
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // İlk yüklemede son scroll pozisyonunu ayarla
    setLastScrollY(window.scrollY);
    
    // Sayfa yüklendiğinde menünün kapalı olduğundan emin olalım
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.style.display = 'none';
    }
  }, []);

  // Scroll handler
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Sabit ID'lerle çalışalım, React state yerine DOM elementlerine odaklanalım
  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 1. DOM elementini direkt referans alalım
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    
    // 2. Menü o an açıksa (görünürse) kapatalım, kapalıysa açalım
    // Sadelik için görünürlüğü style.display üzerinden kontrol edelim
    if (menu.style.display === 'flex') {
      // Menü açık, kapatalım
      menu.style.display = 'none';
      setMobileMenuOpen(false);
    } else {
      // Menü kapalı, açalım
      menu.style.display = 'flex';
      setMobileMenuOpen(true);
    }
    
    console.log("Menü durumu değiştirildi:", menu.style.display === 'flex' ? 'açık' : 'kapalı');
  };

  // Dışarıya tıklayınca menüyü kapatma
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClickOutside = (e) => {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('hamburger-button');
      
      if (menu && button && !menu.contains(e.target) && !button.contains(e.target)) {
        menu.style.display = 'none';
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

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
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-4 sm:px-8 py-2 flex items-center justify-between z-[9999] transition-all duration-300 rounded-full shadow-lg ${
        scrolling ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 bg-white shadow-2xl"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img src="/image/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto" />
          <img src="/image/logo-text.png" alt="Text" className="h-6 sm:h-8 w-auto" />
        </Link>
      </div>

      {/* Mobile Menu Button and Details Button */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Detaylı Bilgi - Mobile */}
        <div className="md:hidden">
          <Link
            to="/details"
            className="px-2 py-1 rounded-full font-medium text-sm bg-black text-white hover:bg-gray-800 transition"
          >
            Detaylı Bilgi
          </Link>
        </div>
        
        {/* Hamburger Button - sadeleştirildi */}
        <button
          id="hamburger-button"
          ref={buttonRef}
          type="button"
          onClick={toggleMobileMenu}
          onTouchStart={(e) => {
            e.preventDefault();
            toggleMobileMenu(e);
          }}
          className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 focus:outline-none z-[10000]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          style={{ 
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Tamamen yeniden yapılandırılmış */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="absolute left-0 top-20 w-full bg-white rounded-xl shadow-lg p-4 flex-col items-start z-[9990]"
        style={{ 
          display: 'none', 
          transition: 'none' // Animasyonu devre dışı bırak - kararlılık için
        }}
      >
        <Link to="/" className="w-full py-3 border-b border-gray-100 text-black">
          Anasayfa
        </Link>
        
        <div className="w-full py-3 border-b border-gray-100">
          <a 
            href="/#services" 
            onClick={handleServicesClick}
            className="flex items-center text-black"
          >
            Hizmetlerimiz <ChevronDown className="w-4 h-4 ml-1" />
          </a>
          
          <div className="mt-2 ml-4 flex flex-col space-y-2">
            <Link to="/seo" className="text-black hover:text-gray-600">Seo</Link>
            <Link to="/mobile-app" className="text-black hover:text-gray-600">Mobil Uygulama</Link>
            <Link to="/digital-growth" className="text-black hover:text-gray-600">Dijital Pazarlama</Link>
            <Link to="/ecommerce" className="text-black hover:text-gray-600">E-Ticaret Danışmanlığı</Link>
            <Link to="/socialmedia" className="text-black hover:text-gray-600">Sosyal Medya Yönetimi</Link>
            <Link to="/web-development" className="text-black hover:text-gray-600">Kurumsal Web Sitesi</Link>
          </div>
        </div>
        
        <Link to="/about" className="w-full py-3 border-b border-gray-100 text-black">
          Hakkımızda
        </Link>
        
        <Link to="/blog" className="w-full py-3 border-b border-gray-100 text-black">
          Blog
        </Link>
        
        <Link to="/contact" className="w-full py-3 text-black">
          İletişim
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-black hover:text-gray-500 transition">
          Anasayfa
        </Link>
        
        <div className="relative group">
          <a 
            href="/#services" 
            onClick={handleServicesClick}
            className="flex items-center text-black hover:text-gray-500 transition"
          >
            Hizmetlerimiz <ChevronDown className="w-4 h-4 ml-1" />
          </a>
          
          <div className="absolute hidden group-hover:flex group-hover:flex-col left-0 min-w-max bg-white shadow-lg rounded-lg py-2 px-3 mt-1 z-50">
            <Link to="/seo" className="px-2 py-1 text-black hover:bg-gray-100 whitespace-nowrap">Seo</Link>
            <Link to="/mobile-app" className="px-2 py-1 text-black hover:bg-gray-100 whitespace-nowrap">Mobil Uygulama</Link>
            <Link to="/digital-growth" className="px-2 py-1 text-black hover:bg-gray-100 whitespace-nowrap">Dijital Pazarlama</Link>
            <Link to="/ecommerce" className="px-2 py-1 text-black hover:bg-gray-100 whitespace-nowrap">E-Ticaret Danışmanlığı</Link>
            <Link to="/socialmedia" className="px-2 py-1 text-black hover:bg-gray-100 whitespace-nowrap">Sosyal Medya Yönetimi</Link>
            <Link to="/web-development" className="px-2 py-1 text-black hover:bg-gray-100 whitespace-nowrap">Kurumsal Web Sitesi</Link>
          </div>
        </div>

        <Link to="/about" className="text-black hover:text-gray-500 transition">
          Hakkımızda
        </Link>
        
        <Link to="/blog" className="text-black hover:text-gray-500 transition">
          Blog
        </Link>
        
        <Link to="/contact" className="text-black hover:text-gray-500 transition">
          İletişim
        </Link>
        
        <Link
          to="/details"
          className="px-4 py-2 rounded-full font-medium bg-black text-white hover:bg-gray-800 transition"
        >
          Detaylı Bilgi
        </Link>
      </nav>
    </header>
  );
}