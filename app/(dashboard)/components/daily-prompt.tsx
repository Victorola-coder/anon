"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/ui/button";
import { Calendar, MessageCircle, Clock } from "lucide-react";
import { PromptResponseModal } from "./prompt-response-modal";

export function DailyPrompt() {
  const [prompt] = useState<Prompt>({
    id: "1",
    question: "What's your biggest dream that you've never told anyone about?",
    date: new Date().toLocaleDateString(),
    responses: 42,
    expiresIn: "23:45:30",
  });

  const [showResponseModal, setShowResponseModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-navy border border-navy-light rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-lighter">
            Daily Prompt
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate">
            <Calendar size={14} />
            <span>{prompt.date}</span>
            <Clock size={14} className="ml-2" />
            <span>Expires in {prompt.expiresIn}</span>
          </div>
        </div>

        <p className="text-xl text-slate-lighter mb-6">{prompt.question}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate">
            <MessageCircle size={16} />
            <span>{prompt.responses} responses</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowResponseModal(true)}
          >
            Respond Anonymously
          </Button>
        </div>
      </motion.div>

      <PromptResponseModal
        isOpen={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        prompt={prompt}
      />
    </>
  );
}
