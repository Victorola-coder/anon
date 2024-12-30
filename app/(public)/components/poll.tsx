"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Clock } from "lucide-react";
import Button from "@/app/components/ui/button";
import { toast } from "sonner";
import { ExpirationPicker } from "./expiration-picker";

interface AnonymousPollFormProps {
  username: string;
}

export function AnonymousPollForm({ username }: AnonymousPollFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [expiresIn, setExpiresIn] = useState("24");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Poll created successfully!");

      // Reset form
      setQuestion("");
      setOptions(["", ""]);
      setExpiresIn("24");
    } catch (error) {
      toast.error("Failed to create poll");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="w-full h-32 bg-navy border border-navy-light rounded-xl px-4 py-3 text-slate-lighter focus:outline-none focus:border-teal resize-none"
          maxLength={200}
          required
        />
        <div className="flex justify-end mt-1">
          <span className="text-sm text-slate">{question.length}/200</span>
        </div>
      </div>

      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              className="flex-1 bg-navy border border-navy-light rounded-lg px-4 py-2 text-slate-lighter focus:outline-none focus:border-teal"
              required
            />
            {options.length > 2 && (
              <Button
                size="sm"
                type="button"
                variant="danger"
                onClick={() => handleRemoveOption(index)}
              >
                <Minus size={16} />
              </Button>
            )}
          </div>
        ))}

        {options.length < 5 && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddOption}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Option
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-slate">Poll expires in</label>
        <ExpirationPicker value={expiresIn} onChange={setExpiresIn} />
      </div>

      <Button
        type="submit"
        disabled={
          !question.trim() || options.some((opt) => !opt.trim()) || isLoading
        }
        loading={isLoading}
        className="w-full"
      >
        Create Anonymous Poll
      </Button>
    </form>
  );
}
