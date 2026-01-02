import { Link } from "react-router-dom";
import { CapabilityTag } from "./CapabilityTag";
import { ArrowRight, Shield, Container, Lock, Server, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  capabilities: string[];
  comingSoon?: boolean;
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
  comingSoon = false,
  className,
}: ProductCardProps) => {
  const IconComponent = iconMap[icon] || Server;

  const cardContent = (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-2.5 rounded-lg border",
          comingSoon 
            ? "bg-zinc-500/10 border-zinc-500/20" 
            : "bg-accent/10 border-accent/20"
        )}>
          <IconComponent className={cn(
            "w-5 h-5",
            comingSoon ? "text-zinc-500" : "text-accent"
          )} />
        </div>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Content */}
      <h3 className={cn(
        "text-lg font-semibold mb-1 transition-colors",
        comingSoon 
          ? "text-muted-foreground" 
          : "text-foreground group-hover:text-accent"
      )}>
        {name}
      </h3>
      <p className={cn(
        "text-sm font-medium mb-3",
        comingSoon ? "text-zinc-500" : "text-accent"
      )}>
        {tagline}
      </p>
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
      {comingSoon ? (
        <div className="flex items-center text-sm text-zinc-500 font-medium">
          <Clock className="w-4 h-4 mr-1" />
          <span>Coming Soon</span>
        </div>
      ) : (
        <div className="flex items-center text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </>
  );

  if (comingSoon) {
    return (
      <div
        className={cn(
          "block p-6 rounded-lg border border-border bg-card/50 opacity-75",
          className
        )}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      to={`/products/${id}`}
      className={cn(
        "group block p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all duration-300",
        "hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      {cardContent}
    </Link>
  );
};
