import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  ParkingSquare,
  TramFront,
  Landmark,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white">
      {children}
    </div>
  );
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  restaurants: UtensilsCrossed,
  parking: ParkingSquare,
  transport: TramFront,
  pratique: Wrench,
  wellness: Sparkles,
  culture: Landmark,
};

export default function Explore() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("restaurants");

  const categories = t.explore.categories.map((cat) => ({
    ...cat,
    icon: CATEGORY_ICONS[cat.id],
  }));
  const displayList = t.explore.places[active as keyof typeof t.explore.places];


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
          <div className="px-4 pt-4 flex items-center justify-between shrink-0">
            <Link to="/" aria-label={t.common.back} className="h-11 w-11 flex items-center justify-center">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
            <SettingsPopover variant="light" />
          </div>

          {/* Title */}
          <div className="text-center px-4 mt-1 mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              {t.explore.title}
            </h1>
            <p className="text-base text-white/80 mt-1">
              {t.explore.subtitle}
            </p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-6">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-[6px] w-full aspect-[106/92] rounded-xl text-sm font-medium transition-colors backdrop-blur-md border border-[#312B37]/20 dark:border-transparent",
                    active === cat.id
                      ? "bg-[#312B37] text-white dark:bg-white dark:text-[#312B37]"
                      : "bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white hover:bg-white/95 dark:hover:bg-[#312B37]/85"
                  )}
                >
                  <cat.icon className="h-7 w-7 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {displayList?.length === 0 && (
                <p className="text-center text-sm text-white/80 py-6">
                  {t.explore.comingSoon}
                </p>
              )}
              {displayList?.map((place, i) => (
                <a
                  key={`${place.name}-${i}`}
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    place.mapQuery
                      ? place.mapQuery
                      : place.address
                      ? `${place.name}, ${place.address}, Paris`
                      : `${place.name} Paris 9`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl px-5 py-4 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 border border-[#312B37]/20 dark:border-transparent hover:bg-white/95 dark:hover:bg-[#312B37]/85 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[17px] font-semibold text-[#312B37] dark:text-white truncate">
                      {place.name}
                    </p>
                    {place.desc && (
                      <p className="text-[14px] text-[#312B37]/70 dark:text-white/80 mt-0.5 truncate">
                        {place.desc}
                      </p>
                    )}
                  </div>
                  {place.right && (
                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      <span className="text-[15px] font-medium text-[#312B37]/70 dark:text-white/80">
                        {place.right}
                      </span>
                      <ChevronRight
                        className="h-5 w-5 text-[#312B37]/70 dark:text-white/80"
                        strokeWidth={1.5}
                      />
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Footer logo */}
          <div className="flex items-center justify-center gap-5 pt-8 pb-2">
            <img
              src={joroLogo}
              alt="Jöro Office"
              className="h-[26px] w-auto object-contain brightness-0 invert"
            />
            <img
              src={planetLogo}
              alt="1% for the Planet"
              className="h-[42px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
