import { Shield, Clock, FileText, Award } from "lucide-react";

const indicators = [
  {
    icon: Shield,
    label: "Security-Hardened",
    description: "Kernel & network hardening",
    colors: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      hoverBg: "group-hover:bg-emerald-500/20",
      icon: "text-emerald-400",
    },
  },
  {
    icon: Clock,
    label: "24/7 Automated",
    description: "Backup & monitoring",
    colors: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      hoverBg: "group-hover:bg-amber-500/20",
      icon: "text-amber-400",
    },
  },
  {
    icon: FileText,
    label: "Full Documentation",
    description: "Day-2 operations guides",
    colors: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      hoverBg: "group-hover:bg-blue-500/20",
      icon: "text-blue-400",
    },
  },
  {
    icon: Award,
    label: "AWS Marketplace",
    description: "Verified publisher",
    colors: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      hoverBg: "group-hover:bg-violet-500/20",
      icon: "text-violet-400",
    },
  },
];

export const TrustIndicators = () => {
  return (
    <section className="py-8 border-y border-border bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {indicators.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 group"
            >
              <div className={`w-10 h-10 rounded-lg ${item.colors.bg} border ${item.colors.border} flex items-center justify-center ${item.colors.hoverBg} transition-colors`}>
                <item.icon className={`w-5 h-5 ${item.colors.icon}`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
