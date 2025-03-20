import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);

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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, isBrowser]);

  // Toggle mobile menu with forced client-side handling
  const toggleMobileMenu = () => {
    if (isBrowser) {
      setMobileMenuOpen(prevState => !prevState);
    }
  };

  // Scroll handler remaining code...
  // (rest of your existing code)

  return (
    <header className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-full px-6 sm:px-10 py-1 sm:py-2 flex items-center justify-between z-50 transition-all duration-500 ease-in-out rounded-full shadow-lg overflow-visible ${scrolling ? "opacity-0 pointer-events-none translate-y-[-100%]" : "opacity-100 bg-white shadow-2xl"}`}>
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img src="/image/logo.png" alt="Logo" className="h-12 sm:h-14 w-auto" />
          <img src="/image/logo-text.png" alt="Text" className="h-8 sm:h-10 w-auto" />
        </Link>
      </div>

      {/* Mobile menu button - updated with enhanced click handler */}
      <button
        className="md:hidden text-black p-2" // Added padding for better touch target
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        type="button" // Explicitly specify button type
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Navigation menu - added refs */}
      <nav 
        ref={mobileMenuRef}
        className={`absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 sm:p-5 md:p-0 flex flex-col md:flex-row items-center md:space-x-8 text-base sm:text-lg font-medium ${mobileMenuOpen ? "block" : "hidden md:flex"}`}
      >
        {/* Mobile menu close button (visible only in mobile menu) */}
        <button
          className="md:hidden self-end text-gray-500 mb-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          X
        </button>
        
        <Link to="/" className="transition duration-300 cursor-pointer text-black hover:text-gray-500 py-1">
          Anasayfa
        </Link>
        
        {/* Rest of your menu items... */}
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