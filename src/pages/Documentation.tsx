import { useState } from "react";
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
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { docSections, getDocContent, DocBlock } from "@/data/documentation";

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

  const docContent = getDocContent(activeDocId);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
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
          <h2 key={index} className="text-2xl font-semibold text-foreground mb-4 mt-8">
            {block.content}
          </h2>
        );
      case "code":
        return (
          <div key={index} className="relative bg-terminal rounded-lg border border-terminal-border p-4 mb-6 font-mono text-sm overflow-x-auto">
            <button
              onClick={() => copyToClipboard(block.content || "")}
              className="absolute top-3 right-3 p-1.5 rounded bg-terminal-muted/20 hover:bg-terminal-muted/40 transition-colors"
            >
              {copiedCode === block.content ? (
                <Check className="w-4 h-4 text-terminal-green" />
              ) : (
                <Copy className="w-4 h-4 text-terminal-muted" />
              )}
            </button>
            <pre className="text-terminal-text whitespace-pre-wrap">
              {block.content?.split('\n').map((line, i) => (
                <div key={i} className={cn(
                  line.startsWith('#') ? "text-terminal-muted" : "text-terminal-text"
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
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{item}</span>
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
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      case "note":
        const noteStyles = {
          info: "bg-accent/5 border-accent/20 text-accent",
          warning: "bg-amber-500/5 border-amber-500/20 text-amber-400",
          success: "bg-emerald-500/5 border-emerald-500/20 text-emerald-400",
        };
        const NoteIcon = block.variant === "warning" ? AlertTriangle : block.variant === "success" ? CheckCircle2 : Info;
        return (
          <div key={index} className={cn(
            "flex gap-3 p-4 rounded-lg border mb-6",
            noteStyles[block.variant || "info"]
          )}>
            <NoteIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{block.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 border-r border-border bg-muted/30 overflow-y-auto">
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Nav Items */}
            <nav className="space-y-6">
              {docSections.map((section) => {
                const IconComponent = iconMap[section.icon] || Rocket;
                return (
                  <div key={section.id}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <IconComponent className="w-4 h-4 text-accent" />
                      {section.title}
                    </div>
                    <ul className="space-y-1 ml-6">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveDocId(item.id)}
                            className={cn(
                              "block w-full text-left text-sm py-1.5 px-2 rounded transition-colors",
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

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8">
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
                  <h3 className="text-lg font-semibold text-foreground mb-2">What's Next?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {docSections.map((section) => (
                      section.items
                        .filter(item => item.id !== activeDocId)
                        .slice(0, 1)
                        .map(item => (
                          <li key={item.id}>
                            <button
                              onClick={() => setActiveDocId(item.id)}
                              className="text-accent hover:underline"
                            >
                              {item.label}
                            </button>
                            <span className="text-muted-foreground"> — {section.title}</span>
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
