import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null); // Menü butonu için ref eklendi

  // Client-side check
  useEffect(() => {
    setIsBrowser(true);
    
    // İlk yüklemede son scroll pozisyonunu ayarla
    if (typeof window !== 'undefined') {
      setLastScrollY(window.scrollY);
    }
  }, []);

  // Handling click outside to close mobile menu
  useEffect(() => {
    if (!isBrowser) return;
    
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Touch eventlerini ekleyelim
      document.addEventListener("touchstart", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen, isBrowser]);

  // Toggle mobile menu with forced client-side handling
  const toggleMobileMenu = () => {
    if (isBrowser) {
      console.log('Menu toggle clicked'); // Debug için log ekleyelim
      setMobileMenuOpen(prevState => !prevState);
    }
  };

  // Scroll handler
  useEffect(() => {
    if (!isBrowser) return;
    
    // Threshold değeri - kaç piksel aşağı scroll ettikten sonra navbar kaybolmaya başlasın
    const threshold = 50;
    
    // Minimum fark - scroll olayları arasındaki minimum fark değeri
    const minDifference = 10;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = Math.abs(currentScrollY - lastScrollY);
      
      // Eğer fark çok küçükse, gereksiz state güncellemesini önleyelim
      if (difference < minDifference) {
        return;
      }
      
      // Aşağı kaydırma ve threshold'u geçme
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        // Eğer zaten scrolling durumunda değilse, state'i güncelle
        if (!scrolling) {
          setScrolling(true);
        }
      } 
      // Yukarı kaydırma
      else if (currentScrollY < lastScrollY) {
        // Eğer hala scrolling durumundaysa, state'i güncelle
        if (scrolling) {
          setScrolling(false);
        }
      }
      
      // Son scroll pozisyonunu güncelle
      setLastScrollY(currentScrollY);
    };

    // Throttled scroll handler - performans için
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, scrolling, isBrowser]);

  // Handle services link click
  const handleServicesClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo(0, 0);
      
      setTimeout(() => {
        const servicesElement = document.getElementById("services");
        if (servicesElement) {
          servicesElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <header className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-6 sm:px-10 py-1 sm:py-2 flex items-center justify-between z-[999] transition-all duration-500 ease-in-out rounded-full shadow-lg overflow-visible ${scrolling ? "opacity-0 pointer-events-none translate-y-[-100%]" : "opacity-100 bg-white shadow-2xl"}`}>
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img src="/image/logo.png" alt="Logo" className="h-12 sm:h-14 w-auto" />
          <img src="/image/logo-text.png" alt="Text" className="h-8 sm:h-10 w-auto" />
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        ref={menuButtonRef} // Ref eklendi
        className="md:hidden text-black p-2 z-[1000]" // z-index arttırıldı
        onClick={toggleMobileMenu}
        onTouchStart={(e) => { e.preventDefault(); toggleMobileMenu(); }} // Touch event eklendi
        aria-label="Toggle menu"
        type="button"
        style={{ touchAction: 'manipulation' }} // Touch action eklendi
      >
        <Menu className="w-8 h-8" /> {/* Boyutu büyütüldü */}
      </button>

      {/* Navigation menu */}
      <nav 
        ref={mobileMenuRef}
        className={`absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 sm:p-5 md:p-0 flex flex-col md:flex-row items-center md:space-x-8 text-base sm:text-lg font-medium rounded-lg z-[990] ${mobileMenuOpen ? "block" : "hidden md:flex"}`}
      >
        {/* Mobile menu close button */}
        <button
          className="md:hidden self-end text-gray-500 mb-4 p-2 text-xl" // Padding eklendi ve font büyütüldü
          onClick={() => setMobileMenuOpen(false)}
          onTouchStart={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} // Touch event eklendi
        >
          X
        </button>
        
        <Link to="/" className="transition duration-300 cursor-pointer text-black hover:text-gray-500 py-1">
          Anasayfa
        </Link>
        
        {/* Services dropdown */}
        <div className="relative inline-block group">
          <a 
            href="/#services" 
            onClick={handleServicesClick}
            className="flex items-center text-black hover:text-gray-500 transition duration-300 py-1 cursor-pointer"
          >
            Hizmetlerimiz <ChevronDown className="w-4 h-4 ml-1" />
          </a>
          
          {/* Invisible bridge */}
          <div className="absolute w-full h-3 bg-transparent"></div>
          
          {/* Dropdown menu */}
          <div className="absolute hidden group-hover:flex group-hover:flex-col top-[calc(100%+12px)] left-0 w-auto bg-white shadow-lg rounded-lg py-2 px-4 gap-2 z-50">
            <Link to="/seo" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Seo</Link>
            <Link to="/mobile-app" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Mobil Uygulama</Link>
            <Link to="/digital-growth" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Dijital Pazarlama</Link>
            <Link to="/ecommerce" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">E-Ticaret Danışmanlığı</Link>
            <Link to="/socialmedia" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Sosyal Medya Yönetimi</Link>
            <Link to="/web-development" className="px-3 py-2 text-black hover:bg-gray-100 whitespace-nowrap">Kurumsal Web Sitesi Ve E-Ticaret Sitesi</Link>
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

      {/* Details Button */}
      <div className="block">
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