import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MarketplaceNotifyModalProps {
  children: React.ReactNode;
}

export const MarketplaceNotifyModal = ({ children }: MarketplaceNotifyModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase
      .from("marketplace_leads")
      .insert({ email: trimmedEmail });
    
    setIsLoading(false);

    if (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setEmail("");
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
              </div>
              <DialogTitle className="text-xl text-foreground">
                AWS Marketplace Launch Pending
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed">
                Northstar Cloud Solutions is currently completing the final stages of 
                AWS Marketplace registration. Please enter your email below to be notified 
                the moment our Hardened Edition appliances are live.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-accent"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                variant="accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Notify Me"
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We'll only email you about the Marketplace launch. No spam, ever.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              You're on the list!
            </h3>
            <p className="text-muted-foreground">
              We'll notify you as soon as we're live on AWS Marketplace.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
