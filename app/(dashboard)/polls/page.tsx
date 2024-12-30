"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  Plus,
  Calendar,
  Users,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Button from "@/app/components/ui/button";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  status: "active" | "ended";
  createdAt: string;
  endsAt?: string;
}

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      question: "What feature should we build next?",
      options: [
        { id: "1", text: "Voice messages", votes: 150 },
        { id: "2", text: "Group chats", votes: 120 },
        { id: "3", text: "Custom themes", votes: 80 },
      ],
      totalVotes: 350,
      status: "active",
      createdAt: "2024-02-20",
      endsAt: "2024-03-20",
    },
    {
      id: "2",
      question: "How often do you use our platform?",
      options: [
        { id: "1", text: "Daily", votes: 200 },
        { id: "2", text: "Weekly", votes: 150 },
        { id: "3", text: "Monthly", votes: 50 },
      ],
      totalVotes: 400,
      status: "ended",
      createdAt: "2024-01-15",
      endsAt: "2024-02-15",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);

  const handleEndPoll = (pollId: string) => {
    setPolls(
      polls.map((poll) =>
        poll.id === pollId ? { ...poll, status: "ended" } : poll
      )
    );
  };

  const handleDeletePoll = (pollId: string) => {
    setPolls(polls.filter((poll) => poll.id !== pollId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-lighter">Polls</h1>
          <p className="text-slate mt-1">Create and manage your polls</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Create Poll
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {polls.map((poll) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              key={poll.id}
              className="p-6 bg-navy border border-navy-light rounded-xl group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-lighter">
                    {poll.question}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{poll.totalVotes} votes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Ends {poll.endsAt}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        poll.status === "active"
                          ? "bg-teal/10 text-teal"
                          : "bg-slate/10 text-slate"
                      }`}
                    >
                      {poll.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {poll.status === "active" && (
                    <button
                      onClick={() => handleEndPoll(poll.id)}
                      className="p-2 hover:bg-navy-light rounded-lg transition-colors text-slate"
                      title="End Poll"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedPoll(poll.id)}
                    className="p-2 hover:bg-navy-light rounded-lg transition-colors text-slate"
                    title="Edit Poll"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePoll(poll.id)}
                    className="p-2 hover:bg-navy-light rounded-lg transition-colors text-slate"
                    title="Delete Poll"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {poll.options.map((option) => (
                  <div key={option.id} className="relative">
                    <div className="h-10 bg-navy-light rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(option.votes / poll.totalVotes) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-teal/10"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-slate-lighter">{option.text}</span>
                      <span className="text-slate font-medium">
                        {Math.round((option.votes / poll.totalVotes) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* TODO: Add Create Poll Modal */}
      {/* TODO: Add Edit Poll Modal */}
    </div>
  );
}
