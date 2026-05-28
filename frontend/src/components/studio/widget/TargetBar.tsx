"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Crosshair, PencilLine, Eye, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { GoalBar } from "@/components/studio/modal/GoalBar";

interface Goal {
  title: string;
  target: number;
  current: number;
  deadline: string;
}

interface TargetBarProps {
  onPublish?: (goal: Goal) => void;
  initialGoal?: Partial<Goal>;
}

export default function TargetBar({ onPublish, initialGoal }: TargetBarProps) {
  const [goal, setGoal] = useState<Goal>({
    title: initialGoal?.title || "",
    target: initialGoal?.target || 100,
    current: initialGoal?.current || 0,
    deadline: initialGoal?.deadline || "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleUpdate = (field: keyof Goal, value: string | number) => {
    setGoal((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const publishGoal = () => {
    setIsSaved(true);
    if (onPublish) {
      onPublish(goal);
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
        {/* LEFT: Configuration */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <PencilLine size={16} className="text-teal-400" />
            <h2 className="text-sm font-heading font-medium text-teal-400">Configuration</h2>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl relative">
            {/* Goal */}
            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Goal (max 40 characters)
              </label>
              <Input
                value={goal.title}
                onChange={(e) => handleUpdate("title", e.target.value)}
              />
            </div>

            {/* Target + Deadline */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Target (USDC)
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={goal.target}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    handleUpdate("target", val ? Number(val) : 0);
                  }}
                  className="tnum"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Deadline
                </label>
                <Input
                  type="date"
                  value={goal.deadline}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleUpdate("deadline", e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Publish Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                fullWidth
                onClick={publishGoal}
                className="py-4 uppercase tracking-widest"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isSaved ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Crosshair size={20} />
                  )}
                  {isSaved ? "Mission Accomplished" : "Set target"}
                </div>
              </Button>
            </div>
          </div>
        </section>

        {/* RIGHT: Synthesized Preview */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <Eye size={16} className="text-teal-400" />
            <h2 className="text-sm font-heading font-medium text-teal-400">
              Synthesized Preview
            </h2>
          </div>
          <GoalBar goal={goal} />
        </section>
      </div>
    </div>
  );
}
