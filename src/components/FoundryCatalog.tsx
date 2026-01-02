import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Server } from "lucide-react";

export const FoundryCatalog = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Server className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">The Foundry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Production-Ready Appliances
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Infrastructure components forged for production. Each appliance includes 
            automated operations, security hardening, and comprehensive observability.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              tagline={product.tagline}
              description={product.description}
              category={product.category}
              icon={product.icon}
              capabilities={product.capabilities}
              comingSoon={product.comingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
