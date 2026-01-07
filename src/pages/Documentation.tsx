import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Search, 
  BookOpen, 
  Rocket, 
  Shield, 
  Terminal, 
  Database,
  Activity,
  RefreshCw,
  ChevronRight,
  Copy,
  Check,
  AlertTriangle,
  Info,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { docSections, getDocContent, DocBlock, docContents, products } from "@/data/documentation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Shield,
  Terminal,
  Database,
  Activity,
  RefreshCw,
};

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDocId, setActiveDocId] = useState("quickstart");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("nginx-proxy-manager");

  const docContent = getDocContent(activeDocId);
  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Filter sections based on search query AND selected product
  const filteredSections = useMemo(() => {
    const productSections = docSections.filter(section => section.productId === selectedProductId);
    
    if (!searchQuery.trim()) return productSections;
    
    const query = searchQuery.toLowerCase();
    return productSections.map(section => ({
      ...section,
      items: section.items.filter(item => {
        const content = docContents[item.id];
        if (!content) return false;
        
        // Search in title, description, and content
        const searchableText = [
          content.title,
          content.description,
          ...content.content.map(block => block.content || block.items?.join(' ') || '')
        ].join(' ').toLowerCase();
        
        return searchableText.includes(query) || item.label.toLowerCase().includes(query);
      })
    })).filter(section => section.items.length > 0);
  }, [searchQuery, selectedProductId]);

  // Ensure the active doc belongs to the selected product (important for future multi-product catalogs)
  useEffect(() => {
    const productSections = docSections.filter(section => section.productId === selectedProductId);
    const productDocIds = new Set(productSections.flatMap(section => section.items.map(item => item.id)));

    if (productDocIds.size === 0) return;
    if (productDocIds.has(activeDocId)) return;

    const firstDocId = productSections[0]?.items[0]?.id;
    if (firstDocId) setActiveDocId(firstDocId);
  }, [activeDocId, selectedProductId]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleNavClick = (id: string) => {
    setActiveDocId(id);
    setMobileMenuOpen(false);
  };

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
    // Reset to first doc of new product
    const firstSection = docSections.find(s => s.productId === productId);
    if (firstSection && firstSection.items.length > 0) {
      setActiveDocId(firstSection.items[0].id);
    }
  };

  const getBreadcrumb = () => {
    const productSections = docSections.filter(section => section.productId === selectedProductId);
    for (const section of productSections) {
      const item = section.items.find(i => i.id === activeDocId);
      if (item) {
        return { 
          product: selectedProduct?.shortName || "Docs",
          section: section.title, 
          item: item.label 
        };
      }
    }
    return { product: "Docs", section: "Docs", item: "Unknown" };
  };

  const breadcrumb = getBreadcrumb();

  const renderMarkdown = (text: string, keyPrefix = '') => {
    // Simple markdown rendering for bold and inline code
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let keyCounter = 0;
    
    // Match **bold** and `code`
    const regex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        if (beforeText) {
          parts.push(beforeText);
        }
      }
      
      // Add the matched content
      if (match[1].startsWith('**')) {
        // Bold text
        parts.push(<strong key={`${keyPrefix}-${keyCounter++}`}>{match[2]}</strong>);
      } else if (match[1].startsWith('`')) {
        // Inline code
        parts.push(<code key={`${keyPrefix}-${keyCounter++}`} className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">{match[3]}</code>);
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  const renderBlock = (block: DocBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {renderMarkdown(block.content || '')}
          </p>
        );
      case "heading":
        return (
          <h2 key={index} className="text-2xl font-semibold text-foreground mb-4 mt-8 first:mt-0">
            {block.content}
          </h2>
        );
      case "subheading":
        return (
          <h3 key={index} className="text-lg font-semibold text-foreground mb-3 mt-6">
            {block.content}
          </h3>
        );
      case "code":
        const language = block.language || 'bash';
        const getLanguageLabel = (lang: string) => {
          const labels: Record<string, string> = {
            bash: 'bash',
            sh: 'bash',
            shell: 'bash',
            json: 'json',
            yaml: 'yaml',
            yml: 'yaml',
            ini: 'config',
            conf: 'config',
            text: 'text',
            python: 'python',
            py: 'python',
            javascript: 'js',
            js: 'js',
            typescript: 'ts',
            ts: 'ts',
          };
          return labels[lang.toLowerCase()] || lang || 'code';
        };

        return (
          <div key={index} className="relative bg-terminal rounded-lg border border-terminal-border overflow-hidden mb-6 font-mono text-xs sm:text-sm shadow-lg">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-terminal-header border-b border-terminal-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-terminal-muted text-xs ml-2">{getLanguageLabel(language)}</span>
              </div>
              <button
                onClick={() => copyToClipboard(block.content || "")}
                className="p-1.5 sm:p-2 rounded bg-terminal/50 hover:bg-terminal-border transition-colors text-terminal-muted hover:text-terminal-text min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Copy to clipboard"
                aria-label="Copy code to clipboard"
              >
                {copiedCode === block.content ? (
                  <Check className="w-4 h-4 text-terminal-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {/* Code Content */}
            <div className="p-3 sm:p-4 overflow-x-auto terminal-scroll-content">
              <pre className="text-terminal-text whitespace-pre text-xs sm:text-sm">
                {block.content?.split('\n').map((line, i) => (
                  <div key={i} className={cn(
                    "terminal-line",
                    line.startsWith('#') && !line.startsWith('##') ? "text-terminal-muted" : "",
                    line.startsWith('//') ? "text-terminal-muted" : "",
                    line.trim().startsWith('$') ? "text-terminal-green" : ""
                  )}>
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        );
      case "list":
        return (
          <ul key={index} className="space-y-2 text-muted-foreground mb-6 list-none pl-0">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="leading-relaxed whitespace-pre-line">{renderMarkdown(item, `list-${index}-item-${i}`)}</span>
              </li>
            ))}
          </ul>
        );
      case "prereq":
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 mt-0">Prerequisites</h2>
            <ul className="space-y-2 text-muted-foreground list-none pl-0">
              {block.items?.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      case "note":
        const noteStyles = {
          info: "bg-accent/5 border-accent/20",
          warning: "bg-amber-500/5 border-amber-500/20",
          success: "bg-emerald-500/5 border-emerald-500/20",
        };
        const iconStyles = {
          info: "text-accent",
          warning: "text-amber-400",
          success: "text-emerald-400",
        };
        const NoteIcon = block.variant === "warning" ? AlertTriangle : block.variant === "success" ? CheckCircle2 : Info;
        return (
          <div key={index} className={cn(
            "flex gap-3 p-4 rounded-lg border mb-6",
            noteStyles[block.variant || "info"]
          )}>
            <NoteIcon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconStyles[block.variant || "info"])} />
            <p className="text-sm text-muted-foreground leading-relaxed">{block.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Shared sidebar content component
  const SidebarContent = () => (
    <div className="p-4 sm:p-6">
      {/* Product Selector */}
      <div className="mb-6">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Product
        </label>
        <Select value={selectedProductId} onValueChange={handleProductChange}>
          <SelectTrigger className="w-full bg-background border-border">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-accent" />
              <SelectValue placeholder="Select product" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.shortName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search docs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      {/* Nav Items */}
      <nav className="space-y-4 sm:space-y-6">
        {filteredSections.map((section) => {
          const IconComponent = iconMap[section.icon] || Rocket;
          return (
            <div key={section.id}>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <IconComponent className="w-4 h-4 text-accent" />
                {section.title}
              </div>
              <ul className="space-y-1 ml-4 sm:ml-6">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        handleNavClick(item.id);
                        setMobileMenuOpen(false); // Close mobile menu on click
                      }}
                      className={cn(
                        "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors break-words",
                        activeDocId === item.id
                          ? "bg-accent/10 text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex">
        {/* Desktop Sidebar - Always visible on lg+ */}
        <aside className="hidden lg:block w-72 fixed left-0 top-16 bottom-0 border-r border-border bg-muted/30 overflow-y-auto z-40">
          <SidebarContent />
        </aside>

        {/* Mobile Bottom Sheet - Only on small screens */}
        <aside className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 max-h-[85dvh] rounded-t-xl border-t border-border bg-muted/30 z-40 transition-transform duration-300 ease-out flex flex-col",
          mobileMenuOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))'
        }}>
          {/* Sticky Header with Close Button */}
          <div className="sticky top-0 z-50 bg-muted/30 backdrop-blur-sm border-b border-border px-4 py-3 flex justify-between items-center flex-shrink-0">
            <h2 className="text-lg font-semibold text-foreground">Documentation</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground flex-shrink-0"
              aria-label="Close docs menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto terminal-scroll-content">
            <SidebarContent />
          </div>
        </aside>

        {/* Overlay for mobile - clickable backdrop */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setMobileMenuOpen(false)}
            onTouchStart={(e) => {
              // Close on swipe down gesture
              if (e.touches[0].clientY > window.innerHeight * 0.1) {
                setMobileMenuOpen(false);
              }
            }}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-10 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <div className="max-w-3xl mx-auto w-full">
            {/* Breadcrumb with mobile docs menu button */}
            <div className="flex items-center justify-between gap-2 mb-6 sm:mb-8">
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap overflow-x-auto">
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
                <ChevronRight className="w-4 h-4" />
                <span>{breadcrumb.product}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{breadcrumb.section}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">{breadcrumb.item}</span>
              </div>
              {/* Mobile docs menu button - in normal flow, not fixed */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden px-3 py-2 rounded-lg bg-card border border-border shadow-sm hover:bg-muted transition-colors text-sm font-medium text-foreground flex items-center gap-2 flex-shrink-0"
                aria-label={mobileMenuOpen ? "Close docs menu" : "Open docs menu"}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Docs Menu</span>
                <span className="sm:hidden">Menu</span>
              </button>
            </div>

            {/* Content */}
            {docContent ? (
              <article className="prose prose-invert max-w-none w-full overflow-x-hidden">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 break-words">
                  {docContent.title}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed break-words">
                  {docContent.description}
                </p>

                {docContent.content.map((block, index) => renderBlock(block, index))}

                {/* What's Next */}
                <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">What's Next?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {filteredSections.map((section) => (
                      section.items
                        .filter(item => item.id !== activeDocId)
                        .slice(0, 1)
                        .map(item => (
                          <li key={item.id} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-accent" />
                            <button
                              onClick={() => handleNavClick(item.id)}
                              className="text-accent hover:underline"
                            >
                              {item.label}
                            </button>
                            <span className="text-muted-foreground">— {section.title}</span>
                          </li>
                        ))
                    )).flat().slice(0, 3)}
                  </ul>
                </div>
              </article>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Documentation not found.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <div className="lg:ml-72">
        <Footer />
      </div>
    </div>
  );
};

export default Documentation;