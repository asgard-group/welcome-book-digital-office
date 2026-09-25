import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ArrowRight,
  Check,
  Pencil,
  Wrench,
  KeyRound,
  Sparkles,
  Wifi,
  ShieldCheck,
  CookingPot,
  Coffee,
  Droplet,
  BellRing,
  Printer,
  Apple,
  Palette,
  Leaf,
  Armchair,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import photoroomLogo from "@/assets/logo-photoroom-white.png";
import meetingImg from "@/assets/meeting.jpg";
import kaffeImg from "@/assets/kaffe.jpg";
import livingImg from "@/assets/living.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink } from "@/components/ExternalLink";

const JORO_SPACE_IMAGES = [meetingImg, kaffeImg, livingImg];

const INCLUDED_ICONS: LucideIcon[] = [Wrench, ShieldCheck, KeyRound, Wifi, CookingPot, Coffee, Sparkles];
const QUOTE_ICONS: LucideIcon[] = [Droplet, Printer, Apple, Palette, Leaf, Armchair, BellRing];
const QUOTE_EMAILS: string[] = [
  "audrey.robin@joro-space.fr",
  "audrey.robin@joro-space.fr",
  "audrey.robin@joro-space.fr",
  "berenice.carrey@joro-space.fr",
  "audrey.robin@joro-space.fr",
  "audrey.robin@joro-space.fr",
  "audrey.robin@joro-space.fr",
];

function ServiceCard({
  icon: Icon,
  title,
  indicator,
  href,
}: {
  icon: LucideIcon;
  title: string;
  indicator: React.ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <Icon className="h-6 w-6 text-[#312B37] dark:text-white" strokeWidth={1.75} />
      <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#312B37]/10 dark:bg-white/15">
        {indicator}
      </span>
      <p className="mt-4 pr-[36px] text-[15px] font-semibold text-[#312B37] dark:text-white leading-snug">
        {title}
      </p>
    </>
  );
  const className = "relative rounded-xl p-4 backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80";

  if (href) {
    return (
      <ExternalLink href={href} className={className}>
        {content}
      </ExternalLink>
    );
  }
  return <div className={className}>{content}</div>;
}

export default function Services() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("inclus");

  const tabs = [
    { id: "inclus", label: t.services.tabIncluded, count: t.services.includedItems.length },
    { id: "devis", label: t.services.tabQuote, count: t.services.quoteItems.length },
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
              {t.services.title}
            </h1>
            <p className="text-base text-white/80">{t.services.subtitle}</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            <div className="flex rounded-full p-[0.1rem] backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors",
                    active === tab.id
                      ? "bg-[#312B37] text-white dark:bg-white dark:text-[#312B37]"
                      : "text-[#312B37] dark:text-white"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-xs font-medium",
                      active === tab.id
                        ? "bg-white/20 text-white dark:bg-[#312B37]/10 dark:text-[#312B37]"
                        : "bg-[#312B37]/10 text-[#312B37] dark:bg-white/15 dark:text-white"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {active === "inclus" && (
              <div className="grid grid-cols-2 gap-3">
                {t.services.includedItems.map((item, i) => (
                  <ServiceCard
                    key={item.title}
                    icon={INCLUDED_ICONS[i]}
                    title={item.title}
                    indicator={<Check className="h-4 w-4 text-[#312B37] dark:text-white" strokeWidth={2.5} />}
                  />
                ))}
              </div>
            )}

            {active === "devis" && (
              <div className="grid grid-cols-2 gap-3">
                {t.services.quoteItems.map((item, i) => (
                  <ServiceCard
                    key={item.title}
                    icon={QUOTE_ICONS[i]}
                    title={item.title}
                    href={`mailto:${QUOTE_EMAILS[i]}`}
                    indicator={<Pencil className="h-4 w-4 text-[#312B37] dark:text-white" strokeWidth={2.5} />}
                  />
                ))}
              </div>
            )}

            {/* Jöro Space */}
            <div className="rounded-xl p-4 backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white">
              <h2 className="text-xl font-semibold text-[#312B37] dark:text-white leading-tight text-left">
                {t.services.joroSpaceTitle}
              </h2>
              <p className="text-[13px] text-[#312B37]/70 dark:text-white/80 mb-4">
                {t.services.joroSpaceSubtitle}
              </p>

              <div className="space-y-3">
                {t.services.joroSpaceItems.map((item, i) => (
                  <ExternalLink
                    key={item.name}
                    href={item.link}
                    newTab
                    className="relative block aspect-[16/6] rounded-[0.5rem] overflow-hidden"
                  >
                    <img src={JORO_SPACE_IMAGES[i]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-[0.8rem]">
                      <div className="min-w-0">
                        <p className="font-semibold text-white leading-tight">{item.name}</p>
                        <p className="text-sm text-white/80 mt-0.5">{item.role}</p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm shrink-0">
                        <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                      </span>
                    </div>
                  </ExternalLink>
                ))}
              </div>
            </div>
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
