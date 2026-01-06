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

  // Pre-calculate height to prevent layout shift
  const lineHeight = 1.5; // leading-relaxed
  const estimatedHeight = lines.length * lineHeight * 1.4; // Add padding for line breaks
  // Mobile: max 300px, Desktop: max 400px
  const maxHeightMobile = 300;
  const maxHeightDesktop = 400;

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
      
      {/* Terminal Content - Fixed height to prevent layout shift */}
      <div 
        className="p-3 sm:p-4 overflow-x-auto overflow-y-hidden"
        style={{ 
          minHeight: `${Math.max(180, Math.min(estimatedHeight * 16, maxHeightMobile))}px`,
        }}
      >
        <div className="text-terminal-green mb-2 text-xs sm:text-sm">
          <span className="text-terminal-muted">$</span> ssh admin@npm-hardened.northstar.cloud
        </div>
        <div 
          className="text-terminal-text whitespace-pre leading-relaxed text-xs sm:text-sm sm:[min-height:350px]"
          style={{ 
            minHeight: `${Math.max(150, Math.min(estimatedHeight * 16, 250))}px`,
          }}
        >
          {displayedLines.map((line, i) => (
            <div key={i} className="terminal-line break-all sm:break-normal">
              {line || '\u00A0'}
            </div>
          ))}
          {/* Reserve space for remaining lines */}
          {!isComplete && Array.from({ length: lines.length - displayedLines.length }).map((_, i) => (
            <div key={`placeholder-${i}`} className="terminal-line break-all sm:break-normal">
              {'\u00A0'}
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
