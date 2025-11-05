import { useState } from "react";
import { Mail, Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function SubscribeNews() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-primary" size={24} />
        </div>
        <h3
          className="text-lg mb-2 text-primary"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Successfully Subscribed!
        </h3>
        <p
          className="text-sm text-muted-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          You'll receive notifications whenever we publish new journalistic
          articles.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
          <Bell className="text-primary" size={20} />
        </div>
        <div>
          <h3
            className="text-lg text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Stay Updated
          </h3>
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get notified about new articles and stories
          </p>
        </div>
      </div>

      <form onSubmit={handleSubscribe} className="flex gap-3">
        <div className="flex-1 relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-input-background border-border"
            style={{ fontFamily: "Inter, sans-serif" }}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !email}
          className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
