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
    title: "Automated Resilience",
    description: "Built-in atomic backups, health monitoring, and rollback-safe updates.",
  },
  {
    icon: Cog,
    title: "Defense-in-Depth Security",
    description: "Kernel hardening, pre-configured firewalls, and Fail2Ban out of the box.",
  },
  {
    icon: Cloud,
    title: "AWS-Native Observability",
    description: "CloudWatch Logs and S3 integration for enterprise-grade visibility.",
  },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Cloud Solutions Foundry</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Enterprise-Grade Hardening</span>
              <br />
              <span className="text-foreground">for Open Source</span>
              <br />
              <span className="text-gradient">Infrastructure.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Northstar Cloud Solutions delivers production-ready AWS appliances. 
              We handle the security, backups, and Day-2 operations so you can focus on scaling.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 relative z-10">
              <Button asChild size="lg" variant="accent" className="min-h-[44px]">
                <Link to="/products/nginx-proxy-manager">
                  Explore The Foundry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-[44px]">
                <Link to="/docs">
                  Read the Docs
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-accent/5 rounded-xl blur-xl pointer-events-none" />
            <TerminalSimulator 
              lines={motdLines} 
              typingSpeed={15}
              className="relative shadow-2xl"
            />
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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