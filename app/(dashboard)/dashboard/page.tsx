"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/card";
import { DailyPrompt } from "../components/daily-prompt";
import {
  MessageCircle,
  Clock,
  Lock,
  Image as ImageIcon,
  BarChart2,
} from "lucide-react";

interface Stats {
  messages: {
    total: number;
    temporary: number;
    withPassword: number;
    withImage: number;
  };
  polls: {
    active: number;
    totalVotes: number;
  };
  prompts: {
    responses: number;
    engagement: string;
  };
}

export default function DashboardPage() {
  const [stats] = useState<Stats>({
    messages: {
      total: 128,
      temporary: 45,
      withPassword: 23,
      withImage: 34,
    },
    polls: {
      active: 3,
      totalVotes: 350,
    },
    prompts: {
      responses: 42,
      engagement: "87%",
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-lighter">Welcome back!</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Total Messages"
          value={stats.messages.total.toString()}
          change="+12%"
          trend="up"
          icon={MessageCircle}
        />
        <Card
          title="Active Polls"
          value={stats.polls.active.toString()}
          change="+1"
          trend="up"
          icon={BarChart2}
        />
        <Card
          title="Prompt Engagement"
          value={stats.prompts.engagement}
          change="-2%"
          trend="down"
        />
      </div>

      {/* Message Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-navy border border-navy-light rounded-xl"
        >
          <h2 className="text-xl font-semibold text-slate-lighter mb-6">
            Message Breakdown
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate">
                <Clock size={16} />
                <span>Temporary Messages</span>
              </div>
              <span className="text-slate-lighter">
                {stats.messages.temporary}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate">
                <Lock size={16} />
                <span>Password Protected</span>
              </div>
              <span className="text-slate-lighter">
                {stats.messages.withPassword}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate">
                <ImageIcon size={16} />
                <span>With Images</span>
              </div>
              <span className="text-slate-lighter">
                {stats.messages.withImage}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Daily Prompt Component */}
        <DailyPrompt />
      </div>
    </div>
  );
}
