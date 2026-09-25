import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tv,
  CookingPot,
  Building2,
  DoorOpen,
  Sun,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink as ExternalLinkConfirm } from "@/components/ExternalLink";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import photoroomLogo from "@/assets/logo-photoroom-white.png";
import projeterImg from "@/assets/projeter.png";
import ecranImg from "@/assets/écran.png";
import visioImg from "@/assets/Visioconférence.png";
import fontaineImg from "@/assets/fontaine.png";
import microOndeImg from "@/assets/micro_onde.png";
import cafeImg from "@/assets/café.png";
import laveVaisselleImg from "@/assets/lave_vaisselle.png";
import rMoins1Img from "@/assets/r-1.jpg";
import rdcImg from "@/assets/rdc.jpg";
import rPlus1Img from "@/assets/r+1.jpg";
import rPlus2Img from "@/assets/r+2.jpg";
import rooftopImg from "@/assets/rooftop.jpg";

const SECTION_ICONS: Record<string, LucideIcon> = {
  equipements: Tv,
  "cuisine-equipements": CookingPot,
  "r-1": Building2,
  rdc: DoorOpen,
  "r+1": Building2,
  "r+2": Building2,
  "r+3-rooftop": Sun,
};

const SECTION_ITEM_IMAGES: Record<string, string[]> = {
  equipements: [projeterImg, ecranImg, visioImg, fontaineImg],
  "cuisine-equipements": [microOndeImg, cafeImg, laveVaisselleImg],
};

const FLOOR_IMAGES: Record<string, string> = {
  "r-1": rMoins1Img,
  rdc: rdcImg,
  "r+1": rPlus1Img,
  "r+2": rPlus2Img,
  "r+3-rooftop": rooftopImg,
};

export default function Facilities() {
  const { t } = useLanguage();

  const sections = t.facilities.sections.map((section) => ({
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
          <div className="px-4 pt-4 flex items-center shrink-0">
            <Link to="/" aria-label={t.common.back} className="h-[41px] w-[41px] flex items-center justify-center backdrop-blur-md bg-muted/30 rounded-[6px]">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
          </div>

          {/* Title */}
          <div className="text-center px-4 pt-[30px] mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              {t.facilities.title}
            </h1>
            <p className="text-base text-white/80">
              {t.facilities.subtitle}
            </p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Sections accordion */}
            <Accordion type="multiple" defaultValue={["equipements"]} className="space-y-3">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="rounded-xl px-4 backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80"
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
                    {section.kind === "video" ? (
                      <div className="pt-1 space-y-3">
                        {section.items.map((item, i) => (
                          <div key={item.name} className="flex items-center gap-3">
                            <img
                              src={SECTION_ITEM_IMAGES[section.id]?.[i] ?? heroImg}
                              alt=""
                              className="w-[5rem] h-[4rem] rounded-[0.5rem] object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-[#312B37] dark:text-white truncate">
                                {item.name}
                              </p>
                              <p className="text-sm text-[#312B37]/70 dark:text-white/70 truncate">
                                {item.detail ?? t.facilities.noticeLabel}
                              </p>
                            </div>
                            {!item.detail && (
                              item.videoUrl ? (
                                <ExternalLinkConfirm
                                  href={item.videoUrl}
                                  newTab
                                  aria-label={t.facilities.videoLinkLabel}
                                  className="text-[#312B37] dark:text-white shrink-0"
                                >
                                  <ExternalLink className="h-5 w-5" strokeWidth={1.75} />
                                </ExternalLinkConfirm>
                              ) : (
                                <span
                                  aria-disabled="true"
                                  aria-label={t.facilities.videoLinkLabel}
                                  className="text-[#312B37]/40 dark:text-white/40 shrink-0 cursor-default"
                                >
                                  <ExternalLink className="h-5 w-5" strokeWidth={1.75} />
                                </span>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pt-1">
                        <img
                          src={FLOOR_IMAGES[section.id] ?? heroImg}
                          alt=""
                          className="w-full aspect-[16/7] rounded-lg object-cover mb-4"
                        />
                        <div className="space-y-3">
                          {section.items.map((item) => (
                            <div key={item.name} className="grid grid-cols-2 items-start gap-4">
                              <p className="text-sm font-medium text-[#312B37] dark:text-white">
                                {item.name}
                              </p>
                              <div className="text-left">
                                {item.detail.split("\n").map((line, i) => (
                                  <p
                                    key={i}
                                    className="text-sm text-[#312B37]/70 dark:text-white/80 leading-snug"
                                  >
                                    {line}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
