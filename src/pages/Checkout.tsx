import {
  AlertCircle,
  ChevronLeft,
  Trash2,
  Leaf,
  Wind,
  Thermometer,
  Lightbulb,
  Droplet,
  StickyNote,
  Unplug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";
import { useLanguage } from "@/i18n/LanguageContext";

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white">
      {children}
    </div>
  );
}

const WASTE_ICONS: { icon: LucideIcon; color: string }[] = [
  { icon: Trash2, color: "text-[#7E7E7E]" },
  { icon: Trash2, color: "text-[#009300]" },
  { icon: Trash2, color: "text-[#ECA600]" },
];

const SECTION_ICONS: Record<string, LucideIcon> = {
  climatisation: Wind,
  chauffage: Thermometer,
  eclairage: Lightbulb,
  eau: Droplet,
  papier: StickyNote,
  bureautique: Unplug,
};

export default function Checkout() {
  const { t } = useLanguage();
  const wasteItems = t.checkout.wasteItems.map((item, i) => ({ ...item, ...WASTE_ICONS[i] }));
  const ecoSections = t.checkout.sections.map((section) => ({
    ...section,
    icon: SECTION_ICONS[section.id],
  }));

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
              {t.checkout.title}
            </h1>
            <p className="text-base text-white/80 mt-1">{t.checkout.subtitle}</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Gestion des déchets */}
            <Widget>
              <div className="flex flex-col items-center text-center pt-2 pb-4">
                <Trash2 className="h-10 w-10 text-foreground" strokeWidth={2} />
                <h2 className="text-xl font-semibold text-[#312B37] dark:text-white leading-tight mt-3">
                  {t.checkout.wasteTitle}
                </h2>
                <p className="text-[13px] text-[#312B37]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  {t.checkout.wasteSubtitle}
                </p>
              </div>
              <div className="border-t border-[#312B37]/15 dark:border-white/15" />
              <div className="divide-y divide-[#312B37]/15 dark:divide-white/15">
                {wasteItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 py-4">
                    <item.icon className={`h-5 w-5 shrink-0 ${item.color}`} strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#312B37] dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#312B37]/70 dark:text-white/80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Widget>

            {/* Information */}
            <Widget>
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-5 w-5 text-[#312B37] dark:text-white" strokeWidth={2} />
                <h2 className="font-semibold text-[#312B37] dark:text-white">{t.checkout.infoTitle}</h2>
              </div>
              <p className="text-sm text-[#312B37]/70 dark:text-white/80 leading-relaxed">
                {t.checkout.infoBody}
              </p>
            </Widget>

            {/* Éco Geste à adopter */}
            <Widget>
              <div className="flex flex-col items-center text-center pt-2 pb-2">
                <Leaf className="h-10 w-10 text-foreground" strokeWidth={2} />
                <h2 className="text-xl font-semibold text-[#312B37] dark:text-white leading-tight mt-3">
                  {t.checkout.adoptTitle}
                </h2>
                <p className="text-[13px] text-[#312B37]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  {t.checkout.adoptSubtitle}
                </p>
              </div>
            </Widget>

            {/* Éco gestes accordion */}
            <Accordion type="multiple" defaultValue={["climatisation"]} className="space-y-3">
              {ecoSections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="rounded-xl px-4 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 border border-[#312B37]/20 dark:border-transparent"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <section.icon
                        className="h-5 w-5 text-[#312B37] dark:text-white"
                        strokeWidth={2}
                      />
                      <span className="font-semibold text-[#312B37] dark:text-white">
                        {section.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-3 pt-1">
                      {section.items.map((item) => (
                        <div key={item.name} className="pl-8">
                          <p className="text-sm font-medium text-[#312B37] dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#312B37]/70 dark:text-white/80">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
