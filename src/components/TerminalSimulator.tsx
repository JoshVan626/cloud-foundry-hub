import { useState, useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position on mount and when lines change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollLeft = 0;
    }
  }, [lines]);

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
      "bg-terminal rounded-lg border border-terminal-border font-mono text-sm w-full max-w-full",
      className
    )}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-terminal-header border-b border-terminal-border">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-terminal-muted text-xs ml-2 truncate">northstar.cloud — first-boot</span>
      </div>
      
      {/* Terminal Content - Scrollable container - match hero terminal exactly */}
      <div 
        ref={containerRef}
        className="p-3 sm:p-4 overflow-x-auto overflow-y-auto w-full max-w-full terminal-scroll-content"
        style={{ 
          maxHeight: '380px',
          WebkitOverflowScrolling: 'touch',
        }}
        tabIndex={-1}
      >
        <div 
          ref={contentRef}
          className="text-terminal-text text-xs sm:text-sm font-mono"
          style={{
            caretColor: 'transparent',
            userSelect: 'none'
          }}
        >
          {displayedLines.map((line, i) => (
            <div key={i} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
              <span className="text-terminal-text">{line || '\u00A0'}</span>
            </div>
          ))}
          {!isComplete && Array.from({ length: lines.length - displayedLines.length }).map((_, i) => (
            <div key={`placeholder-${i}`} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
              <span className="text-terminal-text">{'\u00A0'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
