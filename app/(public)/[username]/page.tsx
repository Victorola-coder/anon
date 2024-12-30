"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Send, Share2 } from "lucide-react";
import { toast } from "sonner";
import Button from "@/app/components/ui/button";

export default function UserPublicPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const username = params.username as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent successfully!");
    setMessage("");
    setIsLoading(false);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Send message to @${username}`,
          text: `Send an anonymous message to @${username}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  return (
    <main className="min-h-screen bg-navy-dark">
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* User Profile Section */}
          <div className="text-center">
            <div className="w-24 h-24 bg-teal/10 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl text-teal">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-lighter">
              @{username}
            </h1>
            <p className="text-slate mt-2">Send me an anonymous message!</p>
            <button
              onClick={handleShare}
              className="mt-4 flex items-center gap-2 mx-auto text-sm text-slate hover:text-teal transition-colors"
            >
              <Share2 size={16} />
              Share Profile
            </button>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full h-32 bg-navy border border-navy-light rounded-xl p-4 text-slate-lighter placeholder:text-slate resize-none focus:outline-none focus:border-teal transition-colors"
                maxLength={500}
                disabled={isLoading}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm text-slate">
                <MessageCircle size={16} />
                <span>{message.length}/500</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Anonymously</span>
                </>
              )}
            </Button>
          </form>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-navy border border-navy-light rounded-xl">
              <h3 className="text-lg font-semibold text-slate-lighter mb-2">
                100% Anonymous
              </h3>
              <p className="text-slate text-sm">
                Your identity remains completely private when sending messages.
              </p>
            </div>
            <div className="p-4 bg-navy border border-navy-light rounded-xl">
              <h3 className="text-lg font-semibold text-slate-lighter mb-2">
                Safe & Secure
              </h3>
              <p className="text-slate text-sm">
                All messages are encrypted and handled with strict privacy
                measures.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
