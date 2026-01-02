import { TerminalSimulator } from "./TerminalSimulator";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const motdLines = [
  "╔══════════════════════════════════════════════════════════════╗",
  "║     NORTHSTAR CLOUD SOLUTIONS - NPM Hardened Edition        ║",
  "╠══════════════════════════════════════════════════════════════╣",
  "║  Instance ID: i-0a1b2c3d4e5f67890                            ║",
  "║  Version: 2.11.3-hardened                                    ║",
  "║  Status: INITIALIZED ✓                                       ║",
  "╠══════════════════════════════════════════════════════════════╣",
  "║  Admin Panel: https://your-domain:81                        ║",
  "║  Credentials: Retrieved from SSM Parameter Store            ║",
  "╠══════════════════════════════════════════════════════════════╣",
  "║  Run 'npm-helper status' for service health                 ║",
  "╚══════════════════════════════════════════════════════════════╝",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
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
              <span className="text-foreground">Infrastructure on</span>
              <br />
              <span className="text-gradient">Autopilot</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              We bridge the gap between open-source and enterprise-ready. 
              Production-hardened AWS appliances with automated Day-2 operations, 
              security hardening, and full observability—deployed in minutes.
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
            
            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">&lt;5min</div>
                <div className="text-sm text-muted-foreground">Deploy Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Automated Ops</div>
              </div>
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
      </div>
    </section>
  );
};
