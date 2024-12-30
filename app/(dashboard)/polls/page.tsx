"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, Plus } from "lucide-react";
import Button from "@/app/components/ui/button";

interface Poll {
  id: string;
  question: string;
  totalVotes: number;
  options: { text: string; votes: number }[];
  status: "active" | "ended";
}

export default function PollsPage() {
  const [polls] = useState<Poll[]>([
    {
      id: "1",
      question: "What feature should we build next?",
      options: [
        { text: "Voice messages", votes: 150 },
        { text: "Group chats", votes: 120 },
        { text: "Custom themes", votes: 80 },
      ],
      totalVotes: 350,
      status: "active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-lighter">Polls</h1>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Create Poll
        </Button>
      </div>

      <div className="space-y-4">
        {polls.map((poll) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={poll.id}
            className="p-6 bg-navy border border-navy-light rounded-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-lighter">
                  {poll.question}
                </h3>
                <span className="text-sm text-slate">
                  {poll.totalVotes} votes • {poll.status}
                </span>
              </div>
              <BarChart2 size={20} className="text-teal" />
            </div>

            <div className="space-y-3">
              {poll.options.map((option, index) => (
                <div key={index} className="relative">
                  <div className="h-10 bg-navy-light rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-teal/10"
                      style={{
                        width: `${(option.votes / poll.totalVotes) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className="text-slate-lighter">{option.text}</span>
                    <span className="text-slate">
                      {Math.round((option.votes / poll.totalVotes) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
