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

  // Pre-calculate FIXED height to prevent layout shift
  const lineHeight = 1.4;
  const basePadding = 24;
  const commandLineHeight = 24;
  const linesCount = lines.length;
  const fixedHeightMobile = Math.min(280, basePadding + commandLineHeight + (linesCount * lineHeight * 16));
  const fixedHeightDesktop = Math.min(380, basePadding + commandLineHeight + (linesCount * lineHeight * 18));

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current && contentRef.current) {
        if (window.innerWidth >= 640) {
          containerRef.current.style.height = `${fixedHeightDesktop}px`;
          contentRef.current.style.height = `calc(${fixedHeightDesktop}px - 3rem)`;
          contentRef.current.style.maxHeight = `calc(${fixedHeightDesktop}px - 3rem)`;
        } else {
          containerRef.current.style.height = `${fixedHeightMobile}px`;
          contentRef.current.style.height = `calc(${fixedHeightMobile}px - 3rem)`;
          contentRef.current.style.maxHeight = `calc(${fixedHeightMobile}px - 3rem)`;
        }
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [fixedHeightMobile, fixedHeightDesktop]);

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
        <span className="text-terminal-muted text-xs ml-2 truncate">northstar-npm-01 — bash</span>
      </div>
      
      {/* Terminal Content - Scrollable container with proper containment */}
      <div 
        ref={containerRef}
        className="p-3 sm:p-4 overflow-x-auto overflow-y-hidden w-full max-w-full"
        style={{ 
          height: `${fixedHeightMobile}px`,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="text-terminal-green mb-2 text-xs sm:text-sm whitespace-nowrap" style={{ minWidth: 'max-content' }}>
          <span className="text-terminal-muted">$</span> ssh admin@npm-hardened.northstar.cloud
        </div>
        <div 
          ref={contentRef}
          className="text-terminal-text whitespace-pre leading-relaxed text-xs sm:text-sm font-mono"
          style={{ 
            height: `calc(${fixedHeightMobile}px - 3rem)`,
            maxHeight: `calc(${fixedHeightMobile}px - 3rem)`,
            minWidth: 'max-content',
          }}
        >
          {displayedLines.map((line, i) => (
            <div key={i} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
              {line || '\u00A0'}
            </div>
          ))}
          {!isComplete && Array.from({ length: lines.length - displayedLines.length }).map((_, i) => (
            <div key={`placeholder-${i}`} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
              {'\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
