"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Search,
  Filter,
  Trash2,
  Star,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import Button from "@/app/components/ui/button";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "If you are this so good, why are you not on the leaderboard?",
      timestamp: "2 hours ago",
      read: false,
      starred: false,
    },
    {
      id: "2",
      content: "sapa bien merci!",
      timestamp: "1 day ago",
      read: true,
      starred: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");

  const filteredMessages = messages
    .filter((message) => {
      if (filter === "unread") return !message.read;
      if (filter === "starred") return message.starred;
      return true;
    })
    .filter((message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleMarkAsRead = (id: string) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const handleToggleStar = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const handleDeleteSelected = () => {
    setMessages(messages.filter((msg) => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-lighter">Messages</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 bg-navy border border-navy-light rounded-lg text-slate-lighter focus:outline-none focus:border-teal transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-slate" size={18} />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2 hover:bg-navy-light rounded-lg transition-colors"
            >
              <Filter size={18} className="text-slate" />
            </button>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-navy border border-navy-light rounded-lg shadow-lg py-2"
              >
                <button
                  onClick={() => {
                    setFilter("all");
                    setFilterOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-slate-lighter hover:bg-navy-light transition-colors"
                >
                  All Messages
                </button>
                <button
                  onClick={() => {
                    setFilter("unread");
                    setFilterOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-slate-lighter hover:bg-navy-light transition-colors"
                >
                  Unread
                </button>
                <button
                  onClick={() => {
                    setFilter("starred");
                    setFilterOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-slate-lighter hover:bg-navy-light transition-colors"
                >
                  Starred
                </button>
              </motion.div>
            )}
          </div>
          {selectedMessages.length > 0 && (
            <Button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete ({selectedMessages.length})
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              key={message.id}
              className="p-4 bg-navy border border-navy-light rounded-xl group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMessages([...selectedMessages, message.id]);
                      } else {
                        setSelectedMessages(
                          selectedMessages.filter((id) => id !== message.id)
                        );
                      }
                    }}
                    className="mt-1.5"
                  />
                  <div>
                    <p className="text-slate-lighter">{message.content}</p>
                    <span className="text-sm text-slate">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleStar(message.id)}
                    className={`p-1 rounded hover:bg-navy-light transition-colors ${
                      message.starred ? "text-yellow-400" : "text-slate"
                    }`}
                  >
                    <Star size={16} />
                  </button>
                  {!message.read && (
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="p-1 rounded hover:bg-navy-light transition-colors text-slate"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  )}
                  <button className="p-1 rounded hover:bg-navy-light transition-colors text-slate">
                    <MoreVertical size={16} />
                  </button>
                </div>
                {!message.read && (
                  <span className="w-2 h-2 rounded-full bg-teal"></span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
