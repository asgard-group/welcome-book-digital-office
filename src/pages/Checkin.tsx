import { Wifi, MapPin, ChevronLeft, Copy, KeyRound } from "lucide-react";
import { ContactWidget } from "@/components/ContactWidget";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { useProperty } from "@/property/useProperty";
import { SettingsPopover } from "@/components/SettingsPopover";

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white">
      {children}
    </div>
  );
}


function CopyField({ value }: { value: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copié");
    } catch {
      toast.error("Impossible de copier");
    }
  };
  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-white/80 dark:bg-[#47414D]/60 border border-[#312B37]/20 dark:border-transparent">
      <span className="text-sm text-[#312B37] dark:text-white">{value}</span>
      <button
        onClick={handleCopy}
        aria-label="Copier"
        className="text-[#312B37]/60 hover:text-[#312B37] dark:text-white/70 dark:hover:text-white transition-colors"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}

function FieldSkeleton() {
  return <div className="h-[42px] rounded-xl bg-[#312B37]/10 dark:bg-white/10 animate-pulse" />;
}

function Step({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#312B37]/10 dark:bg-white/15 text-[#312B37] dark:text-white flex items-center justify-center text-xs font-semibold">
        {step}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-[#312B37] dark:text-white text-sm">{title}</p>
        <p className="text-[#312B37]/70 dark:text-white/80 text-sm mt-0.5">{children}</p>
      </div>
    </div>
  );
}

export default function Checkin() {
  const { data: property } = useProperty();

  return (
    <div className="min-h-screen w-full bg-muted/30">
      <div className="mx-auto w-full max-w-[760px] min-h-screen relative overflow-hidden shadow-sm">
        {/* Background image (fixed full-viewport wrapper to avoid jumps on mobile scroll) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="relative mx-auto h-full w-full max-w-[760px]">
            <img
              src={heroImg}
              alt={property?.name ?? ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#312B37]/30 dark:bg-[#312B37]/50" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen pb-6">
          {/* Back arrow */}
          <div className="px-4 pt-4 flex items-center justify-between shrink-0">
            <Link to="/home" aria-label="Retour" className="h-11 w-11 flex items-center justify-center">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
            <SettingsPopover variant="light" />
          </div>

          {/* Title */}
          <div className="text-center px-4 mt-1 mb-5 shrink-0">
            <h1 className="text-[32px] leading-tight font-serif font-semibold text-white uppercase">
              Infos pratiques
            </h1>
            <p className="text-base text-white/80 mt-1">Wifi, Accès bureaux</p>
          </div>

          {/* Widgets */}
          <div className="px-[30px] space-y-4">
            {/* Wifi */}
            <Widget>
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="h-5 w-5 text-foreground" strokeWidth={2} />
                <h2 className="font-semibold text-foreground">Wifi</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-[#312B37]/70 dark:text-white/70 mb-1.5">Network</p>
                  {property ? <CopyField value={property.wifi.network} /> : <FieldSkeleton />}
                </div>
                <div>
                  <p className="text-xs font-medium text-[#312B37]/70 dark:text-white/70 mb-1.5">Mot de passe</p>
                  {property ? <CopyField value={property.wifi.password} /> : <FieldSkeleton />}
                </div>
              </div>
            </Widget>

            {/* Address */}
            <Widget>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-foreground" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-foreground">6 Rue Lamartine</p>
                  <p className="text-xs text-[#312B37]/70 dark:text-white/70">75009 Paris, France</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#312B37]/20 dark:border-white/10">
                <iframe
                  src="https://www.google.com/maps?q=6+Rue+Lamartine,+75009+Paris&output=embed"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Apartment location"
                />
              </div>
            </Widget>

            {/* Contrôle d'accès — masqué sur demande, code conservé pour réactivation future
            <Widget>
              <div className="flex flex-col items-center text-center pt-2 pb-4">
                <KeyRound className="h-10 w-10 text-foreground" strokeWidth={2} />
                <h2 className="text-xl font-semibold text-[#312B37] dark:text-white leading-tight mt-3">
                  Contrôle d'accès
                </h2>
                <p className="text-[13px] text-[#312B37]/70 dark:text-white/80 mt-1 max-w-[280px]">
                  Process contrôle d'accès Bluetooth
                </p>
              </div>
              <div className="border-t border-[#312B37]/15 dark:border-white/15" />
              <div className="divide-y divide-[#312B37]/15 dark:divide-white/15">
                <div className="py-4">
                  <Step step={1} title="Télécharger STid Mobile ID">
                    Sur l'App Store ou Google Play
                  </Step>
                </div>
                <div className="py-4">
                  <Step step={2} title="Communiquer le numéro">
                    à votre interlocuteur Asgard : property@asgard-reim.fr<br />
                    (Ex : 3883888764)
                  </Step>
                </div>
                <div className="py-4">
                  <Step step={3} title="Mise en place">
                    Iphone : RAS<br />
                    Android : désactivée la fonction NFC
                  </Step>
                </div>
                <div className="pt-4">
                  <Step step={4} title="Activer le Bluetooth">
                    Ouvrir l'application puis approchez votre téléphone devant le lecteur
                  </Step>
                </div>
              </div>
            </Widget>
            */}

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
