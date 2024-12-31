"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Lock, Palette } from "lucide-react";
import Button from "@/app/components/ui/button";
import { AppearanceSettings } from "../components/appearance-settings";

const settingsSections = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: User,
    description: "Manage your profile information and preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Configure how you receive notifications",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Lock,
    description: "Control your privacy settings and security options",
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize the look and feel of your dashboard",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "appearance":
        return <AppearanceSettings />;
      // Add other cases for different sections
      default:
        return (
          <div className="text-slate">This section is under development</div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-lighter">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveSection(section.id)}
                className={`w-full p-4 rounded-xl text-left transition-colors ${
                  activeSection === section.id
                    ? "bg-teal/10 text-teal"
                    : "text-slate hover:bg-navy-light"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{section.title}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="md:col-span-2 p-6 bg-navy border border-navy-light rounded-xl">
          <h2 className="text-xl font-semibold text-slate-lighter mb-4">
            {settingsSections.find((s) => s.id === activeSection)?.title}
          </h2>
          <p className="text-slate mb-6">
            {settingsSections.find((s) => s.id === activeSection)?.description}
          </p>
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
