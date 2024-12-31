"use client";

import {
  Eye,
  Clock,
  Lock,
  Share2,
  EyeOff,
  BarChart2,
  AlertCircle,
  MessageCircle,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Button from "@/app/components/ui/button";
import { ShareModal } from "../components/share-modal";
import { AnonymousPollForm } from "../components/poll";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/app/components/ui/image-upload";
import { PasswordStrength } from "../components/password-strength";
import { ExpirationPicker } from "../components/expiration-picker";
import { MessagePreviewModal } from "../components/message-preview-modal";
import { formatExpirationTime, getTimeZoneAbbr } from "@/app/lib/timezone";
import Link from "next/link";

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
  const [showPreview, setShowPreview] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [mode, setMode] = useState<"message" | "poll">("message");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    message?: string;
    password?: string;
  }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    // TODO: simulate API call to verify username exists when integrating with backend
    const loadUserProfile = async () => {
      try {
        // simulate API call to verify username exists
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // If we get here, user exists
        setIsPageLoading(false);
      } catch (err) {
        setError("User not found or profile is unavailable");
        setIsPageLoading(false);
      }
    };

    loadUserProfile();
  }, [username]);

  const validateForm = () => {
    const errors: typeof validationErrors = {};

    if (message.length < 1) {
      errors.message = "Message is required";
    }

    if (options.hasPassword && options.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (selectedImage) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      toast.success("Message sent successfully!");
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
        setShowShareModal(true);
      }
    } catch (error) {
      setShowShareModal(true); // fallback to modal if native share fails
    } finally {
      setShowShareModal(true);
    }
  };

  return (
    <main className="min-h-screen bg-navy-darker py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[80vh] flex items-center justify-center"
          >
            <div className="text-center space-y-8 w-full max-w-md">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/20 text-teal">
                <CheckCircle size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-lighter">
                  Message Sent Successfully!
                </h2>
                <p className="text-lg text-slate">
                  Want to receive anonymous messages too?
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button className="w-full">Create Your Profile</Button>
                </Link>
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setIsSuccess(false);
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
                  }}
                >
                  Send Another
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
                  <p className="text-slate mt-2">
                    Send me an anonymous message!
                  </p>
                  <button
                    onClick={handleShare}
                    className="mt-4 flex items-center gap-2 mx-auto text-sm text-slate hover:text-teal transition-colors"
                  >
                    <Share2 size={16} />
                    Share Profile
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button
                    type="button"
                    variant={mode === "message" ? "default" : "secondary"}
                    onClick={() => setMode("message")}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Send Message
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setMode("poll")}
                    className="flex items-center gap-2"
                    variant={mode === "poll" ? "default" : "secondary"}
                  >
                    <BarChart2 size={16} />
                    Create Poll
                  </Button>
                </div>

                {!isPageLoading && !error && !username && (
                  <div className="text-center space-y-4 p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-light text-slate">
                      <MessageCircle size={24} />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-lighter">
                      Profile Not Found
                    </h2>
                    <p className="text-slate">
                      This profile doesn't exist or may have been removed.
                    </p>
                    <Link href="/" className="inline-block mt-4">
                      <Button variant="secondary">Return Home</Button>
                    </Link>
                  </div>
                )}

                {!isPageLoading &&
                  !error &&
                  username &&
                  (mode === "message" ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <textarea
                          required
                          value={message}
                          maxLength={500}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your anonymous message..."
                          className="w-full h-32 bg-navy border border-navy-light rounded-xl px-4 py-3 text-slate-lighter focus:outline-none focus:border-teal resize-none"
                        />
                        <div className="flex justify-end mt-1">
                          <span
                            className={`text-sm ${
                              message.length > 450
                                ? "text-yellow-400"
                                : "text-slate"
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
                            <span className="text-sm text-slate">
                              Message options
                            </span>
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
                                  <span className="text-sm text-slate">
                                    Add image
                                  </span>
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
                                      if (!e.target.checked)
                                        setSelectedImage(null);
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
                                    <ImageUpload
                                      onImageSelect={setSelectedImage}
                                    />
                                    {options.hasImage &&
                                      !options.isTemporary && (
                                        <div className="mt-2 flex items-center gap-2 text-yellow-400">
                                          <AlertCircle size={14} />
                                          <span className="text-sm">
                                            Messages with images will
                                            automatically be temporary
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
                                {(options.isTemporary ||
                                  options.hasPassword) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4"
                                  >
                                    {options.isTemporary && (
                                      <div className="space-y-2">
                                        <label className="block text-sm text-slate mb-2">
                                          Message expires in
                                        </label>
                                        <ExpirationPicker
                                          value={options.expiresIn}
                                          onChange={(value) =>
                                            setOptions({
                                              ...options,
                                              expiresIn: value,
                                            })
                                          }
                                        />
                                        {options.expiresIn && (
                                          <p className="text-xs text-slate flex items-center gap-1.5">
                                            <Clock size={12} />
                                            Expires on{" "}
                                            {formatExpirationTime(
                                              parseFloat(options.expiresIn)
                                            )}{" "}
                                            {getTimeZoneAbbr()}
                                          </p>
                                        )}
                                      </div>
                                    )}

                                    {options.hasPassword && (
                                      <div className="space-y-2">
                                        <div className="relative">
                                          <input
                                            type={
                                              showPassword ? "text" : "password"
                                            }
                                            value={options.password}
                                            onChange={(e) =>
                                              setOptions({
                                                ...options,
                                                password: e.target.value,
                                              })
                                            }
                                            placeholder="Enter password"
                                            className="w-full bg-navy-light border border-navy-light rounded-lg pl-3 pr-10 py-2 text-slate-lighter focus:outline-none focus:border-teal"
                                            minLength={4}
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-slate-lighter"
                                          >
                                            {showPassword ? (
                                              <EyeOff size={16} />
                                            ) : (
                                              <Eye size={16} />
                                            )}
                                          </button>
                                        </div>
                                        <PasswordStrength
                                          password={options.password}
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
                                  <span className="text-sm text-slate">
                                    Add password
                                  </span>
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
                                    <MessageCircle
                                      size={16}
                                      className="text-slate"
                                    />
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

                      <div className="flex flex-col md:flex-row justify-between gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setShowPreview(true)}
                        >
                          Preview Message
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            !message.trim() ||
                            isLoading ||
                            (options.hasImage && !selectedImage)
                          }
                          loading={isLoading}
                        >
                          Send Anonymously
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <AnonymousPollForm username={username} />
                  ))}

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-navy border border-navy-light rounded-xl">
                    <h3 className="text-lg font-semibold text-slate-lighter mb-2">
                      100% Anonymous
                    </h3>
                    <p className="text-slate text-sm">
                      Your identity remains completely private when sending
                      messages.
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

                <MessagePreviewModal
                  isOpen={showPreview}
                  onClose={() => setShowPreview(false)}
                  message={message}
                  imagePreview={
                    selectedImage ? URL.createObjectURL(selectedImage) : null
                  }
                  options={{
                    ...options,
                    expirationTime: options.isTemporary
                      ? formatExpirationTime(parseFloat(options.expiresIn))
                      : undefined,
                  }}
                />

                <ShareModal
                  isOpen={showShareModal}
                  onClose={() => setShowShareModal(false)}
                  username={username}
                  url={window.location.href}
                />

                {error && (
                  <div className="bg-red-500/10 border border-red-500 rounded-xl p-4 text-center">
                    <p className="text-red-500">{error}</p>
                    <Button
                      variant="secondary"
                      onClick={() => window.location.reload()}
                      className="mt-4"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
