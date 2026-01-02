import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Search, 
  BookOpen, 
  Rocket, 
  Shield, 
  Terminal, 
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { label: "Quickstart", active: true },
      { label: "Prerequisites" },
      { label: "AWS Setup" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { label: "Security Hardening" },
      { label: "Firewall Configuration" },
      { label: "SSL/TLS Setup" },
    ],
  },
  {
    title: "Operations",
    icon: Terminal,
    items: [
      { label: "Backup & Restore" },
      { label: "Updates" },
      { label: "Monitoring" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    items: [
      { label: "Environment Variables" },
      { label: "Customization" },
    ],
  },
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
              {sidebarItems.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <section.icon className="w-4 h-4 text-accent" />
                    {section.title}
                  </div>
                  <ul className="space-y-1 ml-6">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href="#"
                          className={cn(
                            "block text-sm py-1.5 px-2 rounded transition-colors",
                            item.active
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
              <span>Getting Started</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Quickstart</span>
            </div>

            {/* Content */}
            <article className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold text-foreground mb-4">Quickstart</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get your Northstar appliance up and running in under 5 minutes.
              </p>

              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 mt-0">Prerequisites</h2>
                <ul className="space-y-2 text-muted-foreground list-none pl-0">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    AWS Account with EC2 launch permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    VPC with public subnet (for proxy use cases)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Terraform 1.0+ or AWS CLI configured
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Step 1: Deploy the AMI</h2>
              <p className="text-muted-foreground mb-4">
                Use our Terraform module for the fastest deployment path:
              </p>
              
              <div className="bg-terminal rounded-lg border border-terminal-border p-4 mb-8 font-mono text-sm">
                <div className="text-terminal-muted"># Initialize and apply</div>
                <div className="text-terminal-green">$ terraform init</div>
                <div className="text-terminal-green">$ terraform apply</div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Step 2: Access Your Instance</h2>
              <p className="text-muted-foreground mb-4">
                Once deployed, SSH into your instance to retrieve your admin credentials:
              </p>

              <div className="bg-terminal rounded-lg border border-terminal-border p-4 mb-8 font-mono text-sm">
                <div className="text-terminal-green">$ ssh -i your-key.pem admin@your-instance-ip</div>
                <div className="text-terminal-text mt-2">
                  # Credentials are displayed in the MOTD and stored in SSM Parameter Store
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Step 3: Configure Your Proxy</h2>
              <p className="text-muted-foreground mb-4">
                Access the admin panel at <code className="text-accent">https://your-domain:81</code> and start 
                configuring your proxy hosts, SSL certificates, and access lists.
              </p>

              <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">What's Next?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="text-accent hover:underline">Security Hardening Guide</a> — Review the pre-configured security controls
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">Backup Configuration</a> — Set up automated backups to S3
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">Monitoring Setup</a> — Configure CloudWatch dashboards and alerts
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
