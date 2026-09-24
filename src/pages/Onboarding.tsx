import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import logo from "@/assets/logo-joro-office.png";
import photoroomLogo from "@/assets/logo-photoroom-white.png";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Onboarding() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleStart = () => {
    try {
      localStorage.setItem("joro_onboarded", "1");
    } catch {}
    navigate("/home");
  };

  return (
    <div className="h-[100dvh] w-full bg-muted/30">
      <div className="mx-auto w-full max-w-[760px] h-[100dvh] relative overflow-hidden shadow-sm">
        <img
          src={heroImg}
          alt={t.onboarding.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#312B37]/30 dark:bg-[#312B37]/50" />

        <div className="relative z-10 flex h-full w-full flex-col">
          {/* Logos */}
          <div className="flex flex-col items-center px-5 pt-[35%]">
            <img src={photoroomLogo} alt="Photoroom" className="h-[3.25rem] w-auto object-contain" />
            <span className="text-white/90 font-light text-[3rem] leading-none">×</span>
            <img src={logo} alt="Joro Office" className="w-[16.17rem] h-auto object-contain" />
          </div>

          {/* CTA button */}
          <div className="mt-auto pl-[2.25rem] pr-[2.25rem] pb-10 flex justify-center">
            <button
              type="button"
              onClick={handleStart}
              className="relative flex w-full max-w-[390px] items-center justify-center rounded-full bg-[#FFFBF2]/80 backdrop-blur-[12px] px-8 py-[0.8rem] transition-colors hover:bg-[#FFFBF2]/90"
            >
              <span className="text-center text-[#312B37] text-sm font-semibold uppercase">
                {t.onboarding.cta}
              </span>
              <ChevronRight className="absolute right-[1rem] h-5 w-5 text-[#312B37]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
