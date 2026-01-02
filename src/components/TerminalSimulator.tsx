import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalSimulatorProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
}

export const TerminalSimulator = ({ 
  lines, 
  typingSpeed = 20,
  className 
}: TerminalSimulatorProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed]);

  return (
    <div className={cn(
      "bg-terminal rounded-lg border border-terminal-border overflow-hidden font-mono text-sm",
      className
    )}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-terminal-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-terminal-muted text-xs ml-2">northstar-npm-01 — bash</span>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 min-h-[300px] overflow-x-auto">
        <div className="text-terminal-green mb-2">
          <span className="text-terminal-muted">$</span> ssh admin@npm-hardened.northstar.cloud
        </div>
        <div className="text-terminal-text whitespace-pre leading-relaxed">
          {displayedLines.map((line, i) => (
            <div key={i} className="terminal-line">
              {line}
            </div>
          ))}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-terminal-cursor animate-pulse ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
};
