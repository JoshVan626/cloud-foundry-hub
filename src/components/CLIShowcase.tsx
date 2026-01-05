import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CLICommand {
  command: string;
  description: string;
}

interface CLIShowcaseProps {
  commands: CLICommand[];
  className?: string;
}

export const CLIShowcase = ({ commands, className }: CLIShowcaseProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={cn("rounded-lg border border-terminal-border overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-terminal-border">
        <Terminal className="w-4 h-4 text-accent" />
        <span className="text-sm font-mono text-terminal-text">npm-helper CLI</span>
      </div>

      {/* Commands */}
      <div className="bg-terminal divide-y divide-terminal-border">
        {commands.map((cmd, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 group hover:bg-terminal-header/50 transition-colors"
          >
            <div className="flex-1 min-w-0 pr-2">
              <code className="text-xs sm:text-sm font-mono text-terminal-green block break-all sm:break-words">
                $ {cmd.command}
              </code>
              <p className="text-xs sm:text-sm text-terminal-muted mt-1 break-words">{cmd.description}</p>
            </div>
            <button
              onClick={() => handleCopy(cmd.command, index)}
              className="ml-2 sm:ml-4 p-2 text-terminal-muted hover:text-terminal-text transition-colors opacity-0 group-hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Copy command: ${cmd.command}`}
            >
              {copiedIndex === index ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
