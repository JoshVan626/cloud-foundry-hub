import { useState, useMemo } from "react";
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
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { docSections, getDocContent, DocBlock, docContents } from "@/data/documentation";

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

  const docContent = getDocContent(activeDocId);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return docSections;
    
    const query = searchQuery.toLowerCase();
    return docSections.map(section => ({
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
  }, [searchQuery]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleNavClick = (id: string) => {
    setActiveDocId(id);
    setMobileMenuOpen(false);
  };

  const getBreadcrumb = () => {
    for (const section of docSections) {
      const item = section.items.find(i => i.id === activeDocId);
      if (item) {
        return { section: section.title, item: item.label };
      }
    }
    return { section: "Docs", item: "Unknown" };
  };

  const breadcrumb = getBreadcrumb();

  const renderBlock = (block: DocBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {block.content}
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
        return (
          <div key={index} className="relative bg-zinc-950 rounded-lg border border-zinc-800 p-4 mb-6 font-mono text-sm overflow-x-auto">
            <button
              onClick={() => copyToClipboard(block.content || "")}
              className="absolute top-3 right-3 p-1.5 rounded bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
            >
              {copiedCode === block.content ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-zinc-500" />
              )}
            </button>
            <pre className="text-zinc-300 whitespace-pre-wrap pr-10">
              {block.content?.split('\n').map((line, i) => (
                <div key={i} className={cn(
                  line.startsWith('#') && !line.startsWith('##') ? "text-zinc-500" : "text-zinc-300",
                  line.startsWith('//') ? "text-zinc-500" : ""
                )}>
                  {line}
                </div>
              ))}
            </pre>
          </div>
        );
      case "list":
        return (
          <ul key={index} className="space-y-2 text-muted-foreground mb-6 list-none pl-0">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-card border border-border"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className={cn(
          "w-72 fixed left-0 top-16 bottom-0 border-r border-border bg-muted/30 overflow-y-auto z-40 transition-transform duration-200",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="p-6">
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
            <nav className="space-y-6">
              {filteredSections.map((section) => {
                const IconComponent = iconMap[section.icon] || Rocket;
                return (
                  <div key={section.id}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <IconComponent className="w-4 h-4 text-accent" />
                      {section.title}
                    </div>
                    <ul className="space-y-1 ml-6">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className={cn(
                              "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors",
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
        </aside>

        {/* Overlay for mobile */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-6 lg:p-10">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <BookOpen className="w-4 h-4" />
              <span>Docs</span>
              <ChevronRight className="w-4 h-4" />
              <span>{breadcrumb.section}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{breadcrumb.item}</span>
            </div>

            {/* Content */}
            {docContent ? (
              <article className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {docContent.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {docContent.description}
                </p>

                {docContent.content.map((block, index) => renderBlock(block, index))}

                {/* What's Next */}
                <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">What's Next?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {docSections.map((section) => (
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

      <Footer />
    </div>
  );
};

export default Documentation;
