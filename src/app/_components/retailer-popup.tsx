"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingCart, TrendingUp, Gift, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export function RetailerPopup() {
  useEffect(() => {
    // Check if user has already seen the popup (using localStorage)
    const hasSeenPopup = localStorage.getItem("retailer-popup-seen");
    
    // Show popup after a short delay if not seen before
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        toast.custom(
          (t) => (
            <div className="bg-black text-white rounded-lg shadow-2xl p-6 max-w-md border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Special Offer for Retailers</h3>
                  </div>
                  <p className="text-sm text-white/90 mb-1">
                    Get <span className="font-semibold text-yellow-400">3 months free</span> when you sign up
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <p className="text-xs text-white/80">
                      Experience <span className="font-bold text-green-400">10x improvement</span> in inventory management
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 font-semibold flex-1"
                      onClick={() => {
                        localStorage.setItem("retailer-popup-seen", "true");
                        toast.dismiss(t);
                      }}
                    >
                      <Link href="/auth?promo=retailer-3months">
                        Redeem Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                      onClick={() => {
                        localStorage.setItem("retailer-popup-seen", "true");
                        toast.dismiss(t);
                      }}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ),
          {
            duration: Infinity, // Don't auto-dismiss
            position: "top-center",
            className: "retailer-popup",
          }
        );
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}

