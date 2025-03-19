import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const services = [
  { id: 1, title: "Google Reklamları", icon: "/image/home/google.png" },
  { id: 2, title: "Sosyal Medya Reklamları", icon: "/image/home/facebook.png" },
  { id: 3, title: "Sosyal Medya Yönetimi", icon: "/image/home/instagram.png" },
  { id: 4, title: "E-Ticaret Sitesi", icon: "/image/home/online-shop.png" },
  { id: 5, title: "Web Sitesi", icon: "/image/home/internet.png" },
  { id: 6, title: "SEO", icon: "/image/home/seo.png" },
];

const movingTexts = [
  "Dijital dünyada markanızı büyütmek için doğru yerdesiniz!",
  "SEO ve dijital reklamlarla fark yaratın!",
  "E-ticaret sitenizi en iyi şekilde yönetin!",
  "Sosyal medyada markanızı güçlendirin!",
  "Web sitenizle online dünyada öne çıkın!",
  "%100 Müşteri Memnuniyeti",
  "Hedefe Ulaşan Sonuçlar!",
  "Doğru Strateji, Maksimum Verim!",
  "Markanızı Geleceğe Taşıyoruz!",
  "Kesintisiz Destek ve Profesyonel Hizmet!",
  "Etkili Reklam, Büyük Sonuçlar!",
  "Sonuç Odaklı Pazarlama Stratejileri!",
];

export default function InfoSection() {
  // İstemci tarafı render'ı kontrol etmek için state ekleyelim
  const [isClient, setIsClient] = useState(false);

  // Bileşen mount edildikten sonra isClient'ı true yapalım
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-blue-50 to-white py-20 px-6 flex flex-col justify-center items-center relative">
      
      {/* Hizmetler Bölümü */}
      {isClient ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12 max-w-7xl w-full"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className="flex flex-col items-center p-4 bg-white shadow-md rounded-md transition-transform transform hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.id * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <img src={service.icon} alt={service.title} className="w-16 h-16" />
              <h3 className="text-sm md:text-md font-semibold text-gray-800 mt-2 text-center">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12 max-w-7xl w-full">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="flex flex-col items-center p-4 bg-white shadow-md rounded-md"
            >
              <img src={service.icon} alt={service.title} className="w-16 h-16" />
              <h3 className="text-sm md:text-md font-semibold text-gray-800 mt-2 text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* Biz Kimiz Bölümü */}
      <div className="relative w-full flex flex-col md:flex-row justify-between max-w-7xl px-10 mb-12 items-center">
        {isClient ? (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
            className="max-w-2xl mx-auto text-center text-gray-800 z-10 text-base md:text-lg leading-relaxed flex flex-col justify-center items-center"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-6">
              Biz Kimiz?
            </h2>
            <p className="mb-4 text-sm md:text-xl text-gray-700 leading-relaxed">
              Günümüzde markalar, başarı için yalnızca bir web sitesine değil, her şeyi kapsayan bir dijital pazarlama stratejisine ihtiyaç duyuyor.
            </p>
            <p className="text-xs md:text-lg text-gray-600 leading-relaxed">
              <strong className="text-blue-800">TRYSOFT</strong> olarak, sizi sadece bir müşteri değil, birlikte büyüdüğümüz bir
              <strong className="text-blue-800"> iş ortağı </strong> olarak görüyoruz. Dijital dünyada fark yaratmanız için stratejik planlamalar yapıyor,
              yenilikçi çözümlerle markanızı güçlendiriyoruz. Başarınızı en üst seviyeye taşımak için her adımda yanınızda olmaktan mutluluk duyuyoruz.
            </p>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto text-center text-gray-800 z-10 text-base md:text-lg leading-relaxed flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-6">
              Biz Kimiz?
            </h2>
            <p className="mb-4 text-sm md:text-xl text-gray-700 leading-relaxed">
              Günümüzde markalar, başarı için yalnızca bir web sitesine değil, her şeyi kapsayan bir dijital pazarlama stratejisine ihtiyaç duyuyor.
            </p>
            <p className="text-xs md:text-lg text-gray-600 leading-relaxed">
              <strong className="text-blue-800">TRYSOFT</strong> olarak, sizi sadece bir müşteri değil, birlikte büyüdüğümüz bir
              <strong className="text-blue-800"> iş ortağı </strong> olarak görüyoruz. Dijital dünyada fark yaratmanız için stratejik planlamalar yapıyor,
              yenilikçi çözümlerle markanızı güçlendiriyoruz. Başarınızı en üst seviyeye taşımak için her adımda yanınızda olmaktan mutluluk duyuyoruz.
            </p>
          </div>
        )}

        {isClient ? (
          <motion.img 
            src="/image/home/infosection.png" 
            alt="Biz Kimiz?" 
            className="w-full md:w-1/3 object-cover opacity-70 mix-blend-multiply mb-6 md:mb-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false, amount: 0.2 }}
          />
        ) : (
          <img 
            src="/image/home/infosection.png" 
            alt="Biz Kimiz?" 
            className="w-full md:w-1/3 object-cover opacity-70 mix-blend-multiply mb-6 md:mb-0"
          />
        )}
      </div>

      {/* Sürekli Hareketli Kayan Yazılar */}
      <div className="relative w-full overflow-hidden bg-gray-200 py-2 rounded-md shadow-md flex justify-center whitespace-nowrap">
        {isClient ? (
          <motion.div 
            className="flex space-x-4"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 380, repeat: Infinity, ease: "linear" }}
          >
            {Array(10)
              .fill(movingTexts)
              .flat()
              .map((text, index) => (
                <div 
                  key={index} 
                  className="bg-white px-3 py-2 rounded-md shadow-md text-gray-900 font-bold text-xs md:text-sm whitespace-nowrap"
                >
                  {text}
                </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex space-x-4 animate-marquee">
            {movingTexts.map((text, index) => (
              <div 
                key={index} 
                className="bg-white px-3 py-2 rounded-md shadow-md text-gray-900 font-bold text-xs md:text-sm whitespace-nowrap"
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}