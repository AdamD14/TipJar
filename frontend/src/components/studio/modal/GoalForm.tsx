"use client";
import { useState } from 'react';
import type { Goal } from '@/lib/api/contracts';
import Input from '@/components/ui/forms/Input';
import Button from '@/components/ui/buttons/Button';

export default function GoalForm({
  initial,
  onSubmit,
}: {
  initial?: Goal;
  onSubmit: (v: Goal) => Promise<void> | void;
}) {
  const [v, setV] = useState<Goal>(initial ?? { title: '', target: 0, deadline: '' });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(v);
      }}
      className="grid gap-3"
    >
      <Input
        placeholder="Title"
        value={v.title}
        onChange={(e) => setV((s) => ({ ...s, title: e.target.value }))}
      />
      <Input
        type="number"
        min={0}
        placeholder="Target amount (USDC)"
        value={v.target}
        onChange={(e) => setV((s) => ({ ...s, target: Number(e.target.value || 0) }))}
      />
      <Input
        type="date"
        value={v.deadline}
        onChange={(e) => setV((s) => ({ ...s, deadline: e.target.value }))}
      />
      <Button variant="primary" fullWidth type="submit">
        Save Goal
      </Button>
    </form>
  );
}
