import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const HeroTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [commandText, setCommandText] = useState("");
  const [visibleOutputLines, setVisibleOutputLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [stopBlinking, setStopBlinking] = useState(false);

  const command = "northstar-cloud deploy npm --hardened";
  const fullCommand = `$ ${command}`;

  // Output lines (exact as specified)
  const outputLines = [
    "Initializing appliance…",
    "Resolving: Nginx Proxy Manager (Hardened Edition)",
    "Target: AWS",
    "",
    "[ 1/4 ] Applying hardened defaults…           ✓",
    "[ 2/4 ] Wiring backups (atomic + S3-ready)…  ✓",
    "[ 3/4 ] Enabling CloudWatch logs/metrics…    ✓",
    "[ 4/4 ] Running first-boot checks…           ✓",
    "",
    "DEPLOY COMPLETE",
    "Production-ready from first boot.",
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

  // Cursor blink animation - stop after 6 seconds
  useEffect(() => {
    if (prefersReducedMotion || stopBlinking) {
      setShowCursor(true); // Keep cursor visible but static
      return;
    }

    if (!isComplete) return;

    // Stop blinking after 6 seconds
    const stopTimer = setTimeout(() => {
      setStopBlinking(true);
    }, 6000);

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // ~530ms blink rate

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
    };
  }, [prefersReducedMotion, isComplete, stopBlinking]);

  // Terminal typing animation
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show everything immediately
      setCommandText(fullCommand);
      setVisibleOutputLines(outputLines.length);
      setIsComplete(true);
      setShowCursor(true);
      return;
    }

    // Phase 1: Type command character-by-character
    let charIndex = 0;
    const commandTimers: NodeJS.Timeout[] = [];

    const typeCommand = () => {
      if (charIndex < fullCommand.length) {
        const typingSpeed = 45 + Math.random() * 25; // 45-70ms per character
        const timer = setTimeout(() => {
          setCommandText(fullCommand.slice(0, charIndex + 1));
          charIndex++;
          typeCommand();
        }, typingSpeed);
        commandTimers.push(timer);
      } else {
        // Command finished, wait 350-600ms then start output
        const waitTime = 350 + Math.random() * 250; // 350-600ms
        const timer = setTimeout(() => {
          setShowCursor(false); // Hide cursor during output
          printOutput();
        }, waitTime);
        commandTimers.push(timer);
      }
    };

    // Phase 2: Print output lines one-by-one
    let outputIndex = 0;
    const printOutput = () => {
      if (outputIndex < outputLines.length) {
        // Check if this is a step line (1/4, 2/4, etc.) for extra delay
        const isStepLine = outputLines[outputIndex].includes("[ ");
        const delay = isStepLine 
          ? 350 + Math.random() * 200 // 350-550ms for step lines
          : 250 + Math.random() * 200; // 250-450ms for other lines

        const timer = setTimeout(() => {
          setVisibleOutputLines(outputIndex + 1);
          outputIndex++;
          printOutput();
        }, delay);
        commandTimers.push(timer);
      } else {
        // All output printed, show cursor at end
        setIsComplete(true);
        setShowCursor(true);
      }
    };

    // Start typing command
    typeCommand();

    return () => {
      commandTimers.forEach(timer => clearTimeout(timer));
    };
  }, [prefersReducedMotion]);

  // Compute command parts for rendering
  const getCommandParts = () => {
    if (commandText.length <= 2) return { prompt: "$ ", northstar: "", rest: "" };
    
    const afterPrompt = commandText.slice(2);
    const northstarCloudLen = "northstar-cloud".length;
    
    if (afterPrompt.length <= northstarCloudLen) {
      return {
        prompt: "$ ",
        northstar: afterPrompt,
        rest: ""
      };
    }
    
    return {
      prompt: "$ ",
      northstar: afterPrompt.slice(0, northstarCloudLen),
      rest: afterPrompt.slice(northstarCloudLen)
    };
  };

  const commandParts = getCommandParts();

  const renderOutputLine = (line: string, index: number) => {
    if (line === "") {
      return <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>&nbsp;</div>;
    }

    if (line.includes("Resolving:")) {
      return (
        <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
          <span className="text-terminal-text">Resolving: Nginx Proxy Manager </span>
          <span className="text-cyan-300">(Hardened Edition)</span>
        </div>
      );
    }

    if (line.includes("[ ") && line.includes("]")) {
      // Step line with checkmark
      const parts = line.split("✓");
      return (
        <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
          <span className="text-terminal-text">{parts[0]}</span>
          <span className="text-green-500">✓</span>
        </div>
      );
    }

    if (line === "DEPLOY COMPLETE") {
      return (
        <div key={index} className="whitespace-pre font-semibold" style={{ minWidth: 'max-content' }}>
          <span className="text-green-500">{line}</span>
        </div>
      );
    }

    // Regular text line
    return (
      <div key={index} className="whitespace-pre" style={{ minWidth: 'max-content' }}>
        <span className="text-terminal-text">{line}</span>
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
          {/* Command line with typing animation */}
          <div className="whitespace-pre mb-1" style={{ minWidth: 'max-content' }}>
            <span className="text-terminal-muted">{commandParts.prompt}</span>
            {commandParts.northstar && (
              <span className="text-cyan-400">{commandParts.northstar}</span>
            )}
            {commandParts.rest && (
              <span className="text-terminal-text">{commandParts.rest}</span>
            )}
            {/* Show cursor only during typing (before output starts) */}
            {!isComplete && visibleOutputLines === 0 && showCursor && (
              <span className={`inline-block ml-0.5 ${stopBlinking ? '' : 'animate-pulse'}`} style={{ color: 'hsl(var(--terminal-cursor))' }}>▍</span>
            )}
          </div>

          {/* Output lines */}
          {outputLines.slice(0, visibleOutputLines).map((line, index) => renderOutputLine(line, index))}

          {/* Final cursor after completion - only one cursor, only if not showing typing cursor */}
          {isComplete && showCursor && visibleOutputLines > 0 && (
            <div className="whitespace-pre" style={{ minWidth: 'max-content' }}>
              <span className={`inline-block ml-0.5 ${stopBlinking ? '' : 'animate-pulse'}`} style={{ color: 'hsl(var(--terminal-cursor))' }}>▍</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
