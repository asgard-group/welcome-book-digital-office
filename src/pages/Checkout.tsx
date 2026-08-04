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
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const WASTE_ITEMS = [
  {
    icon: Trash2,
    color: "text-[#7E7E7E]",
    title: "Déchets ménagers",
    desc: "Restes alimentaires",
  },
  {
    icon: Trash2,
    color: "text-[#009300]",
    title: "Verres",
    desc: "Bouteilles, Bocaux conserve, Pots confitures",
  },
  {
    icon: Trash2,
    color: "text-[#ECA600]",
    title: "Déchets recyclables",
    desc: "Emballages et bouteilles plastiques, Cartons, papiers, magazines, Boites de conserves, Canettes",
  },
];

const ECO_SECTIONS = [
  {
    id: "climatisation",
    icon: Wind,
    title: "Climatisation",
    items: [
      { name: "Fermez les fenêtres", detail: "lorsque la climatisation fonctionne" },
      { name: "Pensez à l'éteindre", detail: "avant de partir en week-end" },
      { name: "Attention au émetteurs de froid", detail: "veiller à ne pas les obstruer" },
      { name: "Penser à baisser les stores", detail: "afin de réduire la consommation" },
      { name: "Profiter de l'air frais du matin", detail: "pour rafraîchir et ventiler vos locaux" },
    ],
  },
  {
    id: "chauffage",
    icon: Thermometer,
    title: "Chauffage",
    items: [
      { name: "Limiter la température à 19°C", detail: "1°C de moins permet d'économiser 7% d'énergie" },
    ],
  },
  {
    id: "eclairage",
    icon: Lightbulb,
    title: "Éclairage",
    items: [
      { name: "Veillez à éteindre les lumières", detail: "lorsque vous sortez d'une pièce" },
      { name: "Installer des minuteurs ou détecteur", detail: "dans les locaux de passage" },
      { name: "Remplacer vos ampoules classiques", detail: "par des ampoules basse consommation de type LED" },
    ],
  },
  {
    id: "eau",
    icon: Droplet,
    title: "Eau",
    items: [
      { name: "Couper l'eau", detail: "quand vous ne vous en servez pas" },
      { name: "Signaler les fuites", detail: "au Welcome Manager" },
      { name: "Utiliser la demi-chasse d'eau", detail: "cela permet d'économiser 3 litres d'eau à chaque passage" },
      { name: "Remplir sa gourde ou son mug", detail: "éviter les bouteilles en plastique" },
    ],
  },
  {
    id: "papier",
    icon: StickyNote,
    title: "Papier",
    items: [
      { name: "Imprimer avec parcimonie", detail: "seulement ce qui est essentiel" },
      { name: "Imprimer en noir et blanc", detail: "et de préférence en recto verso" },
      { name: "Recycler les papiers imprimés", detail: "en brouillon" },
      { name: "Penser à installer une badgeuse", detail: "Cela réduit de moitié la consommation de papier et d'encre" },
    ],
  },
  {
    id: "bureautique",
    icon: Unplug,
    title: "Bureautique",
    items: [
      { name: "Débrancher les prises inutilisés", detail: "et ne pas laisser d'appareil en veille" },
      { name: "Ne pas laisser un chargeur branché", detail: "même non relié à un appareil, il consomme de l'énergie" },
      { name: "Penser à éteindre votre ordinateur", detail: "pendant les périodes prolongées de non utilisation (notamment à midi)" },
      { name: "Préférer un fond d'écran sombre et fixe", detail: "il consommera moins" },
      { name: "Privilégier la messagerie instantané", detail: "pour envoyer des messages à vos collègues plutôt que les emails" },
    ],
  },
];

export default function Checkout() {
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
              Éco gestes
            </h1>
            <p className="text-base text-white/80 mt-1">Gestion déchets, tri sélectif</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Gestion des déchets */}
            <Widget>
              <div className="flex flex-col items-center text-center pt-2 pb-4">
                <Trash2 className="h-10 w-10 text-foreground" strokeWidth={2} />
                <h2 className="text-xl font-semibold text-[#1c2626] dark:text-white leading-tight mt-3">
                  Gestion des déchets
                </h2>
                <p className="text-[13px] text-[#1c2626]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  Lorem ipsum
                </p>
              </div>
              <div className="border-t border-[#1c2626]/15 dark:border-white/15" />
              <div className="divide-y divide-[#1c2626]/15 dark:divide-white/15">
                {WASTE_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 py-4">
                    <item.icon className={`h-5 w-5 shrink-0 ${item.color}`} strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1c2626] dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#1c2626]/70 dark:text-white/80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Widget>

            {/* Information */}
            <Widget>
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-5 w-5 text-[#1c2626] dark:text-white" strokeWidth={2} />
                <h2 className="font-semibold text-[#1c2626] dark:text-white">Information</h2>
              </div>
              <p className="text-sm text-[#1c2626]/70 dark:text-white/80 leading-relaxed">
                Pensez au tri sélectif dans votre entreprise, cela permet aux déchets de faire l'objet d'un traitement spécifique et être ainsi valorisés.
              </p>
            </Widget>

            {/* Éco Geste à adopter */}
            <Widget>
              <div className="flex flex-col items-center text-center pt-2 pb-2">
                <Leaf className="h-10 w-10 text-foreground" strokeWidth={2} />
                <h2 className="text-xl font-semibold text-[#1c2626] dark:text-white leading-tight mt-3">
                  Éco Geste à adopter
                </h2>
                <p className="text-[13px] text-[#1c2626]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  Quels sont les bons gestes éco responsables à adopter au bureau ?
                </p>
              </div>
            </Widget>

            {/* Éco gestes accordion */}
            <Accordion type="multiple" defaultValue={["climatisation"]} className="space-y-3">
              {ECO_SECTIONS.map((section) => (
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
