import { Link } from "react-router-dom";
import { BookOpen, Shield, Database, Activity, ArrowUpCircle, Wrench } from "lucide-react";

const docLinks = [
  {
    icon: BookOpen,
    title: "Quickstart",
    description: "Get up and running in minutes",
    href: "/docs/quickstart",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Hardening & compliance details",
    href: "/docs/security",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
  },
  {
    icon: Database,
    title: "Backup & Restore",
    description: "Data protection workflows",
    href: "/docs/backup-restore",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  {
    icon: Activity,
    title: "Monitoring",
    description: "CloudWatch metrics & logs",
    href: "/docs/monitoring-and-metrics",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
  },
  {
    icon: Wrench,
    title: "Operations",
    description: "Day-2 management tasks",
    href: "/docs/operations",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    borderColor: "border-rose-400/20",
  },
  {
    icon: ArrowUpCircle,
    title: "Upgrades",
    description: "Version migration paths",
    href: "/docs/upgrades",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
  },
];

export const DocQuickLinks = () => {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Documentation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to deploy, secure, and operate your AMI appliances.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {docLinks.map((doc) => (
            <Link
              key={doc.title}
              to={doc.href}
              className="group p-5 rounded-xl bg-card/50 border border-border hover:border-accent/40 transition-all duration-200 hover:bg-card/80"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-lg ${doc.bgColor} border ${doc.borderColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <doc.icon className={`w-5 h-5 ${doc.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {doc.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
