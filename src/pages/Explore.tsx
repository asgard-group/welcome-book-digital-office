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
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { SettingsPopover } from "@/components/SettingsPopover";

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white">
      {children}
    </div>
  );
}

// Temps de trajet à pied depuis le bureau (6 rue Lamartine, 75009 Paris) — confirmés par le client.
const placesData: Record<
  string,
  { name: string; desc?: string; address?: string; mapQuery?: string; right?: string }[]
> = {
  restaurants: [
    { name: "Via Mela", desc: "Italien", address: "8 rue Lamartine", right: "20 m" },
    { name: "Brion Restaurant", desc: "Bistronomique", address: "17 rue Lamartine", right: "2 min" },
    { name: "Les Saisons", desc: "Cuisine française classique", address: "52 rue Lamartine", right: "4 min" },
    { name: "Mount Everest", desc: "Spécialité indienne et népalaise", address: "26 rue Lamartine", right: "100 m" },
    { name: "Le Mignon", desc: "Bistrot parisien", address: "8 rue Lamartine", right: "20 m" },
  ],
  parking: [
    { name: "Parking Vélib'", desc: "Parking vélo libre service", address: "Milton - Manuel, 75009 Paris", right: "6 min" },
    { name: "Zenpark", desc: "Parking voiture", address: "45 Rue Laffitte, 75009 Paris", right: "6 min" },
    { name: "Saemes Parking Montholon", desc: "Parking voiture", address: "1 Rue Mayran, 75009 Paris", right: "3 min" },
    { name: "Onepark Mayran", desc: "Parking voiture (sur réservation)", address: "5 Rue Mayran, 75009 Paris", right: "3 min" },
  ],
  transport: [
    { name: "Métro 7", desc: "Station Cadet", mapQuery: "Métro Cadet, Paris", right: "2 min" },
    { name: "Métro 12", desc: "Station Notre-Dame-de-Lorette", mapQuery: "Métro Notre-Dame-de-Lorette, Paris", right: "6 min" },
    { name: "Métro 8 & 9", desc: "Station Opéra", mapQuery: "Métro Opéra, Paris", right: "15 min" },
    { name: "Bus 26/43/45/85", desc: "Châteaudun - Lamartine", mapQuery: "Arrêt de bus Châteaudun - Lamartine, Paris", right: "3 min" },
    { name: "RER E", desc: "Station Haussmann", mapQuery: "Gare Haussmann Saint-Lazare, Paris", right: "15 min" },
  ],
  pratique: [
    { name: "Carrefour Express", desc: "Supermarché", address: "2 rue Lamartine", right: "65 m" },
    { name: "Crédit Agricole", desc: "Banque", address: "14 rue des Martyrs", right: "6 min" },
    { name: "Pharmacie Cadet Lafayette", desc: "Pharmacie", address: "66 rue La Fayette", right: "2 min" },
    { name: "La Poste", desc: "Courrier / colis", address: "14 rue Bleue", right: "5 min" },
    { name: "La Poste", desc: "Espace Clients Pro", address: "14 rue Bleue", right: "5 min" },
    { name: "Sequoia Pressing", desc: "Pressing", address: "84 rue La Fayette", right: "4 min" },
  ],
  wellness: [
    { name: "Platinum Coaching", desc: "Coaching Privé, Electrostimulation, CrossTraining & HIIT", address: "48 rue Lamartine", right: "3 min" },
    { name: "Cercles de la Forme Cadet", desc: "Salle de sport", address: "13 rue Ambroise Thomas", right: "7 min" },
    { name: "Punch Studios Lafayette", desc: "Salle de sport", address: "24 rue Chauchat", right: "6 min" },
    { name: "POSES Studio - Saint-Lazare", desc: "Centre de yoga", address: "28 rue de Châteaudun", right: "7 min" },
    { name: "Qee Pilates Yoga", desc: "Studio de pilates", address: "39 rue de Châteaudun", right: "9 min" },
    { name: "Le Centre Tout Naturellement", desc: "Sauna, naturopathie et soins", address: "83 bis rue La Fayette", right: "5 min" },
  ],
  culture: [
    { name: "L'Olympia", desc: "Salle de concert", address: "28 boulevard des Capucines", right: "22 min" },
    { name: "The Dissident Club", desc: "Concert de Jazz, Expos & bar", address: "58 rue Richer, 75009", right: "5 min" },
    { name: "Théâtre Le Bout", desc: "Salle de spectacles", address: "6 rue Frochot", right: "15 min" },
    { name: "Paradox Museum Paris", desc: "Musée", address: "38 boulevard des Italiens", right: "15 min" },
    { name: "Théâtre La Bruyère", desc: "Théâtre", address: "5 rue La Bruyère", right: "10 min" },
    { name: "Max Linder Panorama", desc: "Cinéma", address: "24 boulevard Poissonnière", right: "10 min" },
    { name: "Musée de la Vie romantique", desc: "Musée", address: "16 rue Chaptal", right: "15 min" },
  ],
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
            <div className="absolute inset-0 bg-[#312B37]/30 dark:bg-[#312B37]/50" />
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
                    "flex flex-col items-center justify-center gap-[6px] w-full aspect-[106/92] rounded-xl text-sm font-medium transition-colors backdrop-blur-md border border-[#312B37]/20 dark:border-transparent",
                    active === cat.id
                      ? "bg-[#312B37] text-white dark:bg-white dark:text-[#312B37]"
                      : "bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white hover:bg-white/95 dark:hover:bg-[#312B37]/85"
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
              {displayList?.map((place, i) => (
                <a
                  key={`${place.name}-${i}`}
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    place.mapQuery
                      ? place.mapQuery
                      : place.address
                      ? `${place.name}, ${place.address}, Paris`
                      : `${place.name} Paris 9`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl px-5 py-4 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 border border-[#312B37]/20 dark:border-transparent hover:bg-white/95 dark:hover:bg-[#312B37]/85 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[17px] font-semibold text-[#312B37] dark:text-white truncate">
                      {place.name}
                    </p>
                    {place.desc && (
                      <p className="text-[14px] text-[#312B37]/70 dark:text-white/80 mt-0.5 truncate">
                        {place.desc}
                      </p>
                    )}
                  </div>
                  {place.right && (
                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      <span className="text-[15px] font-medium text-[#312B37]/70 dark:text-white/80">
                        {place.right}
                      </span>
                      <ChevronRight
                        className="h-5 w-5 text-[#312B37]/70 dark:text-white/80"
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
