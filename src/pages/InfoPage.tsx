import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Phone,
  Shield,
  Ambulance,
  Flame,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import photoroomLogo from "@/assets/logo-photoroom-white.png";
import { ContactWidget } from "@/components/ContactWidget";

export default function InfoPage() {
  const { t } = useLanguage();

  const emergencyList = [
    { label: t.info.police, number: "17", icon: Shield },
    { label: t.info.samu, number: "15", icon: Ambulance },
    { label: t.info.fire, number: "18", icon: Flame },
  ];

  return (
    <div className="h-[100dvh] w-full bg-muted/30 overflow-hidden">
      <div className="mx-auto w-full max-w-[760px] h-[100dvh] relative overflow-hidden shadow-sm">
        {/* Background image (non-scrolling shell keeps it static; only the content below scrolls) */}
        <img
          src={heroImg}
          alt="Haussmann Mogador"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#312B37]/30 dark:bg-[#312B37]/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-6">
          {/* Back arrow */}
          <div className="px-4 pt-4 flex items-center shrink-0">
            <Link to="/" aria-label={t.common.back} className="h-[41px] w-[41px] flex items-center justify-center backdrop-blur-md bg-muted/30 rounded-[6px]">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
          </div>

          {/* Title */}
          <div className="text-center px-4 pt-[30px] mt-1 mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              {t.info.securityTitle}
            </h1>
            <p className="text-base text-white/80 mt-1">
              {t.info.subtitle}
            </p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Carte 112 */}
            <a
              href="tel:112"
              className="block rounded-xl p-4 backdrop-blur-md bg-destructive/90 text-destructive-foreground"
            >
              <p className="text-sm font-semibold mb-3">{t.info.emergencyNumber}</p>
              <div className="flex items-center justify-center gap-4">
                <Phone className="h-[56px] w-[56px] shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-[56px] font-medium leading-none">
                    112
                  </p>
                  <p className="text-sm mt-1 opacity-90 font-medium">
                    {t.info.europeanUniversal}
                  </p>
                </div>
              </div>
            </a>

            {/* Lignes d'urgence */}
            <div className="space-y-2">
              {emergencyList.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80 transition-colors hover:bg-[#FFFBF2]/90 dark:hover:bg-[#312B37]/85"
                >
                  <item.icon
                    className="h-5 w-5 text-[#312B37] dark:text-white shrink-0"
                    strokeWidth={2}
                  />
                  <span className="flex-1 text-[15px] font-medium text-[#312B37] dark:text-white">
                    {item.label}
                  </span>
                  <span className="text-[17px] font-semibold text-[#312B37] dark:text-white">
                    {item.number}
                  </span>
                </a>
              ))}
            </div>

            {/* Contact Jöro */}
            <ContactWidget />
          </div>

          {/* Footer logo */}
          <div className="flex items-center justify-center gap-5 pt-8">
            <img
              src={joroLogo}
              alt="Jöro Office"
              className="h-[25px] w-auto object-contain brightness-0 invert"
            />
            <img
              src={photoroomLogo}
              alt="Photoroom"
              className="h-[25px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
