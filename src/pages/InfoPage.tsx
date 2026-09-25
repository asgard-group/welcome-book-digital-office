import { Link } from "react-router-dom";
import { ChevronLeft, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import photoroomLogo from "@/assets/logo-photoroom-white.png";
import { ContactWidget } from "@/components/ContactWidget";
import { ExternalLink } from "@/components/ExternalLink";

export default function InfoPage() {
  const { t } = useLanguage();

  const emergencyList = [
    { label: t.info.police, desc: t.info.policeDesc, number: "17" },
    { label: t.info.samu, desc: t.info.samuDesc, number: "15" },
    { label: t.info.fire, desc: t.info.fireDesc, number: "18" },
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
          <div className="text-center px-4 pt-[30px] mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              {t.info.securityTitle}
            </h1>
            <p className="text-base text-white/80">
              {t.info.subtitle}
            </p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Carte 112 */}
            <ExternalLink
              href="tel:112"
              className="flex items-center gap-4 rounded-xl p-4 backdrop-blur-md bg-destructive text-destructive-foreground"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 shrink-0">
                <Phone className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[32px] font-bold leading-none">112</p>
                <p className="text-sm mt-1.5 opacity-85 font-medium">
                  {t.info.europeanUniversal}
                </p>
              </div>
            </ExternalLink>

            {/* Lignes d'urgence */}
            <div className="rounded-xl backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80 divide-y divide-[#312B37]/10 dark:divide-white/10">
              {emergencyList.map((item) => (
                <ExternalLink
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="flex items-center justify-between gap-3 px-4 py-4"
                >
                  <div>
                    <p className="text-[15px] font-semibold uppercase text-[#312B37] dark:text-white">
                      {item.label}
                    </p>
                    <p className="text-sm text-[#312B37]/60 dark:text-white/60">{item.desc}</p>
                  </div>
                  <span className="relative flex items-center shrink-0">
                    <span className="flex items-center h-9 pl-4 pr-11 rounded-full bg-destructive/15 text-destructive font-bold text-lg">
                      {item.number}
                    </span>
                    <span className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-[#47414D] shadow-sm">
                      <Phone className="h-4 w-4 text-[#312B37] dark:text-white" strokeWidth={2} />
                    </span>
                  </span>
                </ExternalLink>
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
