"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  BarChart2,
  Clock,
  Image as ImageIcon,
  Lock,
  Star,
  Trash2,
  Share2,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import { ExpirationDisplay } from "@/app/(public)/components/expiration-display";

interface ContentViewerProps {
  type: "message" | "poll";
  data: Message | Poll;
  onDelete: (id: string) => void;
  onToggleStar?: (id: string) => void;
  onShare?: (id: string) => void;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  temporary?: {
    expiresAt: string;
    hasImage?: boolean;
  };
  hasPassword?: boolean;
  imageUrl?: string;
}

interface Poll {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  createdAt: string;
  endsAt: string;
  status: "active" | "ended";
}

export function ContentViewer({
  type,
  data,
  onDelete,
  onToggleStar,
  onShare,
}: ContentViewerProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = () => {
    setShowConfirmDelete(false);
    onDelete(data.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-navy border border-navy-light rounded-xl p-6 space-y-4"
    >
      {type === "message" ? (
        // Message Content
        <div className="space-y-4">
          <p className="text-slate-lighter whitespace-pre-wrap">
            {(data as Message).content}
          </p>
          {(data as Message).imageUrl && (
            <img
              src={(data as Message).imageUrl}
              alt="Message attachment"
              className="w-full max-h-64 object-cover rounded-lg"
            />
          )}
        </div>
      ) : (
        // Poll Content
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-lighter">
            {(data as Poll).question}
          </h3>
          <div className="space-y-3">
            {(data as Poll).options.map((option) => {
              const percentage =
                Math.round((option.votes / (data as Poll).totalVotes) * 100) ||
                0;
              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between text-sm text-slate">
                    <span>{option.text}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="h-2 bg-navy-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full bg-teal"
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-navy-light">
        <div className="flex items-center gap-4">
          {type === "message" && onToggleStar && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onToggleStar(data.id)}
              className={`text-slate hover:text-yellow-400 ${
                (data as Message).starred ? "text-yellow-400" : ""
              }`}
            >
              <Star size={16} />
            </Button>
          )}
          {onShare && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onShare(data.id)}
              className="text-slate hover:text-slate-lighter"
            >
              <Share2 size={16} />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {type === "message" && (data as Message).temporary && (
            <ExpirationDisplay
              expiresAt={(data as Message).temporary!.expiresAt}
            />
          )}
          {type === "poll" && (
            <ExpirationDisplay
              expiresAt={(data as Poll).endsAt}
              showIcon={false}
            />
          )}
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowConfirmDelete(true)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-navy border border-navy-light rounded-xl p-6 max-w-sm w-full space-y-4">
              <h3 className="text-lg font-semibold text-slate-lighter">
                Confirm Delete
              </h3>
              <p className="text-slate">
                Are you sure you want to delete this {type}? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
