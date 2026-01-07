import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface CodeSwitcherProps {
  terraform: string;
  cloudformation: string;
  className?: string;
}

export const CodeSwitcher = ({ terraform, cloudformation, className }: CodeSwitcherProps) => {
  const [activeTab, setActiveTab] = useState<"terraform" | "cloudformation">("terraform");
  const [copied, setCopied] = useState(false);

  const code = activeTab === "terraform" ? terraform : cloudformation;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-lg border border-terminal-border overflow-hidden", className)}>
      {/* Tab Header */}
      <div className="flex items-center justify-between bg-terminal-header border-b border-terminal-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab("terraform")}
            className={cn(
              "px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono transition-colors min-h-[44px]",
              activeTab === "terraform"
                ? "bg-terminal text-accent border-b-2 border-accent"
                : "text-terminal-muted hover:text-terminal-text"
            )}
          >
            main.tf
          </button>
          <button
            onClick={() => setActiveTab("cloudformation")}
            className={cn(
              "px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono transition-colors min-h-[44px]",
              activeTab === "cloudformation"
                ? "bg-terminal text-accent border-b-2 border-accent"
                : "text-terminal-muted hover:text-terminal-text"
            )}
          >
            template.yaml
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 sm:px-4 py-2 text-terminal-muted hover:text-terminal-text transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Content */}
      <div className="bg-terminal p-3 sm:p-4 overflow-x-auto terminal-scroll-content">
        <pre className="font-mono text-xs sm:text-sm text-terminal-text leading-relaxed whitespace-pre">
          <code className="block">{code}</code>
        </pre>
      </div>
    </div>
  );
};
