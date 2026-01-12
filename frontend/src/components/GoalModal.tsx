"use client";
import { useState } from "react";
import api from "@/lib/apiClient";
import { GoalSchema } from "@/lib/validators";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  description?: string;
}

export default function GoalModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (g: Goal) => void;
}) {
  const [f, setF] = useState({ title: "", targetAmount: "", description: "" });
  const submit = async () => {
    const parsed = GoalSchema.parse({
      title: f.title,
      targetAmount: Math.round(Number(f.targetAmount) * 100),
      description: f.description || undefined,
    });
    const g = await api("/api/v1/goal", {
      method: "POST",
      body: JSON.stringify(parsed),
    });
    onSaved(g);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">New goal</h3>
        <label className="text-sm">Title</label>
        <input
          value={f.title}
          onChange={(e) => setF({ ...f, title: e.target.value })}
          className="w-full bg-transparent border-b border-white/20 mb-3"
        />
        <label className="text-sm">Target (USDC)</label>
        <input
          type="number"
          value={f.targetAmount}
          onChange={(e) => setF({ ...f, targetAmount: e.target.value })}
          className="w-full bg-transparent border-b border-white/20 mb-3"
        />
        <label className="text-sm">Description (optional)</label>
        <textarea
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          className="w-full bg-transparent border border-white/20 rounded-lg p-2"
        />
        <div className="mt-5 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/15"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
