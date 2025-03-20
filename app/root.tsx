import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import Navbar from "~/components/Navbar";  // Navbar'ı ekleyelim
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900 text-white w-full overflow-x-hidden">
        <Navbar />  {/* Navbar tüm sayfalarda olacak */}
        <div className="w-full">
          <Outlet />  {/* Remix sayfaları buraya yükleyecek */}
        </div>
        <ScrollRestoration />
        <Scripts />
        
        {/* Hamburguer menü için vanilla JS script */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function initMobileMenu() {
              console.log('INIT MOBILE MENU WORKING!');
              
              // DOM elementlerini bul
              var hamburgerBtn = document.getElementById('hamburger-button');
              var mobileMenu = document.getElementById('mobile-menu');
              
              if (hamburgerBtn && mobileMenu) {
                console.log('Elements found, attaching events');
                
                // Önce varsa eski event listener'ları temizle
                var newBtn = hamburgerBtn.cloneNode(true);
                hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
                hamburgerBtn = newBtn;
                
                // Yeni event listener'lar ekle
                hamburgerBtn.addEventListener('click', function(e) {
                  e.preventDefault();
                  console.log('Button clicked!');
                  
                  if (mobileMenu.style.display === 'flex') {
                    mobileMenu.style.display = 'none';
                  } else {
                    mobileMenu.style.display = 'flex';
                  }
                });
                
                // Mobil cihazlar için özel çözüm
                hamburgerBtn.addEventListener('touchstart', function(e) {
                  e.preventDefault();
                  console.log('Button touched!');
                  
                  if (mobileMenu.style.display === 'flex') {
                    mobileMenu.style.display = 'none';
                  } else {
                    mobileMenu.style.display = 'flex';
                  }
                }, {passive: false});
                
                // Eğer başka yere tıklarsa menüyü gizle
                document.addEventListener('click', function(e) {
                  if (mobileMenu.style.display === 'flex' && 
                     !mobileMenu.contains(e.target) && 
                     !hamburgerBtn.contains(e.target)) {
                    mobileMenu.style.display = 'none';
                  }
                });
              }
            }
            
            // Sayfa yüklendiğinde çalıştır
            if (document.readyState === "complete" || document.readyState === "interactive") {
              setTimeout(initMobileMenu, 100);
            } else {
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initMobileMenu, 100);
              });
            }
            
            // React navigation sonrası tekrar çalıştır
            var lastUrl = location.href;
            var observer = new MutationObserver(function() {
              if (location.href !== lastUrl) {
                lastUrl = location.href;
                setTimeout(initMobileMenu, 300);
              }
            });
            observer.observe(document, {subtree: true, childList: true});
            
            // Periyodik olarak kontrol et
            setInterval(initMobileMenu, 2000);
          })();
        `}} />
      </body>
    </html>
  );
}