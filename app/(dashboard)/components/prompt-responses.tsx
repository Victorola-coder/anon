"use client";

import {
  MessageCircle,
  ThumbsUp,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import Button from "@/app/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Response {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  hasImage?: boolean;
  imageUrl?: string;
  temporary?: {
    expiresAt: string;
  };
}

interface PromptResponsesProps {
  promptId: string;
  question: string;
}

export function PromptResponses({ promptId, question }: PromptResponsesProps) {
  const [responses] = useState<Response[]>([
    {
      id: "1",
      content:
        "I dream of building a sustainable eco-village in the mountains...",
      timestamp: "2 hours ago",
      likes: 24,
      hasImage: true,
      imageUrl: "/placeholder.jpg",
      temporary: {
        expiresAt: "2024-03-01T15:00:00",
      },
    },
    {
      id: "2",
      content: "My secret dream is to become a professional chef...",
      timestamp: "5 hours ago",
      likes: 12,
    },
  ]);

  const [expandedResponse, setExpandedResponse] = useState<string | null>(null);

  const handleLike = (responseId: string) => {
    // Implement like functionality
    toast.success("Response liked!");
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-navy-light/50 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-lighter mb-2">
          Responses to Daily Prompt
        </h3>
        <p className="text-slate">{question}</p>
      </div>

      <AnimatePresence>
        {responses.map((response) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 bg-navy border border-navy-light rounded-xl"
          >
            <div className="space-y-4">
              <p className="text-slate-lighter">
                {expandedResponse === response.id
                  ? response.content
                  : response.content.slice(0, 100) + "..."}
              </p>

              {response.hasImage && (
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img
                    src={response.imageUrl}
                    alt="Response image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-slate">
                <div className="flex items-center gap-4">
                  <span>{response.timestamp}</span>
                  {response.temporary && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>
                        Expires{" "}
                        {new Date(
                          response.temporary.expiresAt
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleLike(response.id)}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp size={14} />
                    <span>{response.likes}</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setExpandedResponse(
                        expandedResponse === response.id ? null : response.id
                      )
                    }
                  >
                    {expandedResponse === response.id
                      ? "Show Less"
                      : "Read More"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
