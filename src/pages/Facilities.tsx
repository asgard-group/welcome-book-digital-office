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
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/hero-office.png";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";
import { ContactWidget } from "@/components/ContactWidget";

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 text-[#1c2626] dark:text-white">
      {children}
    </div>
  );
}

export default function Facilities() {
  const { t } = useLanguage();

  const sections = [
    {
      id: "equipements",
      icon: Tv,
      title: "Équipements",
      kind: "video" as const,
      items: [
        { name: "Télévisions Smart TV" },
        { name: "Click & Play" },
        { name: "Climatisation" },
        { name: "Chauffage" },
        { name: "Cadenas" },
      ],
    },
    {
      id: "cuisine-equipements",
      icon: CookingPot,
      title: "Cuisine",
      kind: "video" as const,
      items: [
        { name: "Machine à café" },
        { name: "Micro ondes" },
        { name: "Lave vaisselle" },
      ],
    },
    {
      id: "r-1",
      icon: Building2,
      title: "R-1",
      kind: "info" as const,
      items: [
        { name: "Salle de réunion", detail: "1 Télévisions Smart TV, chauffage" },
        { name: "Cuisine", detail: "2 Machine à café, 1 micro ondes, 1 Lave vaisselle" },
        { name: "Espace convivialité", detail: "18 m² intérieur" },
        { name: "Sanitaires", detail: "6 toilettes" },
        { name: "Douches", detail: "2 douches, 1 évier" },
      ],
    },
    {
      id: "rdc",
      icon: DoorOpen,
      title: "RDC",
      kind: "info" as const,
      items: [
        { name: "Accueil", detail: "1 poste d'accueil" },
        { name: "Open space sous verrière", detail: "20 postes, 18 m² intérieur, 2 Phone Box" },
        { name: "Salles de réunion", detail: "1 Télévisions Smart TV, chauffage" },
      ],
    },
    {
      id: "r+1",
      icon: Building2,
      title: "R+1",
      kind: "info" as const,
      items: [
        { name: "Bureaux open-space, 2 Phone Box", detail: "20 postes, 18 m² intérieur" },
      ],
    },
    {
      id: "r+2",
      icon: Building2,
      title: "R+2",
      kind: "info" as const,
      items: [
        { name: "Bureaux open-space", detail: "20 postes, 2 Phone Box" },
        { name: "Salle de réunion", detail: "1 Télévisions Smart TV, chauffage" },
      ],
    },
    {
      id: "r+3-rooftop",
      icon: Sun,
      title: "R+3/Rooftop",
      kind: "info" as const,
      items: [
        { name: "Terrasse privative", detail: "18 m² intérieur + 123 m² extérieur" },
      ],
    },
  ];

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
              {t.facilities.title}
            </h1>
            <p className="text-base text-white/80 mt-1">
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
                  className="rounded-xl px-4 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 border border-[#1c2626]/20 dark:border-transparent"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <section.icon
                        className="h-5 w-5 text-[#1c2626] dark:text-white"
                        strokeWidth={2}
                      />
                      <span className="font-semibold text-[#1c2626] dark:text-white">
                        {section.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    {section.kind === "video" ? (
                      <div className="pt-1 space-y-3">
                        {section.items.map((item) => (
                          <div key={item.name} className="pl-8">
                            <p className="text-sm font-medium text-[#1c2626] dark:text-white">
                              {item.name}
                            </p>
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm text-[#1c2626]/70 dark:text-white/70">
                                Notice d'utilisation :
                              </p>
                              <span
                                aria-disabled="true"
                                className="text-sm text-[#1c2626] dark:text-white underline underline-offset-2 shrink-0 cursor-default"
                              >
                                Lien vidéo
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 pt-1">
                        {section.items.map((item) => (
                          <div key={item.name} className="pl-8">
                            <p className="text-sm font-medium text-[#1c2626] dark:text-white">
                              {item.name}
                            </p>
                            <p className="text-sm text-[#1c2626]/70 dark:text-white/80">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Information */}
            <Widget>
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-5 w-5 text-[#1c2626] dark:text-white" strokeWidth={2} />
                <h2 className="font-semibold text-[#1c2626] dark:text-white">Information</h2>
              </div>
              <p className="text-sm text-[#1c2626]/70 dark:text-white/80 leading-relaxed">
                L'entretien des équipements est réalisé par les agents de ménage sous le contrôle de la Welcome Manager.
              </p>
            </Widget>

            {/* Contact Jöro */}
            <ContactWidget />
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
