import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  // Client-side kontrolü
  const [isMounted, setIsMounted] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeout = useRef(null);
  const location = useLocation();

  // Sayfa yüklendiğinde client-side'a geçtiğimizi belirtelim
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // URL'de hash değişirse, o elemana scroll yapalım
  useEffect(() => {
    if (isMounted && location.hash === "#services") {
      setTimeout(() => {
        const servicesElement = document.getElementById("services");
        if (servicesElement) {
          servicesElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (dropdownOpen) {
        setScrolling(false);
      } else if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, dropdownOpen, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted]);

  const handleMouseEnter = () => {
    if (!isMounted) return;
    
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMounted) return;
    
    closeTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  // Hizmetlerimize tıklandığında anasayfaya gidip services kısmına scroll yapma
  const handleServicesClick = (e) => {
    // Eğer zaten anasayfadaysak, default davranışı engelle ve manuel scroll yap
    if (location.pathname === "/") {
      e.preventDefault();
      const servicesElement = document.getElementById("services");
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Eğer başka sayfadaysak, Link'in default davranışı çalışacak, 
    // bu da anasayfaya gidip URL'de #services'i tutacak
  };

  // Server-side veya ilk render için, sabit bir navbar döndür
  if (!isMounted) {
    return (
      <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-6 sm:px-10 py-1 sm:py-2 flex items-center justify-between z-50 rounded-full shadow-lg bg-white">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img src="/image/logo.png" alt="Navbar Logo" className="h-12 sm:h-14 w-auto" />
            <img src="/image/logo-text.png" alt="Navbar Text" className="h-8 sm:h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex md:flex-row items-center md:space-x-8 text-base sm:text-lg font-medium">
          <div className="text-black py-1">Yükleniyor...</div>
        </div>

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

  return (
    <header
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-6 sm:px-10 py-1 sm:py-2 flex items-center justify-between z-50 transition-all duration-500 ease-in-out rounded-full shadow-lg overflow-visible
      ${scrolling ? "opacity-0 pointer-events-none" : "opacity-100 bg-white shadow-2xl"}`}
    >
      {/* Logo Alanı */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img src="/image/logo.png" alt="Navbar Logo" className="h-12 sm:h-14 w-auto" />
          <img src="/image/logo-text.png" alt="Navbar Text" className="h-8 sm:h-10 w-auto" />
        </Link>
      </div>

      {/* Hamburger Menü (Mobil için) */}
      <button
        className="md:hidden text-black"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Menü */}
      <nav
        className={`absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 sm:p-5 md:p-0 flex flex-col md:flex-row items-center md:space-x-8 text-base sm:text-lg font-medium
        ${mobileMenuOpen ? "block" : "hidden md:flex"}`}
      >
        <Link to="/" className="transition duration-300 cursor-pointer text-black hover:text-gray-500 py-1">
          Anasayfa
        </Link>
        
        {/* Hizmetlerimiz Dropdown */}
        <div
          className="relative inline-block"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/#services"
            onClick={handleServicesClick}
            className="flex items-center text-black hover:text-gray-500 transition duration-300 py-1"
          >
            Hizmetlerimiz <ChevronDown className="w-4 h-4 ml-1" />
          </Link>
          
          <div 
            className={`absolute top-full left-0 mt-2 w-auto bg-white shadow-lg rounded-lg py-2 px-4 flex flex-col gap-2 z-50 ${dropdownOpen ? 'block' : 'hidden'}`}
          >
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

      {/* Detaylı Bilgi Butonu */}
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