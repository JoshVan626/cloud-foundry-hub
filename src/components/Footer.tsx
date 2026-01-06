import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">Northstar Cloud Solutions</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Cloud Solutions Foundry. Production-ready infrastructure appliances for AWS.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products/nginx-proxy-manager" className="hover:text-foreground transition-colors">Nginx Proxy Manager</Link></li>
              <li><Link to="/products/wordpress-hardened" className="hover:text-foreground transition-colors">WordPress (Hardened Edition)</Link></li>
              <li><Link to="/products/wikijs-hardened" className="hover:text-foreground transition-colors">Wiki.js (Hardened Edition)</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:support@northstarcloud.io" className="hover:text-foreground transition-colors">
                  support@northstarcloud.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <span>© 2026 Northstar Cloud Solutions LLC. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
