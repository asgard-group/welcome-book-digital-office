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
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/hero-office.png";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 text-[#1c2626] dark:text-white">
      {children}
    </div>
  );
}

const placesData: Record<string, { name: string; desc?: string; right?: string }[]> = {
  restaurants: [],
  parking: [
    { name: "Claridge", desc: "Parking 24h/24", right: "500 m" },
    { name: "Point Show", desc: "Parking 24h/24", right: "500 m" },
    { name: "Champs Elysées", desc: "Parking 24h/24", right: "600 m" },
  ],
  transport: [
    { name: "Métro 7", desc: "Station Cadet", right: "2 min" },
    { name: "Métro 12", desc: "Station Notre-Dame-de-Lorette", right: "4 min" },
    { name: "Métro 8 & 9", desc: "Station Opéra", right: "8 min" },
    { name: "Bus 26/43/45/85", desc: "Châteaudun - Lamartine", right: "1 min" },
    { name: "RER E", desc: "Station Haussmann", right: "10 min" },
    { name: "Station Vélib", desc: "Parking à vélos sur site", right: "80 m" },
  ],
  pratique: [],
  wellness: [],
  culture: [],
};


const categories = [
  { id: "restaurants", icon: UtensilsCrossed, label: "Restaurants" },
  { id: "parking", icon: ParkingSquare, label: "Parking" },
  { id: "transport", icon: TramFront, label: "Transport" },
  { id: "pratique", icon: Wrench, label: "Pratique" },
  { id: "wellness", icon: Sparkles, label: "Bien-être" },
  { id: "culture", icon: Landmark, label: "Culture" },
];

export default function Explore() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<string>("restaurants");

  const displayList = placesData[active];


  return (
    <div className="min-h-screen w-full bg-muted/30">
      <div className="mx-auto w-full max-w-[760px] min-h-screen relative overflow-hidden shadow-sm">
        {/* Background image (fixed full-viewport wrapper to avoid jumps on mobile scroll) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="relative mx-auto h-full w-full max-w-[760px]">
            <img
              src={heroImg}
              alt="Haussmann Mogador"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen pb-6">
          {/* Back arrow */}
          <div className="px-4 pt-4 flex items-center justify-between shrink-0">
            <Link to="/" aria-label="Back" className="h-11 w-11 flex items-center justify-center">
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
                    "flex flex-col items-center justify-center gap-[6px] w-full aspect-[106/92] rounded-xl text-sm font-medium transition-colors backdrop-blur-md border border-[#1c2626]/20 dark:border-transparent",
                    active === cat.id
                      ? "bg-[#1c2626] text-white dark:bg-white dark:text-[#1c2626]"
                      : "bg-white/90 dark:bg-[#1c2626]/80 text-[#1c2626] dark:text-white hover:bg-white/95 dark:hover:bg-[#1c2626]/85"
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
                  {lang === "fr" ? "Adresses à venir." : "Addresses coming soon."}
                </p>
              )}
              {displayList?.map((place) => (
                <a
                  key={place.name}
                  href={`https://www.google.com/maps/search/${encodeURIComponent(place.name + " Paris 9")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl px-5 py-4 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 border border-[#1c2626]/20 dark:border-transparent hover:bg-white/95 dark:hover:bg-[#1c2626]/85 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[17px] font-semibold text-[#1c2626] dark:text-white truncate">
                      {place.name}
                    </p>
                    {place.desc && (
                      <p className="text-[14px] text-[#1c2626]/70 dark:text-white/80 mt-0.5 truncate">
                        {place.desc}
                      </p>
                    )}
                  </div>
                  {place.right && (
                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      <span className="text-[15px] font-medium text-[#1c2626]/70 dark:text-white/80">
                        {place.right}
                      </span>
                      <ChevronRight
                        className="h-5 w-5 text-[#1c2626]/70 dark:text-white/80"
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
