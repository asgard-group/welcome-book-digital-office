import { Settings, Sun, Moon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/theme/ThemeContext";
import { useState } from "react";

type Props = {
  variant?: "light" | "dark";
};

export function SettingsPopover({ variant = "dark" }: Props) {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const triggerColor = variant === "light" ? "text-white/95" : "text-foreground";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button aria-label={t.settings.ariaLabel} className={`${triggerColor} h-11 w-11 flex items-center justify-center`}>
          <Settings className="h-6 w-6" strokeWidth={1.75} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-72 rounded-2xl p-0 bg-white dark:bg-[#312B37] border-[#312B37]/15 dark:border-white/15 shadow-xl"
      >
        <div className="flex items-center px-4 pt-3 pb-2">
          <p className="text-[15px] font-semibold text-[#312B37] dark:text-white">{t.settings.title}</p>
        </div>

        <div className="h-px bg-[#312B37]/15 dark:bg-white/15" />

        {/* Language */}
        <div className="px-4 py-3">
          <p className="text-[12px] uppercase tracking-wide text-[#312B37]/70 dark:text-white/70 mb-2">
            {t.settings.language}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  lang === l
                    ? "bg-[#312B37] text-white border-[#312B37] dark:bg-white dark:text-[#312B37] dark:border-white"
                    : "bg-white text-[#312B37] border-[#312B37]/20 hover:bg-[#312B37]/5 dark:bg-[#47414D] dark:text-white dark:border-transparent dark:hover:bg-[#47414D]/80"
                }`}
              >
                {l === "fr" ? t.settings.french : t.settings.english}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#312B37]/15 dark:bg-white/15" />

        {/* Theme */}
        <div className="px-4 py-3">
          <p className="text-[12px] uppercase tracking-wide text-[#312B37]/70 dark:text-white/70 mb-2">
            {t.settings.appearance}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                theme === "light"
                  ? "bg-[#312B37] text-white border-[#312B37] dark:bg-white dark:text-[#312B37] dark:border-white"
                  : "bg-white text-[#312B37] border-[#312B37]/20 hover:bg-[#312B37]/5 dark:bg-[#47414D] dark:text-white dark:border-transparent dark:hover:bg-[#47414D]/80"
              }`}
            >
              <Sun className="h-4 w-4" strokeWidth={1.75} />
              {t.settings.light}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                theme === "dark"
                  ? "bg-[#312B37] text-white border-[#312B37] dark:bg-white dark:text-[#312B37] dark:border-white"
                  : "bg-white text-[#312B37] border-[#312B37]/20 hover:bg-[#312B37]/5 dark:bg-[#47414D] dark:text-white dark:border-transparent dark:hover:bg-[#47414D]/80"
              }`}
            >
              <Moon className="h-4 w-4" strokeWidth={1.75} />
              {t.settings.dark}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
