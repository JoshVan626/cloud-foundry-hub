import { Shield, Clock, FileText, Award } from "lucide-react";

const indicators = [
  {
    icon: Shield,
    label: "CIS-Hardened",
    description: "Security benchmarks",
  },
  {
    icon: Clock,
    label: "24/7 Automated",
    description: "Backup & monitoring",
  },
  {
    icon: FileText,
    label: "Full Documentation",
    description: "Day-2 operations guides",
  },
  {
    icon: Award,
    label: "AWS Marketplace",
    description: "Verified publisher",
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
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-5 h-5 text-accent" />
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
