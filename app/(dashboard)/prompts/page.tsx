"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  Plus,
  ThumbsUp,
  Search,
  Filter,
} from "lucide-react";
import Button from "@/app/components/ui/button";

interface Prompt {
  id: string;
  question: string;
  date: string;
  responses: number;
  likes: number;
  expiresIn: string;
  status: "active" | "ended";
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "ended">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPrompts([
          {
            id: "1",
            question:
              "What's your biggest dream that you've never told anyone about?",
            date: new Date().toLocaleDateString(),
            responses: 42,
            likes: 156,
            expiresIn: "23:45:30",
            status: "active",
          },
          // ... other prompts
        ]);
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-lighter">Daily Prompts</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-navy border border-navy-light rounded-lg text-slate-lighter placeholder-slate focus:outline-none focus:border-teal"
            />
            <Search className="absolute left-3 top-2.5 text-slate" size={18} />
          </div>
          <Button
            variant="secondary"
            onClick={() => setFilter(filter === "all" ? "active" : "all")}
            className="flex items-center gap-2"
          >
            <Filter size={18} />
            {filter === "all" ? "All Prompts" : "Active Only"}
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Create Prompt
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
                <p className="text-slate">Loading prompts...</p>
              </div>
            </motion.div>
          ) : prompts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center">
                  <Sparkles size={32} className="text-slate" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-lighter">
                    No prompts yet
                  </h3>
                  <p className="text-slate max-w-sm">
                    Create your first daily prompt to spark meaningful
                    conversations.
                  </p>
                </div>
                <Button onClick={() => setShowCreateModal(true)}>
                  Create First Prompt
                </Button>
              </div>
            </motion.div>
          ) : (
            prompts.map((prompt) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-navy border border-navy-light rounded-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate">
                      <Calendar size={14} />
                      <span>{prompt.date}</span>
                      <Clock size={14} className="ml-2" />
                      <span>Expires in {prompt.expiresIn}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        prompt.status === "active"
                          ? "bg-teal/10 text-teal"
                          : "bg-slate/10 text-slate"
                      }`}
                    >
                      {prompt.status === "active" ? "Active" : "Ended"}
                    </span>
                  </div>

                  <p className="text-xl text-slate-lighter">
                    {prompt.question}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate">
                      <div className="flex items-center gap-2">
                        <MessageCircle size={16} />
                        <span>{prompt.responses} responses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp size={16} />
                        <span>{prompt.likes} likes</span>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        // View responses
                      }}
                    >
                      View Responses
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add CreatePromptModal component here */}
    </div>
  );
}
