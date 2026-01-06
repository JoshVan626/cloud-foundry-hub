import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect } from "react";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Documentation from "./pages/Documentation";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Track page views for React Router (SPA)
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-6KQVDBN1NE", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/foundry" element={<Index />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
