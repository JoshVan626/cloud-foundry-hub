import { HeroTerminal } from "./HeroTerminal";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Shield, Cog, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { debugOverflow } from "@/utils/debugOverflow";


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
  useEffect(() => {
    // Debug overflow in development
    if (import.meta.env.DEV) {
      const timer = setTimeout(() => {
        debugOverflow();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pb-12 sm:pb-16 md:pb-20 w-full max-w-full overflow-x-hidden" style={{ paddingTop: `calc(4rem + env(safe-area-inset-top))` }}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full max-w-full">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8 w-full min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 flex-wrap">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm font-medium text-accent break-words">Cloud Solutions Foundry</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words overflow-wrap-anywhere">
              <span className="text-foreground">Enterprise-Grade Hardening</span>
              <br />
              <span className="text-foreground">for Open Source</span>
              <br />
              <span className="text-gradient break-words">Infrastructure.</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed break-words overflow-wrap-anywhere">
              Northstar Cloud Solutions delivers production-ready AWS appliances. 
              We handle the security, backups, and Day-2 operations so you can focus on scaling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10">
              <Button asChild size="lg" variant="accent" className="min-h-[44px] w-full sm:w-auto">
                <Link to="/products/nginx-proxy-manager">
                  Explore The Foundry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-[44px] w-full sm:w-auto">
                <Link to="/docs">
                  Read the Docs
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="relative mt-8 lg:mt-0 w-full max-w-full min-w-0">
            <HeroTerminal />
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {keyBenefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="p-6 rounded-xl bg-card/50 border border-border hover:border-accent/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 break-words">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed break-words">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};