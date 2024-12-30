"use client";

import { useState } from "react";
import { Modal } from "@/app/components/ui/modal";
import { QRCodeSVG } from "qrcode.react";
import {
  Copy,
  Share2,
  Twitter,
  Facebook,
  Link,
  MessageCircle,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  url: string;
}

export function ShareModal({
  isOpen,
  onClose,
  username,
  url,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=Send%20me%20an%20anonymous%20message!&url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    whatsapp: `https://wa.me/?text=Send%20me%20an%20anonymous%20message!%20${encodeURIComponent(
      url
    )}`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Profile">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-xl">
            <QRCodeSVG value={url} size={200} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-navy-light rounded-lg">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-transparent text-slate-lighter text-sm focus:outline-none"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              <Copy size={14} />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-navy-light rounded-lg text-slate hover:text-slate-lighter transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-navy-light rounded-lg text-slate hover:text-slate-lighter transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-navy-light rounded-lg text-slate hover:text-slate-lighter transition-colors"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
