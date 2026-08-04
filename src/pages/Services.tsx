import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Pencil,
  TramFront,
  Settings,
  Lock,
  Sparkles,
  Wifi,
  Shield,
  UtensilsCrossed,
  Lamp,
  Sprout,
  Building2,
} from "lucide-react";
import heroImg from "@/assets/hero-office.png";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";

const TABS = [
  { id: "inclus", icon: Check, label: "Inclus" },
  { id: "devis", icon: Pencil, label: "Sur Devis" },
  { id: "custom", icon: TramFront, label: "Custom" },
];

const INCLUS_ITEMS = [
  { icon: Settings, title: "Maintenance technique", desc: "Office manager dédié" },
  { icon: Lock, title: "Contrôle d'accès", desc: "Badge/Smartphone" },
  { icon: Sparkles, title: "Ménage", desc: "2 fois par semaine" },
  { icon: Wifi, title: "Internet fibre pro", desc: "Fibre dédiée en option sur demande" },
  { icon: Shield, title: "Accès 24/7 sécurisé", desc: "Lorem ipsum" },
  { icon: UtensilsCrossed, title: "Cuisine équipée", desc: "Lorem ipsum" },
];

const DEVIS_ITEMS = [
  { title: "Cuisine Rooftop", desc: "Petit-déjeuner & Déjeuner" },
  { title: "Espaces évènement", desc: "Lorem ipsum" },
  { title: "Fontaine à eau", desc: "Lorem ipsum" },
  { title: "Fibre dédié", desc: "Lorem ipsum" },
  { title: "Serveur dédié", desc: "Lorem ipsum" },
  { title: "Vidéo surveillance", desc: "Installation Alarme & Vidéo" },
  { title: "Copieur/Imprimante", desc: "Lorem ipsum" },
];

const CUSTOM_ITEMS = [
  { icon: Pencil, title: "Branding de votre espace", desc: "Lorem ipsum" },
  { icon: Lamp, title: "Mobilier & décoration", desc: "Lorem ipsum" },
  { icon: Sprout, title: "Végétalisation des espaces", desc: "2 fois par semaine" },
];

const JORO_HOUSE_ITEMS = [
  { name: "Jöro Meeting", role: "Espace événementiel" },
  { name: "Jöro Kaffé", role: "Café & coworking" },
  { name: "Jöro Living", role: "Apparthôtels" },
];

function IconList({ items }: { items: { icon: typeof Settings; title: string; desc: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-3 rounded-xl px-4 py-3 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 border border-[#1c2626]/20 dark:border-transparent"
        >
          <item.icon className="h-5 w-5 text-[#1c2626] dark:text-white shrink-0" strokeWidth={2} />
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-[#1c2626] dark:text-white leading-tight">
              {item.title}
            </p>
            <p className="text-sm text-[#1c2626]/70 dark:text-white/80 mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState<string>("inclus");

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
              Services
            </h1>
            <p className="text-base text-white/80 mt-1">Lorem ipsum</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-[6px] w-full aspect-[106/92] rounded-xl text-sm font-medium transition-colors backdrop-blur-md border border-[#1c2626]/20 dark:border-transparent",
                    active === tab.id
                      ? "bg-[#1c2626] text-white dark:bg-white dark:text-[#1c2626]"
                      : "bg-white/90 dark:bg-[#1c2626]/80 text-[#1c2626] dark:text-white hover:bg-white/95 dark:hover:bg-[#1c2626]/85"
                  )}
                >
                  <tab.icon className="h-7 w-7 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>

            {active === "inclus" && <IconList items={INCLUS_ITEMS} />}

            {active === "devis" && (
              <div className="space-y-3">
                {DEVIS_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-xl px-5 py-4 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 border border-[#1c2626]/20 dark:border-transparent"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[17px] font-semibold text-[#1c2626] dark:text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-[14px] text-[#1c2626]/70 dark:text-white/80 mt-0.5 truncate">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      <span className="text-[15px] font-medium text-[#1c2626]/70 dark:text-white/80">
                        Devis
                      </span>
                      <ChevronRight className="h-5 w-5 text-[#1c2626]/70 dark:text-white/80" strokeWidth={1.5} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {active === "custom" && <IconList items={CUSTOM_ITEMS} />}

            {/* Jöro House */}
            <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 text-[#1c2626] dark:text-white">
              <div className="flex flex-col items-center text-center pt-2 pb-4">
                <Building2 className="h-10 w-10 text-foreground" strokeWidth={2} />
                <h2 className="text-xl font-semibold text-[#1c2626] dark:text-white leading-tight mt-3">
                  Jöro House
                </h2>
                <p className="text-[13px] text-[#1c2626]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  Lorem ipsum
                </p>
              </div>
              <div className="border-t border-[#1c2626]/15 dark:border-white/15" />
              <div className="divide-y divide-[#1c2626]/15 dark:divide-white/15">
                {JORO_HOUSE_ITEMS.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 py-4">
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="font-semibold text-[#1c2626] dark:text-white text-sm">{item.name}</p>
                      <p className="text-xs uppercase text-[#1c2626]/70 dark:text-white/80">{item.role}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-[#1c2626] dark:text-white shrink-0">
                      Découvrir
                      <ChevronRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                ))}
              </div>
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
