"use client";

import { useState } from "react";
import { Zap, MessageSquare, Plus, Check, Play } from "lucide-react";

type ActionState = "idle" | "done";

interface QuickAction {
  label: string;
  icon: React.ElementType;
  variant: "primary" | "secondary" | "ghost";
  doneLabel: string;
}

const actions: QuickAction[] = [
  {
    label: "Start Stream",
    icon: Play,
    variant: "primary",
    doneLabel: "Going live!",
  },
  {
    label: "Reply to Fans",
    icon: MessageSquare,
    variant: "secondary",
    doneLabel: "Replied!",
  },
  {
    label: "Quick Post",
    icon: Plus,
    variant: "ghost",
    doneLabel: "Posted!",
  },
];

export function QuickActions() {
  const [states, setStates] = useState<Record<number, ActionState>>({});
  const [fabOpen, setFabOpen] = useState(false);

  const handleAction = (idx: number) => {
    setStates((prev) => ({ ...prev, [idx]: "done" }));
    setTimeout(() => {
      setStates((prev) => ({ ...prev, [idx]: "idle" }));
    }, 1500);
  };

  const variantStyles: Record<string, string> = {
    primary:
      "bg-gold-400 text-teal-900 hover:bg-gold-300 shadow-lg shadow-gold-400/20",
    secondary:
      "bg-transparent border-2 border-purple-300 text-purple-300 hover:bg-purple-300/10",
    ghost:
      "bg-teal-700 text-text-primary hover:bg-teal-600",
  };

  const doneVariantStyles: Record<string, string> = {
    primary: "bg-success-base text-teal-900",
    secondary: "bg-success-base/20 border-success-base text-success-light",
    ghost: "bg-success-base/20 text-success-light",
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const isDone = states[idx] === "done";

          return (
            <button
              key={idx}
              onClick={() => handleAction(idx)}
              className={`card-surface group relative flex items-center gap-4 px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 ${
                isDone
                  ? doneVariantStyles[action.variant]
                  : variantStyles[action.variant]
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-success-base/30"
                    : action.variant === "primary"
                      ? "bg-teal-900/20"
                      : action.variant === "secondary"
                        ? "bg-purple-300/10"
                        : "bg-teal-600"
                }`}
              >
                {isDone ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      action.variant === "primary" ? "text-teal-900" : ""
                    }`}
                  />
                )}
              </div>

              <div className="text-left">
                <span className="font-heading font-semibold text-base">
                  {isDone ? action.doneLabel : action.label}
                </span>
                {!isDone && (
                  <p className="font-body text-xs opacity-60 mt-0.5">
                    {idx === 0 && "Go live in one click"}
                    {idx === 1 && "5 unread messages"}
                    {idx === 2 && "Share an update"}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-6 right-6 z-fab">
        {fabOpen && (
          <>
            <div
              className="fixed inset-0 bg-teal-900/60 backdrop-blur-sm z-40"
              onClick={() => setFabOpen(false)}
            />
            <div className="relative z-50 flex flex-col-reverse gap-3 mb-4 items-end">
              {actions.map((action, idx) => {
                const Icon = action.icon;
                const isDone = states[idx] === "done";
                return (
                  <button
                    key={idx}
                    onClick={() => handleAction(idx)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-heading font-semibold text-sm shadow-lg transition-all duration-200 animate-slide-down ${
                      isDone
                        ? "bg-success-base text-teal-900"
                        : variantStyles[action.variant]
                    }`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <span className="text-xs bg-teal-900/20 px-2 py-0.5 rounded">
                      {isDone ? action.doneLabel : action.label}
                    </span>
                    {isDone ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            fabOpen
              ? "bg-teal-700 text-gold-400 rotate-45"
              : "bg-gold-400 text-teal-900 hover:bg-gold-300"
          }`}
        >
          <Zap className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}