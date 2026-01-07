import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CapabilityTag } from "@/components/CapabilityTag";
import { CodeSwitcher } from "@/components/CodeSwitcher";
import { CLIShowcase } from "@/components/CLIShowcase";
import { TerminalSimulator } from "@/components/TerminalSimulator";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Zap, 
  Database, 
  RefreshCw, 
  Shield, 
  Lock, 
  Eye,
  Server,
  CheckCircle2
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Database,
  RefreshCw,
  Shield,
  Lock,
  Eye,
  Server,
};

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = getProductById(id || "");

  // Reset scroll position on mount and when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id, location.pathname]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to The Foundry
          </Link>
        </div>

        {/* Product Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.capabilities.map((cap) => (
              <CapabilityTag key={cap} label={cap} />
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 break-words">
            {product.name}
          </h1>
          <p className="text-lg sm:text-xl text-accent font-medium mb-4 break-words">{product.tagline}</p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mb-8 leading-relaxed">
            {product.description}
          </p>
        </section>

        {/* Problem / Solution */}
        <section className="container mx-auto px-4 mb-12 sm:mb-16">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 rounded-lg bg-destructive/5 border border-destructive/20">
              <h3 className="text-lg font-semibold text-destructive mb-4">The Problem</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✕</span>
                  <span>Manual setup leads to inconsistent configurations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✕</span>
                  <span>Security hardening often skipped or incomplete</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✕</span>
                  <span>No automated backups or disaster recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✕</span>
                  <span>Limited observability into system health</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
              <h3 className="text-lg font-semibold text-accent mb-4">The Hardened Edition</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Automated first-boot with secure defaults</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Defense-in-depth security from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Atomic backups with S3 sync and rotation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>CloudWatch integration for full visibility</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        {product.features.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Day-2 Operations</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Server;
                return (
                  <div key={index} className="p-6 rounded-lg bg-card border border-border">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 w-fit mb-4">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Security & Observability */}
        <section className="bg-muted/30 py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {/* Security */}
              {product.security.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <h2 className="text-2xl font-bold text-foreground">Security Hardening</h2>
                  </div>
                  <div className="space-y-4">
                    {product.security.map((item, index) => (
                      <div key={index} className="p-4 rounded-lg bg-card border border-border">
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observability */}
              {product.observability.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Eye className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-foreground">Observability</h2>
                  </div>
                  <div className="space-y-4">
                    {product.observability.map((item, index) => (
                      <div key={index} className="p-4 rounded-lg bg-card border border-border">
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* IaC Section */}
        {(product.terraform || product.cloudformation) && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-2">Infrastructure as Code</h2>
            <p className="text-muted-foreground mb-8">
              Deploy with your existing IaC workflow. Copy the module and customize for your environment.
            </p>
            <CodeSwitcher 
              terraform={product.terraform} 
              cloudformation={product.cloudformation}
            />
          </section>
        )}

        {/* CLI Section */}
        {product.cliCommands.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-2">CLI Toolkit</h2>
            <p className="text-muted-foreground mb-8">
              Manage your instance with the npm-helper CLI. All commands support --help for detailed usage.
            </p>
            <CLIShowcase commands={product.cliCommands} />
          </section>
        )}

        {/* MOTD Terminal */}
        {product.motd.length > 0 && (
          <section className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">First-Boot Experience</h2>
            <p className="text-muted-foreground mb-6">
              This is what you'll see when you first SSH into your hardened instance.
            </p>
            <div className="w-full">
              <TerminalSimulator lines={product.motd} typingSpeed={10} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
