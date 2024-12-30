"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Clock,
  Image as ImageIcon,
  Lock,
  Eye,
  Share2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import Button from "@/app/components/ui/button";
import { ImageUpload } from "@/app/components/ui/image-upload";

interface MessageOptions {
  isTemporary: boolean;
  expiresIn: string;
  hasPassword: boolean;
  password: string;
  allowReplies: boolean;
  notifyOnRead: boolean;
  hasImage: boolean;
}

export default function UserPublicPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState<MessageOptions>({
    isTemporary: false,
    expiresIn: "24",
    hasPassword: false,
    password: "",
    allowReplies: true,
    notifyOnRead: false,
    hasImage: false,
  });

  const params = useParams();
  const username = params.username as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (options.hasPassword && options.password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate file upload if image exists
      if (selectedImage) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully!");
      // Reset form
      setMessage("");
      setSelectedImage(null);
      setOptions({
        isTemporary: false,
        expiresIn: "24",
        hasPassword: false,
        password: "",
        allowReplies: true,
        notifyOnRead: false,
        hasImage: false,
      });
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Send message to @${username}`,
          text: `Send an anonymous message to @${username}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  return (
    <main className="min-h-screen bg-navy-dark">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* User Profile Section */}
          <div className="text-center">
            <div className="w-24 h-24 bg-teal/10 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl text-teal">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-lighter">
              @{username}
            </h1>
            <p className="text-slate mt-2">Send me an anonymous message!</p>
            <button
              onClick={handleShare}
              className="mt-4 flex items-center gap-2 mx-auto text-sm text-slate hover:text-teal transition-colors"
            >
              <Share2 size={16} />
              Share Profile
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your anonymous message..."
                className="w-full h-32 bg-navy border border-navy-light rounded-xl px-4 py-3 text-slate-lighter focus:outline-none focus:border-teal resize-none"
                maxLength={500}
                required
              />
              <div className="flex justify-end mt-1">
                <span
                  className={`text-sm ${
                    message.length > 450 ? "text-yellow-400" : "text-slate"
                  }`}
                >
                  {message.length}/500
                </span>
              </div>
            </div>

            <div className="space-y-4 bg-navy border border-navy-light rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate" />
                  <span className="text-sm text-slate">Message options</span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? "Hide" : "Show"}
                </Button>
              </div>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-4 border-t border-navy-light"
                  >
                    {/* Image Upload Option */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon size={16} className="text-slate" />
                        <span className="text-sm text-slate">Add image</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={options.hasImage}
                          onChange={(e) => {
                            setOptions({
                              ...options,
                              hasImage: e.target.checked,
                              isTemporary: e.target.checked
                                ? true
                                : options.isTemporary,
                            });
                            if (!e.target.checked) setSelectedImage(null);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-navy-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate after:border-slate after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                      </label>
                    </div>

                    {/* Show ImageUpload only if hasImage is true */}
                    <AnimatePresence>
                      {options.hasImage && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <ImageUpload onImageSelect={setSelectedImage} />
                          {options.hasImage && !options.isTemporary && (
                            <div className="mt-2 flex items-center gap-2 text-yellow-400">
                              <AlertCircle size={14} />
                              <span className="text-sm">
                                Messages with images will automatically be
                                temporary
                              </span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Temporary Message Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate" />
                        <span className="text-sm text-slate">
                          Make temporary
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={options.isTemporary}
                          disabled={options.hasImage}
                          onChange={(e) =>
                            setOptions({
                              ...options,
                              isTemporary: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-navy-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate after:border-slate after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                      </label>
                    </div>

                    {/* Conditional Options */}
                    <AnimatePresence>
                      {(options.isTemporary || options.hasPassword) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          {options.isTemporary && (
                            <div>
                              <label className="block text-sm text-slate mb-2">
                                Expires in
                              </label>
                              <select
                                value={options.expiresIn}
                                onChange={(e) =>
                                  setOptions({
                                    ...options,
                                    expiresIn: e.target.value,
                                  })
                                }
                                className="w-full bg-navy-light border border-navy-light rounded-lg px-3 py-2 text-slate-lighter focus:outline-none focus:border-teal"
                              >
                                <option value="1">1 hour</option>
                                <option value="24">24 hours</option>
                                <option value="48">48 hours</option>
                                <option value="168">1 week</option>
                              </select>
                            </div>
                          )}

                          {options.hasPassword && (
                            <div>
                              <label className="block text-sm text-slate mb-2">
                                Password
                              </label>
                              <input
                                type="password"
                                value={options.password}
                                onChange={(e) =>
                                  setOptions({
                                    ...options,
                                    password: e.target.value,
                                  })
                                }
                                placeholder="Enter password"
                                className="w-full bg-navy-light border border-navy-light rounded-lg px-3 py-2 text-slate-lighter focus:outline-none focus:border-teal"
                                minLength={4}
                              />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Password Protection */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock size={16} className="text-slate" />
                        <span className="text-sm text-slate">Add password</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={options.hasPassword}
                          onChange={(e) =>
                            setOptions({
                              ...options,
                              hasPassword: e.target.checked,
                              password: e.target.checked
                                ? options.password
                                : "",
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-navy-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate after:border-slate after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                      </label>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageCircle size={16} className="text-slate" />
                          <span className="text-sm text-slate">
                            Allow replies
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={options.allowReplies}
                            onChange={(e) =>
                              setOptions({
                                ...options,
                                allowReplies: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-navy-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate after:border-slate after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye size={16} className="text-slate" />
                          <span className="text-sm text-slate">
                            Notify on read
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={options.notifyOnRead}
                            onChange={(e) =>
                              setOptions({
                                ...options,
                                notifyOnRead: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-navy-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate after:border-slate after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              disabled={
                !message.trim() ||
                isLoading ||
                (options.hasImage && !selectedImage)
              }
              loading={isLoading}
              className="w-full"
            >
              Send Anonymously
            </Button>
          </form>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-navy border border-navy-light rounded-xl">
              <h3 className="text-lg font-semibold text-slate-lighter mb-2">
                100% Anonymous
              </h3>
              <p className="text-slate text-sm">
                Your identity remains completely private when sending messages.
              </p>
            </div>
            <div className="p-4 bg-navy border border-navy-light rounded-xl">
              <h3 className="text-lg font-semibold text-slate-lighter mb-2">
                Safe & Secure
              </h3>
              <p className="text-slate text-sm">
                All messages are encrypted and handled with strict privacy
                measures.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
