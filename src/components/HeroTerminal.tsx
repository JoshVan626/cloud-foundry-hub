import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const HeroTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
        <span className="text-terminal-muted text-xs ml-2 truncate">northstar.cloud — brand</span>
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
          {/* Command Line */}
          <div className="text-terminal-green mb-3 whitespace-nowrap" style={{ minWidth: 'max-content' }}>
            <span className="text-terminal-muted">$</span> cat northstar-cloud-solutions.brand
          </div>

          {/* Brand Header */}
          <div className="mb-4" style={{ minWidth: 'max-content' }}>
            <span className="text-cyan-400">NORTHSTAR CLOUD SOLUTIONS</span>
          </div>

          {/* PRODUCTS Section */}
          <div className="mb-4" style={{ minWidth: 'max-content' }}>
            <div className="text-cyan-300/80 mb-2 whitespace-pre">  PRODUCTS</div>
            <div className="text-terminal-muted mb-1 whitespace-pre">  ─────────────────────────────────────────────────────────</div>
            <div className="whitespace-pre">
              <span className="text-terminal-text">  • </span>
              <span className="text-cyan-400">Nginx Proxy Manager (Hardened Edition)</span>
              <span className="text-terminal-text"> ........... </span>
              <span className="text-green-500">[AVAILABLE]</span>
            </div>
            <div className="whitespace-pre">
              <span className="text-terminal-text">  • </span>
              <span className="text-cyan-400">WordPress (Hardened Edition)</span>
              <span className="text-terminal-text"> ........... </span>
              <span className="text-amber-500">[PLANNED]</span>
            </div>
            <div className="whitespace-pre">
              <span className="text-terminal-text">  • </span>
              <span className="text-cyan-400">Wiki.js (Hardened Edition)</span>
              <span className="text-terminal-text"> ........... </span>
              <span className="text-amber-500">[PLANNED]</span>
            </div>
          </div>

          {/* PRINCIPLES Section */}
          <div className="mb-4" style={{ minWidth: 'max-content' }}>
            <div className="text-cyan-300/80 mb-2 whitespace-pre">  PRINCIPLES</div>
            <div className="text-terminal-muted mb-1 whitespace-pre">  ─────────────────────────────────────────────────────────</div>
            <div className="whitespace-pre">
              <span className="text-green-500">  ✓ </span>
              <span className="text-cyan-400">Security</span>
              <span className="text-terminal-text"> .......... Defense-in-depth hardening from day one</span>
            </div>
            <div className="whitespace-pre">
              <span className="text-green-500">  ✓ </span>
              <span className="text-cyan-400">Backups</span>
              <span className="text-terminal-text"> .......... Atomic backups with S3 sync and rotation</span>
            </div>
            <div className="whitespace-pre">
              <span className="text-green-500">  ✓ </span>
              <span className="text-cyan-400">Logs</span>
              <span className="text-terminal-text"> .............. CloudWatch integration for full visibility</span>
            </div>
            <div className="whitespace-pre">
              <span className="text-green-500">  ✓ </span>
              <span className="text-cyan-400">Day-2 Ops</span>
              <span className="text-terminal-text"> ......... Automated operations, health monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

