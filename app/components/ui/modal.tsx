"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative bg-navy border border-navy-light rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-navy-light scrollbar-track-transparent"
              >
                <div className="sticky top-0 bg-navy z-10 px-6 py-4 border-b border-navy-light">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-lighter">
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-navy-light rounded-lg transition-colors"
                    >
                      <X size={20} className="text-slate" />
                    </button>
                  </div>
                </div>
                <div className="p-6">{children}</div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
