import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const HeroTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Deployment content lines
  const deploymentLines = [
    { content: "$ northstar-cloud deploy npm --hardened", type: "command" },
    { content: "", type: "empty" },
    { content: "Initializing appliance…", type: "text" },
    { content: "Resolving: Nginx Proxy Manager (Hardened Edition)", type: "resolve" },
    { content: "Target: AWS", type: "text" },
    { content: "", type: "empty" },
    { content: "[ 1/4 ] Applying hardened defaults…           ✓", type: "step" },
    { content: "[ 2/4 ] Wiring backups (atomic + S3-ready)…  ✓", type: "step" },
    { content: "[ 3/4 ] Enabling CloudWatch logs/metrics…    ✓", type: "step" },
    { content: "[ 4/4 ] Running first-boot checks…           ✓", type: "step" },
    { content: "", type: "empty" },
    { content: "DEPLOY COMPLETE", type: "complete" },
    { content: "Production-ready from first boot.", type: "text" },
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Progressive line reveal animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLines(deploymentLines.length);
      return;
    }

    // Show command immediately
    setVisibleLines(1);

    // Reveal remaining lines progressively
    const timers: NodeJS.Timeout[] = [];
    let cumulativeDelay = 0;
    
    for (let i = 1; i < deploymentLines.length; i++) {
      const delay = 150 + Math.random() * 70; // 150-220ms per line
      cumulativeDelay += delay;
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, cumulativeDelay);
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [prefersReducedMotion]);

  const renderLine = (line: typeof deploymentLines[0], index: number) => {
    if (line.type === "command") {
      return (
        <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
          <span className="text-terminal-muted">$</span>{" "}
          <span className="text-cyan-400">northstar-cloud</span>{" "}
          <span className="text-terminal-text">deploy npm --hardened</span>
        </div>
      );
    }

    if (line.type === "resolve") {
      return (
        <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
          <span className="text-terminal-text">Resolving: Nginx Proxy Manager </span>
          <span className="text-cyan-300">(Hardened Edition)</span>
        </div>
      );
    }

    if (line.type === "step") {
      // Extract the checkmark
      const parts = line.content.split("✓");
      return (
        <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
          <span className="text-terminal-text">{parts[0]}</span>
          <span className="text-green-500">✓</span>
        </div>
      );
    }

    if (line.type === "complete") {
      return (
        <div key={index} className="whitespace-pre font-semibold" style={{ minWidth: 'max-content' }}>
          <span className="text-green-500">{line.content}</span>
        </div>
      );
    }

    // Empty line or regular text
    return (
      <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
        <span className="text-terminal-text">{line.content}</span>
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-terminal rounded-lg border border-terminal-border font-mono text-sm w-full max-w-full"
    )}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-terminal-header border-b border-terminal-border">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-terminal-muted text-xs ml-2 truncate">northstar.cloud — deploy</span>
      </div>
      
      {/* Terminal Content - Scrollable container */}
      <div 
        ref={containerRef}
        className="p-3 sm:p-4 overflow-x-auto overflow-y-auto w-full max-w-full terminal-scroll-content"
        style={{ 
          maxHeight: '380px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div 
          ref={contentRef}
          className="text-terminal-text text-xs sm:text-sm font-mono"
        >
          {deploymentLines.slice(0, visibleLines).map((line, index) => renderLine(line, index))}
        </div>
      </div>
    </div>
  );
};
