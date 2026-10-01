import {
  ChevronLeft,
  Wind,
  Thermometer,
  Lightbulb,
  Droplet,
  StickyNote,
  Unplug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import joroLogo from "@/assets/logo-joro-office.png";
import binMenager from "@/assets/ménager.png";
import binVerres from "@/assets/verres.png";
import binRecyclables from "@/assets/récyclables.png";
import iconBanane from "@/assets/banane.png";
import iconPapier from "@/assets/papier.png";
import iconGobelet from "@/assets/gobelet_carton.png";
import iconSac from "@/assets/sac_poubelle.png";
import iconBouteille from "@/assets/bouteille.png";
import iconBocale from "@/assets/bocale.png";
import iconBouteillePlastique from "@/assets/bouteille_plastique.png";
import iconCanette from "@/assets/canette.png";
import iconCarton from "@/assets/carton.png";
import iconPapierJourneau from "@/assets/papier_journeau.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { useProperty, DEFAULT_BACKGROUND_URL, DEFAULT_LOGO_URL } from "@/property/useProperty";

const WASTE_META = [
  {
    bg: "rgba(238,237,234,0.8)",
    bin: binMenager,
    icons: [iconBanane, iconPapier, iconGobelet, iconSac],
  },
  {
    bg: "rgba(225,238,224,0.8)",
    bin: binVerres,
    icons: [iconBouteille, iconBocale, iconBouteille, iconBocale],
  },
  {
    bg: "rgba(250,239,195,0.8)",
    bin: binRecyclables,
    icons: [iconBouteillePlastique, iconCanette, iconCarton, iconPapierJourneau],
  },
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
  const { buildingSlug } = useParams<{ buildingSlug: string }>();
  const { t } = useLanguage();
  const { data: property } = useProperty();
  const wasteItems = t.checkout.wasteItems.map((item, i) => ({ ...item, ...WASTE_META[i] }));
  const ecoSections = t.checkout.sections.map((section) => ({
    ...section,
    icon: SECTION_ICONS[section.id],
  }));

  return (
    <div className="h-app-shell w-full bg-brand-surface dark:bg-brand-ink overflow-hidden">
      <div className="mx-auto w-full max-w-[760px] h-app-shell relative overflow-hidden shadow-sm">
        {/* Background image (non-scrolling shell keeps it static; only the content below scrolls) */}
        <img
          src={property?.backgroundUrl ?? DEFAULT_BACKGROUND_URL}
          alt={property?.name ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-ink/30 dark:bg-brand-ink/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-6">
          {/* Back arrow */}
          <div className="sticky top-0 z-20 px-4 pt-4 flex items-center shrink-0">
            <Link to={`/${buildingSlug}/home`} aria-label={t.common.back} className="h-[41px] w-[41px] flex items-center justify-center backdrop-blur-md bg-white/30 dark:bg-brand-ink/50 rounded-[6px]">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
          </div>

          {/* Title */}
          <div className="text-center px-4 pt-[30px] mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              {t.checkout.title}
            </h1>
            <p className="text-base text-white/80">{t.checkout.subtitle}</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Gestion des déchets */}
            <div>
              <div className="space-y-3">
                {wasteItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative overflow-hidden rounded-xl backdrop-blur-[25px]"
                    style={{ backgroundColor: item.bg }}
                  >
                    <div className="relative z-10 max-w-[230px] pr-2 min-[330px]:max-w-none min-[330px]:pr-[128px] py-3 pl-4">
                      <h3 className="text-[15px] font-semibold text-brand-ink leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-brand-ink/70 mt-1 leading-snug">
                        {item.desc}
                      </p>
                      <div className="flex gap-1.5 mt-2.5">
                        {item.icons.map((icon, i) => (
                          <span
                            key={i}
                            className="h-8 w-8 rounded-full bg-white/70 flex items-center justify-center shrink-0 overflow-hidden"
                          >
                            <img src={icon} alt="" className="h-5 w-5 object-contain" />
                          </span>
                        ))}
                      </div>
                    </div>
                    <img
                      src={item.bin}
                      alt=""
                      className="hidden min-[330px]:block absolute right-[16px] top-[20px] bottom-0 w-[104px] object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Éco gestes accordion */}
            <div>
              <Accordion type="multiple" className="space-y-3">
                {ecoSections.map((section) => {
                  const faireItems = section.items.filter((item) => item.type === "faire");
                  const eviterItems = section.items.filter((item) => item.type === "eviter");
                  return (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      className="rounded-xl px-4 backdrop-blur-md bg-brand-surface/80 dark:bg-brand-ink/80"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <section.icon
                            className="h-5 w-5 text-brand-ink dark:text-white"
                            strokeWidth={2}
                          />
                          <span className="font-semibold text-brand-ink dark:text-white">
                            {section.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-4 pt-1">
                          {faireItems.length > 0 && (
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                {t.checkout.doLabel}
                              </span>
                              <div className="mt-2 space-y-3">
                                {faireItems.map((item) => (
                                  <div key={item.name}>
                                    <p className="text-sm font-medium text-brand-ink dark:text-white">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-brand-ink/70 dark:text-white/80">
                                      {item.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {eviterItems.length > 0 && (
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                                {t.checkout.avoidLabel}
                              </span>
                              <div className="mt-2 space-y-3">
                                {eviterItems.map((item) => (
                                  <div key={item.name}>
                                    <p className="text-sm font-medium text-brand-ink dark:text-white">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-brand-ink/70 dark:text-white/80">
                                      {item.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
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
              src={property?.logoUrl ?? DEFAULT_LOGO_URL}
              alt="Logo"
              className="h-auto max-h-[36px] max-w-[125px] w-auto object-contain brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
