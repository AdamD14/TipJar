"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { Heart, Palette } from "lucide-react";

const RoleCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  isSelected,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full p-6 text-left border-2 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
      isSelected
        ? "border-teal-400 bg-teal-500/20 shadow-lg shadow-teal-500/20"
        : "border-gray-700 bg-gray-800/50 hover:border-gray-500"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-full transition-colors ${
          isSelected ? "bg-teal-400" : "bg-gray-700"
        }`}
      >
        <Icon
          className={`w-6 h-6 transition-colors ${
            isSelected ? "text-slate-900" : "text-teal-400"
          }`}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  </button>
);

export default function RoleStep() {
  const { setRole, nextStep } = useOnboardingStore((state) => state.actions);
  const [selectedRole, setSelectedRole] = useState<'FAN' | 'CREATOR' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to TipJar+!</h2>
        <p className="text-gray-400">Let's start by choosing your role on the platform.</p>
      </div>

      <div className="space-y-4 mb-8">
        <RoleCard
          icon={Heart}
          title="Register as a Fan"
          description="I want to support my favorite creators and join their communities."
          onClick={() => setSelectedRole("FAN")}
          isSelected={selectedRole === "FAN"}
        />
        <RoleCard
          icon={Palette}
          title="Register as a Creator"
          description="I want to monetize my passion and build a community around my work."
          onClick={() => setSelectedRole("CREATOR")}
          isSelected={selectedRole === "CREATOR"}
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!selectedRole}
        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-lg"
      >
        Next
      </button>
    </div>
  );
}

