"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import Button from "@/app/components/ui/button";

interface PollModalProps {
  isOpen: boolean;
  initialData?: Poll;
  onClose: () => void;
  onSubmit: (poll: Omit<Poll, "id" | "totalVotes">) => void;
}

export function PollModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: PollModalProps) {
  const [question, setQuestion] = useState(initialData?.question || "");
  const [options, setOptions] = useState<{ id: string; text: string }[]>(
    initialData?.options.map((o) => ({ id: o.id, text: o.text })) || [
      { id: "1", text: "" },
      { id: "2", text: "" },
    ]
  );
  const [endsAt, setEndsAt] = useState(initialData?.endsAt || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least 2 options
    if (options.length < 2) {
      toast.error("Please add at least 2 options");
      return;
    }

    // Validate no empty options
    if (options.some((o) => !o.text.trim())) {
      toast.error("Please fill in all options");
      return;
    }

    onSubmit({
      question,
      options: options.map((o) => ({
        ...o,
        votes: initialData?.options.find((opt) => opt.id === o.id)?.votes || 0,
      })),
      status: "active",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      endsAt,
    });
    onClose();
  };

  const addOption = () => {
    setOptions([...options, { id: String(options.length + 1), text: "" }]);
  };

  const removeOption = (id: string) => {
    setOptions(options.filter((o) => o.id !== id));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Poll" : "Create Poll"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate mb-1">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-navy-light border border-navy-light rounded-lg px-4 py-2 text-slate-lighter focus:outline-none focus:border-teal"
            placeholder="Enter your question"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate mb-1">
            Options
          </label>
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.id} className="flex gap-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    setOptions(
                      options.map((o) =>
                        o.id === option.id ? { ...o, text: e.target.value } : o
                      )
                    )
                  }
                  className="flex-1 bg-navy-light border border-navy-light rounded-lg px-4 py-2 text-slate-lighter focus:outline-none focus:border-teal"
                  placeholder={`Option ${option.id}`}
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
                    className="p-2 hover:bg-navy-light rounded-lg transition-colors text-slate"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            className="mt-2 text-sm text-teal hover:text-teal/80 transition-colors flex items-center gap-1"
          >
            <Plus size={16} />
            Add Option
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="w-full bg-navy-light border border-navy-light rounded-lg px-4 py-2 text-slate-lighter focus:outline-none focus:border-teal"
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Save Changes" : "Create Poll"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
