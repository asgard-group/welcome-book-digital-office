import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * Anchor-like component for links that leave the welcome book (mailto, tel,
 * WhatsApp, Google Maps, external sites, ...). Confirms with the guest
 * before navigating away instead of opening the link directly.
 */
export function ExternalLink({
  href,
  newTab,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  newTab?: boolean;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const confirmLeave = () => {
    if (newTab) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <a
        href={href}
        aria-label={ariaLabel}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="w-[calc(100%-60px)] rounded-[0.75rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.common.leaveAppTitle}</AlertDialogTitle>
            <AlertDialogDescription>{t.common.leaveAppDesc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-muted hover:text-foreground">
              {t.common.leaveAppCancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmLeave}>{t.common.leaveAppContinue}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
