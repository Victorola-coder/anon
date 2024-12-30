"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "@/app/components/ui/modal";
import Button from "@/app/components/ui/button";
import { Image, Clock } from "lucide-react";

interface PromptResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: {
    id: string;
    question: string;
  };
}

export function PromptResponseModal({
  isOpen,
  onClose,
  prompt,
}: PromptResponseModalProps) {
  const [response, setResponse] = useState("");
  const [isTemporary, setIsTemporary] = useState(false);
  const [expiresIn, setExpiresIn] = useState("24");
  const [hasImage, setHasImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Response submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to submit response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Respond to Daily Prompt">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-navy-light/50 p-4 rounded-lg">
          <p className="text-slate-lighter">{prompt.question}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate mb-1">
            Your Response
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full h-32 bg-navy-light border border-navy-light rounded-lg px-4 py-2 text-slate-lighter focus:outline-none focus:border-teal resize-none"
            placeholder="Share your thoughts..."
            maxLength={500}
            required
          />
          <div className="flex justify-end text-sm text-slate mt-1">
            {response.length}/500
          </div>
        </div>

        <div className="space-y-4 border-t border-navy-light pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate" />
              <span className="text-sm text-slate">Make temporary</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isTemporary}
                onChange={(e) => setIsTemporary(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-navy-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate after:border-slate after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
            </label>
          </div>

          {isTemporary && (
            <div className="flex items-center gap-4">
              <select
                value={expiresIn}
                onChange={(e) => setExpiresIn(e.target.value)}
                className="bg-navy-light border border-navy-light rounded-lg px-3 py-2 text-slate-lighter focus:outline-none focus:border-teal"
              >
                <option value="1">1 hour</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="168">1 week</option>
              </select>

              <div className="flex items-center gap-2">
                <Image size={16} className="text-slate" />
                <label className="text-sm text-slate">Include image</label>
                <input
                  type="checkbox"
                  checked={hasImage}
                  onChange={(e) => setHasImage(e.target.checked)}
                  className="ml-2"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Submit Response
          </Button>
        </div>
      </form>
    </Modal>
  );
}
