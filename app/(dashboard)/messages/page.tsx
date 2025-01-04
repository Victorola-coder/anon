"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Search,
  Filter,
  Trash2,
  Star,
  MoreVertical,
  Clock,
  Image as ImageIcon,
  Lock,
  InboxIcon,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import Button from "@/app/components/ui/button";
import { Modal } from "@/app/components/ui/modal";
import { ANON_SERVER_URL } from "@/app/constants";
import { useRouter } from "next-nprogress-bar";

export default function MessagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [pageLoaded, setPageLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      // TODO: simulate API call to verify username exists when integrating with backend
      const loadUserProfile = async () => {
        try {
          // simulate API call to verify username exists
          const user = localStorage.getItem("user");
          const token = localStorage.getItem("token");
          setUser(JSON.parse(user as string));
          setToken(JSON.parse(token as string));

          console.log({ user, token });

          if (user && token) {
            toast.success("User exists");
          } else {
            toast.error("User does not exist");
            // router.push("/signin");
          }

          // If we get here, user exists
        } catch (err) {
          toast.error("User does not exist");
        }
      };
      loadUserProfile();
    }

    setPageLoaded(!pageLoaded);
  }, [pageLoaded]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${ANON_SERVER_URL}/api/messages/get`);
        const messageResponse = await response.json();
        setMessages(messageResponse.data.messages);
      } catch (error) {
        toast.error("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMessageClick = (message: Message) => {
    if (message.hasPassword && !message.isRead) {
      setSelectedMessage(message);
      setShowPasswordModal(true);
    } else if (message.image) {
      setSelectedMessage(message);
      setShowImageModal(true);
    } else {
      setSelectedMessage(message);
      setShowContentModal(true);
    }

    if (!message.isRead) {
      markAsRead(message._id);
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg._id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const toggleStar = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg._id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
    toast.success("Message starred");
  };

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg._id !== messageId));
    toast.success("Message deleted");
  };

  const handlePasswordSubmit = () => {
    if (selectedMessage?.password === passwordInput) {
      markAsRead(selectedMessage._id);
      setShowPasswordModal(false);
      setShowContentModal(true);
      setPasswordInput("");
      toast.success("Message unlocked");
    } else {
      toast.error("Incorrect password");
    }
  };

  const downloadImage = async (imageUrl: string, messageId: string) => {
    try {
      setLoadingStates((prev) => ({
        ...prev,
        [`download-${messageId}`]: true,
      }));

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `message-${messageId}.jpg`; // or .png depending on image type
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Image downloaded successfully");
    } catch (error) {
      toast.error("Failed to download image");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`download-${messageId}`]: false,
      }));
    }
  };

  const downloadMessageAsImage = async (messageId: string) => {
    try {
      setLoadingStates((prev) => ({
        ...prev,
        [`download-${messageId}`]: true,
      }));

      const messageElement = document.getElementById(`message-${messageId}`);
      if (!messageElement) {
        throw new Error("Message element not found");
      }

      // Create a clone with fixed dimensions
      const cloneElement = messageElement.cloneNode(true) as HTMLElement;

      // Set fixed dimensions and styling
      Object.assign(cloneElement.style, {
        width: "400px",
        height: "400px",
        background: "#0F1729",
        padding: "40px",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
      });

      // Create a wrapper for content and watermark
      const wrapper = document.createElement("div");
      Object.assign(wrapper.style, {
        position: "relative",
        width: "100%",
        height: "100%",
      });

      // Move original content into wrapper
      wrapper.innerHTML = cloneElement.innerHTML;
      cloneElement.innerHTML = "";
      cloneElement.appendChild(wrapper);

      // Add watermark with stronger styling
      const watermark = document.createElement("div");
      Object.assign(watermark.style, {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        color: "rgba(148, 163, 184, 0.7)", // More visible
        fontSize: "16px",
        fontFamily: "montserrat, system-ui, sans-serif",
        padding: "8px 12px",
        background: "rgba(15, 23, 41, 0.8)", // Semi-transparent background
        borderRadius: "6px",
        backdropFilter: "blur(4px)",
        zIndex: "50",
        pointerEvents: "none",
        userSelect: "none",
      });
      watermark.textContent = "anon.victorola.me";
      wrapper.appendChild(watermark);

      // Add to DOM temporarily
      document.body.appendChild(cloneElement);

      // Create canvas with fixed dimensions
      const canvas = await html2canvas(cloneElement, {
        backgroundColor: "#0F1729",
        scale: 2,
        width: 400,
        height: 400,
        logging: false,
        onclone: (doc) => {
          // Ensure watermark is visible in the clone
          const clonedWatermark = doc.querySelector(
            "[data-watermark]"
          ) as HTMLElement;
          if (clonedWatermark) {
            Object.assign(clonedWatermark.style, {
              opacity: "1",
              visibility: "visible",
            });
          }
        },
      });

      // Remove the clone
      document.body.removeChild(cloneElement);

      // Convert and download
      const url = canvas.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = url;
      a.download = `message-${messageId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success("Message downloaded as image");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download message");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`download-${messageId}`]: false,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-lighter">Messages</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              placeholder="Search messages..."
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-navy border border-navy-light rounded-lg text-slate-lighter placeholder-slate focus:outline-none focus:border-teal"
            />
            <Search className="absolute left-3 top-2.5 text-slate" size={18} />
          </div>
          <Button
            variant="secondary"
            onClick={() => setFilter(filter === "all" ? "unread" : "all")}
            className="flex items-center gap-2"
          >
            <Filter size={18} />
            {filter === "all" ? "All Messages" : "Unread Only"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
                <p className="text-slate">Loading messages...</p>
              </div>
            </motion.div>
          ) : messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center">
                  <InboxIcon size={32} className="text-slate" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-lighter">
                    No messages yet
                  </h3>
                  <p className="text-slate max-w-sm">
                    Share your profile link with others to start receiving
                    anonymous messages.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    // Open share modal
                  }}
                >
                  Share Profile
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages
                .filter((msg) => {
                  if (filter === "unread") return !msg.isRead;
                  if (filter === "starred") return msg.isStarred;
                  return true;
                })
                .filter((msg) =>
                  msg.content.toLowerCase().includes(search.toLowerCase())
                )
                .map((message) => (
                  <motion.div
                    key={message._id}
                    id={`message-${message._id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full aspect-square p-6 bg-navy border rounded-xl cursor-pointer hover:border-teal transition-colors"
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="h-full flex flex-col">
                      <span className="w-fit inline-block px-2 py-1 text-xs rounded-full bg-navy-light text-slate mb-3">
                        {message.type}
                      </span>

                      <div className="flex-1 overflow-hidden">
                        {message.hasPassword && !message.isRead ? (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                              <Lock
                                size={24}
                                className="text-slate mb-2 mx-auto"
                              />
                              <p className="text-slate text-sm">
                                Password Protected
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMessage(message);
                                  setShowPasswordModal(true);
                                }}
                                className="mt-4 px-4 py-2 bg-navy-light rounded-lg text-slate-lighter hover:bg-navy-lighter transition-colors"
                              >
                                Unlock Message
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col">
                            {message.image && (
                              <div className="mb-4 relative w-full h-[200px] rounded-lg overflow-hidden bg-navy-light group">
                                <img
                                  src={message.image}
                                  alt="Message attachment"
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <ImageIcon className="text-white" size={24} />
                                </div>
                              </div>
                            )}
                            <p className="text-slate-lighter">
                              {message.content}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-navy-light">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-slate">
                            {message.createdAt.toLocaleString()}
                          </span>
                          {!message.isRead && (
                            <span className="inline-flex items-center gap-1 text-teal text-sm">
                              <Eye size={14} />
                              New
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate text-sm">
                            {message.isTemporary && <Clock size={14} />}
                            {message.hasPassword && <Lock size={14} />}
                            {message.image && <ImageIcon size={14} />}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (loadingStates[`star-${message._id}`])
                                  return;
                                toggleStar(message._id);
                              }}
                              disabled={loadingStates[`star-${message._id}`]}
                              className={`p-2 rounded-lg ${
                                message.isStarred
                                  ? "text-yellow-500"
                                  : "text-slate hover:text-slate-lighter"
                              }`}
                            >
                              {loadingStates[`star-${message._id}`] ? (
                                <div className="animate-spin h-4 w-4 border-2 border-slate rounded-full border-t-transparent" />
                              ) : (
                                <Star size={18} />
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (loadingStates[`delete-${message._id}`])
                                  return;
                                deleteMessage(message._id);
                              }}
                              disabled={loadingStates[`delete-${message._id}`]}
                              className="p-2 rounded-lg text-slate hover:text-slate-lighter"
                            >
                              {loadingStates[`delete-${message._id}`] ? (
                                <div className="animate-spin h-4 w-4 border-2 border-slate rounded-full border-t-transparent" />
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (loadingStates[`download-${message._id}`])
                                  return;
                                downloadMessageAsImage(message._id);
                              }}
                              disabled={
                                loadingStates[`download-${message._id}`]
                              }
                              className="p-2 rounded-lg text-slate hover:text-slate-lighter"
                            >
                              {loadingStates[`download-${message._id}`] ? (
                                <div className="animate-spin h-4 w-4 border-2 border-slate rounded-full border-t-transparent" />
                              ) : (
                                <Download size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordInput("");
        }}
        title="Unlock Protected Message"
      >
        <div className="space-y-4">
          <div className="bg-navy-light/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2 text-teal">
              <Lock size={20} />
              <span className="font-medium">Password Required</span>
            </div>
            <p className="text-slate">
              Enter the message password to view its contents.
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 bg-navy-light border border-navy-lighter rounded-lg text-slate-lighter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit();
                }
              }}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordInput("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              className="flex items-center gap-2"
            >
              <Lock size={16} />
              Unlock Message
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title="Message Image"
      >
        <div className="space-y-4">
          {selectedMessage?.image && (
            <div className="space-y-4">
              <img
                src={selectedMessage.image}
                alt="Message attachment"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-slate-lighter text-lg">
                {selectedMessage.content}
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    selectedMessage?.image &&
                    downloadImage(selectedMessage.image, selectedMessage._id)
                  }
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Image
                </Button>
                <Button onClick={() => setShowImageModal(false)}>Close</Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={showContentModal}
        onClose={() => setShowContentModal(false)}
        title={selectedMessage?.type || "Message"}
      >
        <div className="space-y-4">
          {selectedMessage && (
            <div className="bg-navy border border-navy-light rounded-xl p-6">
              {selectedMessage.image && (
                <div className="relative group mb-4">
                  <img
                    src={selectedMessage.image}
                    alt="Message attachment"
                    className="w-full rounded-lg cursor-zoom-in transition-transform hover:scale-[1.02]"
                    onClick={() => {
                      setShowImageModal(true);
                      setShowContentModal(false);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <ImageIcon className="text-white" size={24} />
                  </div>
                </div>
              )}

              <p className="text-slate-lighter whitespace-pre-wrap text-lg">
                {selectedMessage.content}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-navy-light pt-4">
                <div className="flex items-center gap-3 text-sm text-slate">
                  <span>{selectedMessage.createdAt.toLocaleString()}</span>
                  {selectedMessage.isTemporary && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Expires soon
                    </span>
                  )}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => downloadMessageAsImage(selectedMessage._id)}
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
