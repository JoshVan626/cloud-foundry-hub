import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { FoundryCatalog } from "@/components/FoundryCatalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/foundry") {
      const element = document.getElementById("foundry");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div id="foundry">
        <FoundryCatalog />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
