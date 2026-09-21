import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Star, Heart } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/_MG_5435_WEB.jpg";
import joroLogo from "@/assets/logo-joro-office.png";
import planetLogo from "@/assets/one-for-planet.webp";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SettingsPopover } from "@/components/SettingsPopover";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Thanks() {
  const { t } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error(t.thanks.toastNoRating);
      return;
    }
    toast.success(t.thanks.toastSuccess);
    setRating(0);
    setMessage("");
  };

  return (
    <div className="h-[100dvh] w-full bg-muted/30 overflow-hidden">
      <div className="mx-auto w-full max-w-[760px] h-[100dvh] relative overflow-hidden shadow-sm">
        {/* Background image (non-scrolling shell keeps it static; only the content below scrolls) */}
        <img
          src={heroImg}
          alt="Jöro Living"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#312B37]/20 dark:bg-[#312B37]/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-6">
          {/* Back arrow */}
          <div className="px-4 pt-4 flex items-center justify-between">
            <Link
              to="/home"
              aria-label={t.common.back}
              className="h-11 w-11 flex items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </Link>
            <SettingsPopover variant="light" />
          </div>

          {/* Title / subtitle */}
          <div className="text-center px-4 mt-1 mb-5">
            <h1 className="font-serif font-medium text-white text-[44px] leading-none tracking-tight uppercase">
              {t.thanks.title}
            </h1>
            <p className="mt-2 text-white/95 text-[17px] font-medium">
              {t.thanks.subtitle}
            </p>
          </div>

          {/* Review card */}
          <div className="flex-1 flex flex-col justify-center px-[30px]">
            <div className="rounded-3xl p-6 backdrop-blur-md bg-white/75 dark:bg-[#312B37]/80">
              <div className="flex flex-col items-center text-center mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#312B37]/40 dark:bg-[#47414D] dark:border-transparent mb-4">
                  <Heart
                    className="h-[30px] w-[30px] text-[#312B37] dark:text-white"
                    strokeWidth={1.5}
                  />
                </span>
                <h2 className="text-[18px] font-semibold uppercase tracking-wide text-[#312B37] dark:text-white">
                  {t.thanks.cardTitle}
                </h2>
                <p className="text-[13px] text-[#312B37]/70 dark:text-white/80 mt-1 max-w-[260px]">
                  {t.thanks.cardDesc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Star rating */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[13px] font-medium text-[#312B37]/80 dark:text-white/80">
                    {t.thanks.ratingLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`${star} ${t.thanks.starLabel}${star > 1 ? "s" : ""}`}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= (hoverRating || rating)
                              ? "fill-[#312B37] text-[#312B37] dark:fill-white dark:text-white"
                              : "text-[#312B37]/30 dark:text-white/30"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-[13px] font-medium text-[#312B37]/80 dark:text-white/80"
                  >
                    {t.thanks.messageLabel}
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.thanks.messagePlaceholder}
                    className="min-h-[120px] rounded-xl border-[#312B37]/20 bg-white/60 text-[#312B37] placeholder:text-[#312B37]/40 dark:bg-[#47414D]/60 dark:text-white dark:placeholder:text-white/50 dark:border-transparent resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#312B37] text-white hover:bg-[#312B37]/90 text-[15px] font-semibold uppercase tracking-wide"
                >
                  {t.thanks.submit}
                </Button>

                {/* Contact link */}
                <a
                  href="mailto:reservation@joro-space.fr"
                  className="block text-center text-[13px] font-medium text-[#312B37]/70 dark:text-white/70 hover:text-[#312B37] dark:hover:text-white transition-colors"
                >
                  {t.thanks.contactLink}
                </a>
              </form>
            </div>
          </div>

          {/* Footer logo */}
          <div className="flex items-center justify-center gap-5 pt-2">
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
