import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

type TeamMember = {
  name: string;
  role: string;
  email?: string;
  phoneHref?: string;
};

const TEAM: TeamMember[] = [
  { name: "Manuel", role: "Lorem ipsum", email: "manuel.colores@joro-space.fr" },
  { name: "Alexandra", role: "Lorem ipsum", email: "alexandra.delbart@joro-space.fr" },
  { name: "Lorem Ipsum", role: "Welcome Manager" },
];

export function ContactWidget() {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/90 dark:bg-[#1c2626]/80 text-[#1c2626] dark:text-white">
      {/* Header */}
      <div className="flex flex-col items-center text-center pt-2 pb-4">
        <Phone className="h-10 w-10 text-foreground" strokeWidth={2} />
        <h2 className="text-xl font-semibold text-[#1c2626] dark:text-white leading-tight mt-3">
          Contact Jöro
        </h2>
        <p className="text-[13px] text-[#1c2626]/70 dark:text-white/80 mt-1 max-w-[280px]">
          Voici quelques numéros utiles
        </p>
      </div>

      <div className="border-t border-[#1c2626]/15 dark:border-white/15" />

      {/* Team */}
      <div className="divide-y divide-[#1c2626]/15 dark:divide-white/15">
        {TEAM.map((member) => (
          <div key={member.name} className="flex items-center justify-between gap-3 py-4">
            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="font-semibold text-[#1c2626] dark:text-white text-sm">{member.name}</p>
              <p className="text-xs uppercase text-[#1c2626]/70 dark:text-white/80">{member.role}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {member.email ? (
                <a href={`mailto:${member.email}`} className="shrink-0">
                  <Mail className="h-[27px] w-[27px] text-[#2C92FF]" strokeWidth={2} />
                </a>
              ) : (
                <Mail className="h-[27px] w-[27px] text-[#2C92FF] opacity-40" strokeWidth={2} />
              )}
              {member.phoneHref ? (
                <a
                  href={`https://wa.me/${member.phoneHref.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <WhatsAppIcon className="h-[27px] w-[27px] text-[#128C7E]" />
                </a>
              ) : (
                <WhatsAppIcon className="h-[27px] w-[27px] text-[#128C7E] opacity-40" />
              )}
            </div>
          </div>
        ))}

        {/* Email */}
        <div className="flex items-center justify-center gap-[5px] pt-4">
          <span className="text-sm font-medium text-[#5C6363] dark:text-white/60">Email</span>
          <a
            href="mailto:hello@joro-space.fr"
            className="text-sm font-medium text-[#1c2626] dark:text-white underline underline-offset-2"
          >
            hello@joro-space.fr
          </a>
        </div>
      </div>
    </div>
  );
}
