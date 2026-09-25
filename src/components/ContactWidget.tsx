import { Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLanguage } from "@/i18n/LanguageContext";

type TeamMember = {
  name: string;
  role: "roleMultisite" | "roleOfficeManager";
  desc: "descManuel" | "descAlexandra" | "descAudrey";
  email?: string;
  phoneHref?: string;
};

const TEAM: TeamMember[] = [
  { name: "Audrey", role: "roleOfficeManager", desc: "descAudrey", email: "audrey.robin@joro-space.fr", phoneHref: "+33659668978" },
  { name: "Alexandra", role: "roleMultisite", desc: "descAlexandra", email: "alexandra.delbart@joro-space.fr", phoneHref: "+33778877806" },
  { name: "Manuel", role: "roleMultisite", desc: "descManuel", email: "manuel.colores@joro-space.fr", phoneHref: "+33764012129" },
];

export function ContactWidget() {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      {TEAM.map((member) => (
        <div
          key={member.name}
          className="rounded-xl p-4 backdrop-blur-md bg-[#FFFBF2]/80 dark:bg-[#312B37]/80 text-[#312B37] dark:text-white"
        >
          <p className="font-semibold text-[#312B37] dark:text-white text-base">{member.name}</p>
          <p className="text-sm text-[#312B37]/70 dark:text-white/70">{t.contact[member.role]}</p>
          <p className="text-sm text-[#312B37]/70 dark:text-white/70 mt-2">
            {t.contact[member.desc]}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center justify-center gap-2 rounded-[8px] py-3 text-sm font-medium text-[#312B37] dark:text-white bg-white/70 dark:bg-white/10"
              >
                <Mail className="h-5 w-5" strokeWidth={1.75} />
                {t.contact.emailLabel}
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2 rounded-[8px] py-3 text-sm font-medium text-[#312B37]/40 dark:text-white/40 bg-white/70 dark:bg-white/10">
                <Mail className="h-5 w-5" strokeWidth={1.75} />
                {t.contact.emailLabel}
              </span>
            )}
            {member.phoneHref ? (
              <a
                href={`https://wa.me/${member.phoneHref.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[8px] py-3 text-sm font-medium text-[#312B37] dark:text-white bg-white/70 dark:bg-white/10"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.contact.whatsappLabel}
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2 rounded-[8px] py-3 text-sm font-medium text-[#312B37]/40 dark:text-white/40 bg-white/70 dark:bg-white/10">
                <WhatsAppIcon className="h-5 w-5" />
                {t.contact.whatsappLabel}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
