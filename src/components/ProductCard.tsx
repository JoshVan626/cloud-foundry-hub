import { Link } from "react-router-dom";
import { CapabilityTag } from "./CapabilityTag";
import { ArrowRight, Shield, Container, Lock, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  capabilities: string[];
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Container,
  Lock,
  Server,
};

export const ProductCard = ({
  id,
  name,
  tagline,
  description,
  category,
  icon,
  capabilities,
  className,
}: ProductCardProps) => {
  const IconComponent = iconMap[icon] || Server;

  return (
    <Link
      to={`/products/${id}`}
      className={cn(
        "group block p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all duration-300",
        "hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20">
          <IconComponent className="w-5 h-5 text-accent" />
        </div>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-sm text-accent font-medium mb-3">{tagline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Capability Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {capabilities.map((cap) => (
          <CapabilityTag key={cap} label={cap} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View Details</span>
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
