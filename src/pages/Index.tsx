import { Hero } from "@/components/Hero";
import { FoundryCatalog } from "@/components/FoundryCatalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
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
