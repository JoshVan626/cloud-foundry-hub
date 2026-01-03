import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Northstar Cloud Solutions" className="h-9 w-9" />
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
              <li><Link to="/products/portainer-business" className="hover:text-foreground transition-colors">Portainer Business</Link></li>
              <li><Link to="/products/vault-cluster" className="hover:text-foreground transition-colors">HashiCorp Vault</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terraform Registry</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">AWS Marketplace</a></li>
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
              <li>
                <a href="mailto:legal@northstarcloud.io" className="hover:text-foreground transition-colors">
                  legal@northstarcloud.io
                </a>
              </li>
              <li>
                <a href="https://northstarcloud.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  northstarcloud.io
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
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
