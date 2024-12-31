"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Check } from "lucide-react";
import Button from "@/app/components/ui/button";
import { toast } from "sonner";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollVoteProps {
  pollId: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endsAt: string;
  hasVoted?: boolean;
  onVote: (optionId: string) => Promise<void>;
}

export function PollVote({
  pollId,
  question,
  options,
  totalVotes,
  endsAt,
  hasVoted,
  onVote,
}: PollVoteProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!selectedOption) return;

    try {
      setIsVoting(true);
      await onVote(selectedOption);
      toast.success("Vote recorded successfully!");
    } catch (error) {
      toast.error("Failed to record vote");
    } finally {
      setIsVoting(false);
    }
  };

  const getVotePercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="p-6 bg-navy border border-navy-light rounded-xl">
      <h3 className="text-xl font-semibold text-slate-lighter mb-4">
        {question}
      </h3>

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !hasVoted && setSelectedOption(option.id)}
            disabled={hasVoted}
            className={`w-full p-4 rounded-lg border transition-all relative overflow-hidden ${
              hasVoted
                ? "border-navy-light cursor-default"
                : "border-navy-lighter hover:border-teal cursor-pointer"
            } ${selectedOption === option.id ? "border-teal" : ""}`}
          >
            {/* Progress Bar Background */}
            <div
              className="absolute inset-0 bg-navy-lighter opacity-10"
              style={{
                width: `${getVotePercentage(option.votes)}%`,
                transition: "width 0.5s ease-out",
              }}
            />

            {/* Option Content */}
            <div className="relative flex items-center justify-between">
              <span className="text-slate-lighter">{option.text}</span>
              {hasVoted && (
                <span className="text-slate">
                  {getVotePercentage(option.votes)}%
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-slate">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Users size={14} />
            {totalVotes} votes
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            Ends {new Date(endsAt).toLocaleDateString()}
          </span>
        </div>

        {!hasVoted && (
          <Button
            onClick={handleVote}
            disabled={!selectedOption || isVoting}
            loading={isVoting}
            className="flex items-center gap-2"
          >
            <Check size={16} />
            Submit Vote
          </Button>
        )}
      </div>
    </div>
  );
}
