import { Link } from "react-router-dom";
import {
  KeyRound,
  Home as HomeIcon,
  Info as InfoIcon,
  Compass,
  Recycle,
  Heart,
  ConciergeBell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";
import { useProperty } from "@/property/useProperty";

type MenuItem = {
  label: string;
  desc?: string;
  icon: LucideIcon;
  to: string;
};

export default function Welcome() {
  const { data: property } = useProperty();

  const menu: MenuItem[] = [
    { label: "Infos pratiques", desc: "Wifi, procédure d’accès", icon: KeyRound, to: "/checkin" },
    { label: "Guide espace", icon: HomeIcon, to: "/facilities" },
    { label: "Services", icon: ConciergeBell, to: "/services" },
    { label: "Urgences", desc: "Contacts importants", icon: InfoIcon, to: "/info" },
    { label: "Adresses utiles", icon: Compass, to: "/explore" },
    { label: "Éco gestes", desc: "Gestion déchets, tri sélectif", icon: Recycle, to: "/checkout" },
    { label: "Merci beaucoup", icon: Heart, to: "/thanks" },
  ];

  return (
    <div className="h-[100dvh] w-full bg-muted/30">
      <div className="mx-auto w-full max-w-[760px] h-[100dvh] relative overflow-hidden shadow-sm">
        {/* Background image */}
        <img
          src={heroImg}
          alt={property ? `Bienvenue à ${property.name}` : "Bienvenue"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark overlay for readability (stronger in dark mode) */}
        <div className="absolute inset-0 bg-[#312B37]/20 dark:bg-[#312B37]/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full pb-6">
          {/* Top: settings icon (same position as back arrows on other pages) */}
          <div className="px-4 pt-4 flex items-center justify-end shrink-0">
            <SettingsPopover variant="light" />
          </div>

          {/* Title / subtitle (same level as other page titles) */}
          <div className="text-center px-4 mt-1 shrink-0">
            <h1 className="font-serif font-medium text-white text-[44px] leading-none tracking-tight uppercase">
              Bienvenue
            </h1>
            <p className="mt-2 text-white/95 text-[17px] font-medium">
              chez {property?.name ?? " "}
            </p>
          </div>

          {/* Menu buttons — fills space between title and footer logo */}
          <nav className="flex-1 min-h-0 flex flex-col justify-center gap-[15px] py-6 px-[40px]">
            {menu
              .filter((item) => item.label !== "Merci beaucoup")
              .map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group relative flex items-center rounded-full p-[3px] backdrop-blur-md transition-colors
                    bg-white/75 hover:bg-white/85
                    dark:bg-[#312B37]/80 dark:hover:bg-[#312B37]/90"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full
                    border border-[#312B37]/40
                    dark:bg-[#47414D] dark:border-transparent">
                    <item.icon
                      className="h-[30px] w-[30px] text-[#312B37] dark:text-white"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="flex-1 flex flex-col items-center text-center px-2 -ml-10">
                    <span className="text-[15px] font-semibold uppercase tracking-wide text-[#312B37] dark:text-white leading-tight">
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="text-[12px] font-medium text-[#312B37]/70 dark:text-white/80 mt-0.5">
                        {item.desc}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
          </nav>


          {/* Footer logo */}
          <div className="flex items-center justify-center gap-5 pt-2 shrink-0">
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
