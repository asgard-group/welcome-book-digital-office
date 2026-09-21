import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import logo from "@/assets/logo-joro-office.png";
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(49, 43, 55, 0.49) 0%, rgba(49, 43, 55, 0) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full w-full flex-col">
          {/* Logo */}
          <div className="flex justify-center pt-[10%]">
            <img src={logo} alt="Joro Living" className="w-[88%] max-w-[420px]" />
          </div>

          {/* Bottom widget */}
          <div className="mt-auto px-5 pb-10">
            <div className="w-full max-w-[390px] mx-auto flex flex-col items-center justify-center gap-6 rounded-xl bg-[#312B37]/80 px-5 py-[26px] backdrop-blur-sm">
              <p className="w-full text-center text-white text-base font-medium">
                {t.onboarding.messageLine1}
                <br />
                {t.onboarding.messageLine2}
              </p>

              <button
                type="button"
                onClick={handleStart}
                className="flex items-center justify-center gap-[7px] rounded-full bg-white px-8 py-[0.8rem] transition-colors hover:bg-white/90"
              >
                <span className="text-center text-[#312B37] text-sm font-semibold uppercase">
                  {t.onboarding.cta}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
