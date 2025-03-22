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
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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

  // Mobile menu toggle
  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    
    if (menu.style.display === 'flex') {
      menu.style.display = 'none';
      setMobileMenuOpen(false);
    } else {
      menu.style.display = 'flex';
      setMobileMenuOpen(true);
    }
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
    <>
      {/* CSS for dropdown menus - putting this at the top to ensure it loads */}
      <style jsx>{`
        /* Dropdown container */
        .nav-dropdown {
          position: relative;
          display: inline-block;
        }
        
        /* Dropdown menu (hidden by default) */
        .nav-dropdown-content {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          min-width: 200px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 9999;
          border-radius: 8px;
          padding: 8px 0;
          transition: all 0.3s ease;
          transform: translateY(10px);
          pointer-events: none;
        }
        
        /* Show the dropdown menu on hover */
        .nav-dropdown:hover .nav-dropdown-content {
          visibility: visible;
          opacity: 1;
          transform: translateY(20px);
          pointer-events: auto;
        }
        
        /* Links inside the dropdown */
        .nav-dropdown-content a {
          color: black;
          padding: 10px 16px;
          text-decoration: none;
          display: block;
          white-space: nowrap;
        }
        
        /* Change color of dropdown links on hover */
        .nav-dropdown-content a:hover {
          background-color: #f1f1f1;
        }
        
        /* Create an invisible spacer to ensure there's no gap between menu and dropdown */
        .nav-dropdown::after {
          content: "";
          position: absolute;
          height: 20px;
          width: 100%;
          top: 100%;
          left: 0;
          z-index: 9998;
        }
      `}</style>

      <header 
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-6 sm:px-10 py-1 sm:py-2 flex items-center justify-between z-[9999] transition-all duration-300 rounded-full shadow-lg ${
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

        {/* Mobile Menu Button and Details Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Detaylı Bilgi - Mobile */}
          <div>
            <Link
              to="/details"
              className="px-3 py-2 rounded-full font-bold text-sm bg-black text-white hover:bg-gray-800 transition"
            >
              Detaylı Bilgi
            </Link>
          </div>
          
          {/* Hamburger Button */}
          <button
            id="hamburger-button"
            ref={buttonRef}
            type="button"
            onClick={toggleMobileMenu}
            onTouchStart={(e) => {
              e.preventDefault();
              toggleMobileMenu(e);
            }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 focus:outline-none z-[10000]"
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

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="absolute left-0 top-20 w-full bg-white rounded-xl shadow-lg p-4 flex-col items-start z-[9990]"
          style={{ 
            display: 'none', 
            transition: 'none'
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
        <nav className="hidden md:flex items-center space-x-8 text-base sm:text-lg font-medium">
          <Link to="/" className="transition duration-300 cursor-pointer text-black hover:text-gray-500 py-1">
            Anasayfa
          </Link>
          
          {/* Services Dropdown with Pure CSS */}
          <div className="nav-dropdown">
            <a 
              href="/#services"
              onClick={handleServicesClick}
              className="flex items-center text-black hover:text-gray-500 transition duration-300 py-1 cursor-pointer"
            >
              Hizmetlerimiz <ChevronDown className="w-4 h-4 ml-1" />
            </a>
            
            <div className="nav-dropdown-content">
              <div className="py-2">
                <Link to="/seo" className="block px-4 py-2 hover:bg-gray-100">Seo</Link>
                <Link to="/mobile-app" className="block px-4 py-2 hover:bg-gray-100">Mobil Uygulama</Link>
                <Link to="/digital-growth" className="block px-4 py-2 hover:bg-gray-100">Dijital Pazarlama</Link>
                <Link to="/ecommerce" className="block px-4 py-2 hover:bg-gray-100">E-Ticaret Danışmanlığı</Link>
                <Link to="/socialmedia" className="block px-4 py-2 hover:bg-gray-100">Sosyal Medya Yönetimi</Link>
                <Link to="/web-development" className="block px-4 py-2 hover:bg-gray-100">Kurumsal Web Sitesi Ve E-Ticaret Sitesi</Link>
              </div>
            </div>
          </div>

          <Link to="/about" className="transition duration-300 cursor-pointer text-black hover:text-gray-500 py-1">
            Hakkımızda
          </Link>
          
          <Link to="/blog" className="transition duration-300 cursor-pointer text-black hover:text-gray-500 py-1">
            Blog
          </Link>
          
          <Link to="/contact" reloadDocument className="text-black hover:text-gray-500 py-1">
            İletişim
          </Link>
        </nav>

        {/* Details Button - Desktop */}
        <div className="hidden md:block">
          <Link
            to="/details"
            className="px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-full font-bold transition duration-300 bg-black text-white hover:bg-gray-700 text-sm sm:text-base md:text-lg whitespace-nowrap"
          >
            Detaylı Bilgi
          </Link>
        </div>
      </header>
    </>
  );
}