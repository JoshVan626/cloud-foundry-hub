import { cn } from "@/lib/utils";

interface CapabilityTagProps {
  label: string;
  className?: string;
}

const tagVariants: Record<string, string> = {
  "Automated Ops": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Hardened": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "AWS Native": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Observable": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "HA Cluster": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "GitOps Ready": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Compliant": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "Coming Soon": "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export const CapabilityTag = ({ label, className }: CapabilityTagProps) => {
  const variant = tagVariants[label] || "bg-muted text-muted-foreground border-border";
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium rounded border",
        variant,
        className
      )}
    >
      {label}
    </span>
  );
};
