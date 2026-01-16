import { Link } from "react-router-dom";
import { Shield, Server, Package } from "lucide-react";
import { products } from "@/data/products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Server,
};

export const DocQuickLinks = () => {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Documentation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your appliance to access deployment guides, security details, and operational runbooks.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {products.map((product) => {
            const IconComponent = iconMap[product.icon] || Package;
            const isAvailable = !product.comingSoon;

            if (isAvailable) {
              return (
                <Link
                  key={product.id}
                  to={`/docs?product=${product.id}`}
                  className="group p-5 rounded-xl bg-card/50 border border-border hover:border-accent/40 transition-all duration-200 hover:bg-card/80"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                        {product.name.replace(" for AWS", "").replace(" AMI", "")}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {product.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-accent mt-2 group-hover:underline">
                        View Documentation →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={product.id}
                className="p-5 rounded-xl bg-card/30 border border-border/50 opacity-60"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-muted-foreground truncate">
                      {product.name.replace(" for AWS", "").replace(" AMI", "")}
                    </h3>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      {product.tagline}
                    </p>
                    <span className="inline-block text-xs text-muted-foreground/50 mt-2">
                      Documentation coming soon
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
