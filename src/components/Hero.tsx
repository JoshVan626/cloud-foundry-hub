import { TerminalSimulator } from "./TerminalSimulator";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Shield, Cog, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const motdLines = [
  "╔══════════════════════════════════════════════════════════════╗",
  "║     NORTHSTAR CLOUD SOLUTIONS - NPM Hardened Edition        ║",
  "╠══════════════════════════════════════════════════════════════╣",
  "║  Instance ID: i-0a1b2c3d4e5f67890                            ║",
  "║  Version: 2.13.5-hardened                                    ║",
  "║  Status: INITIALIZED ✓                                       ║",
  "╠══════════════════════════════════════════════════════════════╣",
  "║  ONBOARDING CHECKLIST                                        ║",
  "║  ────────────────────────────────────────────────────────────║",
  "║  [1] Retrieve admin credentials:                             ║",
  "║      sudo cat /root/npm-admin-credentials.txt                ║",
  "║  [2] Access the Admin Panel:                                 ║",
  "║      https://<your-ip>:81                                    ║",
  "║  [3] Configure your first proxy host                         ║",
  "║  [4] Run 'npm-helper status' to verify health                ║",
  "╚══════════════════════════════════════════════════════════════╝",
];

const keyBenefits = [
  {
    icon: Shield,
    title: "Hardened by Default",
    description: "Kernel-level tuning and pre-configured firewalls for maximum security out-of-the-box.",
  },
  {
    icon: Cog,
    title: "Automated Day-2 Ops",
    description: "Built-in scripts for atomic backups, health monitoring, and rollback-safe updates.",
  },
  {
    icon: Cloud,
    title: "AWS Native",
    description: "Seamless integration with CloudWatch Logs and S3 for enterprise-grade observability and durability.",
  },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Cloud Solutions Foundry</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Hardened, Auto-Updating</span>
              <br />
              <span className="text-foreground">Cloud Appliances.</span>
              <br />
              <span className="text-gradient">Zero-Touch Operations.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Enterprise-grade Open Source tools, delivered as production-ready AWS AMIs 
              with built-in security, backups, and self-healing logic. Stop managing servers 
              and start deploying.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="accent">
                <Link to="/products/nginx-proxy-manager">
                  Explore The Foundry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/docs">
                  Read the Docs
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/5 rounded-xl blur-xl" />
            <TerminalSimulator 
              lines={motdLines} 
              typingSpeed={15}
              className="relative shadow-2xl"
            />
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {keyBenefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="p-6 rounded-xl bg-card/50 border border-border hover:border-accent/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};