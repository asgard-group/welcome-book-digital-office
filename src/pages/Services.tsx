import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Pencil,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import joroMark from "@/assets/logo-joro.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";
import { useLanguage } from "@/i18n/LanguageContext";

const TAB_ICONS: Record<string, LucideIcon> = { inclus: Check, devis: Pencil };

function ItemRow({
  title,
  desc,
  indicator,
}: {
  title: string;
  desc: string;
  indicator: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl px-5 py-4 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 border border-[#312B37]/20 dark:border-transparent">
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-semibold text-[#312B37] dark:text-white truncate">
          {title}
        </p>
        <p className="text-[14px] text-[#312B37]/70 dark:text-white/80 mt-0.5 truncate">
          {desc}
        </p>
      </div>
      {indicator}
    </div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("inclus");

  const tabs = [
    { id: "inclus", icon: TAB_ICONS.inclus, label: t.services.tabIncluded },
    { id: "devis", icon: TAB_ICONS.devis, label: t.services.tabQuote },
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
          <div className="px-4 pt-4 flex items-center justify-between shrink-0">
            <Link to="/" aria-label={t.common.back} className="h-11 w-11 flex items-center justify-center">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
            <SettingsPopover variant="light" />
          </div>

          {/* Title */}
          <div className="text-center px-4 mt-1 mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              {t.services.title}
            </h1>
            <p className="text-base text-white/80 mt-1">{t.services.subtitle}</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-[6px] w-full aspect-[106/92] max-h-[100px] rounded-xl text-sm font-medium transition-colors backdrop-blur-md border border-[#312B37]/20 dark:border-transparent",
                    active === tab.id
                      ? "bg-[#312B37] text-white dark:bg-white dark:text-[#312B37]"
                      : "bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white hover:bg-white/95 dark:hover:bg-[#312B37]/85"
                  )}
                >
                  <tab.icon className="h-7 w-7 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>

            {active === "inclus" && (
              <div className="space-y-3">
                {t.services.includedItems.map((item) => (
                  <ItemRow
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                    indicator={
                      <Check
                        className="h-5 w-5 text-[#312B37] dark:text-white shrink-0 ml-3"
                        strokeWidth={2}
                      />
                    }
                  />
                ))}
              </div>
            )}

            {active === "devis" && (
              <div className="space-y-3">
                {t.services.quoteItems.map((item) => (
                  <ItemRow
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                    indicator={
                      <div className="flex items-center shrink-0 ml-3">
                        <span className="text-[15px] font-medium text-[#312B37]/70 dark:text-white/80">
                          {t.services.quoteLabel}
                        </span>
                        <ChevronRight
                          className="h-5 w-5 text-[#312B37]/70 dark:text-white/80"
                          strokeWidth={1.5}
                        />
                      </div>
                    }
                  />
                ))}
              </div>
            )}

            {/* Jöro Space */}
            <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white">
              <div className="flex flex-col items-center text-center pt-2 pb-4">
                <img src={joroMark} alt="" className="h-10 w-10 object-contain dark:invert" />
                <h2 className="text-xl font-semibold text-[#312B37] dark:text-white leading-tight mt-3">
                  {t.services.joroSpaceTitle}
                </h2>
                <p className="text-[13px] text-[#312B37]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  {t.services.joroSpaceSubtitle}
                </p>
              </div>
              <div className="border-t border-[#312B37]/15 dark:border-white/15" />
              <div className="divide-y divide-[#312B37]/15 dark:divide-white/15">
                {t.services.joroSpaceItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 py-4"
                  >
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="font-semibold text-[#312B37] dark:text-white text-sm">{item.name}</p>
                      <p className="text-xs uppercase text-[#312B37]/70 dark:text-white/80">{item.role}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-[#312B37] dark:text-white shrink-0">
                      {t.services.discoverLabel}
                      <ChevronRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
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
