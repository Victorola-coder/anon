"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Search, Filter } from "lucide-react";

interface Message {
  id: string;
  read: boolean;
  content: string;
  timestamp: string;
}

export default function MessagesPage() {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey, I really like your content!",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      content: "Would you be interested in collaboration?",
      timestamp: "1 day ago",
      read: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-lighter">Messages</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 bg-navy border border-navy-light rounded-lg text-slate-lighter focus:outline-none focus:border-teal"
            />
            <Search className="absolute left-3 top-2.5 text-slate" size={18} />
          </div>
          <button className="p-2 hover:bg-navy-light rounded-lg transition-colors">
            <Filter size={18} className="text-slate" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={message.id}
            className="p-4 bg-navy border border-navy-light rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <MessageCircle size={18} className="text-teal" />
                </div>
                <div>
                  <p className="text-slate-lighter">{message.content}</p>
                  <span className="text-sm text-slate">
                    {message.timestamp}
                  </span>
                </div>
              </div>
              {!message.read && (
                <span className="w-2 h-2 rounded-full bg-teal"></span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
