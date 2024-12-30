"use client";

import {
  Clock,
  Lock,
  AlertCircle,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import { Modal } from "@/app/components/ui/modal";

export function MessagePreviewModal({
  isOpen,
  onClose,
  message,
  options,
  imagePreview,
}: MessagePreviewModalProps) {
  const hasContent = message.trim().length > 0 || imagePreview;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Message Preview">
      <div className="space-y-6">
        {hasContent ? (
          <div className="bg-navy border border-navy-light rounded-xl p-4">
            <p className="text-slate-lighter whitespace-pre-wrap">{message}</p>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              {options.isTemporary && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-navy-light px-2.5 py-1 rounded-full text-slate">
                  <Clock size={12} />
                  Expires in {options.expiresIn}h
                </span>
              )}

              {options.hasPassword && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-navy-light px-2.5 py-1 rounded-full text-slate">
                  <Lock size={12} />
                  Password Protected
                </span>
              )}

              {options.allowReplies && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-navy-light px-2.5 py-1 rounded-full text-slate">
                  <MessageCircle size={12} />
                  Replies Enabled
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-light text-slate">
              <AlertCircle size={24} />
            </div>
            <p className="text-slate">No message content to preview yet.</p>
            <p className="text-sm text-slate/60">
              Start typing a message or add an image to see how it will look.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </Modal>
  );
}
