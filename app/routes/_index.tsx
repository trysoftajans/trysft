import React, { useState, useEffect } from "react";
import { useLocation } from "@remix-run/react";
import Home from "~/components/Home";
import ProcessStep from "~/components/ProcessSteps";
import Services from "~/components/Services";
import InfoCards from "~/components/InfoCards";
import Footer from "~/components/Footer";
import WhyChooseUs from "~/components/WhyChooseUs";

export default function Index() {
  // Client-side'da olup olmadığımızı kontrol eden state
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Router hooks'ları her zaman çağrılmalı (koşullu olmamalı)
  const location = useLocation();

  // Component mount olduğunda client-side'da olduğumuzu işaretle
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Client-side'da olduğumuzda ve location hash değiştiğinde çalışacak effect
  useEffect(() => {
    // Sadece client-side'da ve #services hash'i varsa çalış
    if (isBrowser && location.hash === "#services") {
      // Öncelikle tarayıcıyı en üste çekiyoruz:
      window.scrollTo(0, 0);
      // URL'den hash bilgisini kaldırıyoruz:
      window.history.replaceState(null, "", window.location.pathname);

      // Sayfa tamamen render edildikten sonra, biraz bekleyip smooth scroll uyguluyoruz:
      setTimeout(() => {
        const element = document.getElementById("services");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 
    }
  }, [location, isBrowser]); // isBrowser'ı dependency olarak ekledik

    

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Home />
      <Services />
      <ProcessStep />
      <InfoCards />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}