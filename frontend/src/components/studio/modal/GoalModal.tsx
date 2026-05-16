"use client";

import { useState } from "react";
import api from "@/lib/apiClient";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import Textarea from "@/components/ui/forms/Textarea";
import type { Goal } from "@/lib/types";
import { normalize } from "@/lib/api/errors";

export default function GoalModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (g: Goal) => void;
}) {
  const [f, setF] = useState({ title: "", targetAmount: "", description: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    try {
      setBusy(true);
      const parsed = {
        title: f.title,
        targetAmount: Math.round(Number(f.targetAmount) * 100),
        description: f.description || undefined,
      };
      const { data: g } = await api.post("/api/v1/goal", parsed);
      onSaved(g);
      onClose();
    } catch (e: unknown) {
      const n = normalize(e);
      setError(n.msg || "Failed to create goal.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal open onClose={onClose} size="form" title="New Goal">
      <div className="space-y-4">
        <div>
          <label className="block font-body text-sm text-teal-50 mb-1">Name</label>
          <Input
            value={f.title}
            onChange={(e) => setF({ ...f, title: e.target.value })}
            placeholder="e.g. New streaming setup"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-teal-50 mb-1">Target (USDC)</label>
          <Input
            type="number"
            value={f.targetAmount}
            onChange={(e) => setF({ ...f, targetAmount: e.target.value })}
            placeholder="100.00"
            inputSize="large"
            className="tnum"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-teal-50 mb-1">Description (optional)</label>
          <Textarea
            value={f.description}
            onChange={(e) => setF({ ...f, description: e.target.value })}
            placeholder="What are you raising funds for?"
          />
        </div>

        {error && (
          <p className="text-sm text-error-light" role="alert">{error}</p>
        )}

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={busy}
            disabled={!f.title || !f.targetAmount}
            onClick={submit}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}
