"use client";

import React, { useState } from "react";
import { GripVertical, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import type { cn } from "@/lib/utils";
import type { CourseModule } from "@/types/premiumContent";

interface CourseModulesEditorV2Props {
  modules: CourseModule[];
  onChange: (modules: CourseModule[]) => void;
  isSaving?: boolean;
  error?: string;
}

export default function CourseModulesEditorV2({
  modules,
  onChange,
  isSaving = false,
  error,
}: CourseModulesEditorV2Props) {
  const [localModules, setLocalModules] = useState<CourseModule[]>(modules);

  React.useEffect(() => {
    setLocalModules(modules);
  }, [modules]);

  const updateAndNotify = (newModules: CourseModule[]) => {
    setLocalModules(newModules);
    onChange(newModules);
  };

  const addModule = () => {
    updateAndNotify([
      ...localModules,
      { id: crypto.randomUUID(), title: "", order: localModules.length },
    ]);
  };

  const updateModule = (id: string, title: string) => {
    updateAndNotify(localModules.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const removeModule = (id: string) => {
    updateAndNotify(
      localModules
        .filter((m) => m.id !== id)
        .map((m, i) => ({ ...m, order: i })),
    );
  };

  const moveModule = (id: string, direction: "up" | "down") => {
    const index = localModules.findIndex((m) => m.id === id);
    if (direction === "up" && index > 0) {
      const newModules = [...localModules];
      [newModules[index], newModules[index - 1]] = [newModules[index - 1], newModules[index]];
      updateAndNotify(newModules.map((m, i) => ({ ...m, order: i })));
    } else if (direction === "down" && index < localModules.length - 1) {
      const newModules = [...localModules];
      [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
      updateAndNotify(newModules.map((m, i) => ({ ...m, order: i })));
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1 flex items-center gap-2">
        Modules
        {error && <span className="text-xs text-red-400" role="alert">{error}</span>}
      </label>

      {localModules.length === 0 && !isSaving && (
        <p className="text-xs text-white/30 italic">
          No modules yet. A course needs at least one.
        </p>
      )}

      {localModules.map((mod, i) => (
        <div
          key={mod.id}
          className="flex items-center gap-2 bg-white/5 rounded-xl p-3 transition-colors"
        >
          <div className="flex flex-col items-center gap-1 text-white/20 shrink-0">
            <button
              type="button"
              onClick={() => moveModule(mod.id, "up")}
              disabled={i === 0 || isSaving}
              className="p-1 hover:text-white/50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Move up"
              aria-disabled={i === 0 || isSaving}
            >
              <ChevronUp size={14} />
            </button>
            <span className="text-xs w-5 tnum">{i + 1}</span>
            <button
              type="button"
              onClick={() => moveModule(mod.id, "down")}
              disabled={i === localModules.length - 1 || isSaving}
              className="p-1 hover:text-white/50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Move down"
              aria-disabled={i === localModules.length - 1 || isSaving}
            >
              <ChevronDown size={14} />
            </button>
          </div>
          <GripVertical size={16} className="text-white/20 shrink-0" aria-hidden="true" />
          <Input
            value={mod.title}
            onChange={(e) => updateModule(mod.id, e.target.value)}
            placeholder={`Module ${i + 1} title`}
            className="flex-1"
            disabled={isSaving}
            aria-label={`Module ${i + 1} title`}
            aria-invalid={!mod.title.trim()}
          />
          <button
            type="button"
            onClick={() => removeModule(mod.id)}
            disabled={isSaving}
            className="text-white/30 hover:text-red-300 transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={`Remove module ${i + 1}`}
            aria-disabled={isSaving}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={addModule}
        type="button"
        disabled={isSaving}
        leftIcon={<Plus size={14} />}
        aria-disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Add module"}
      </Button>
    </div>
  );
}