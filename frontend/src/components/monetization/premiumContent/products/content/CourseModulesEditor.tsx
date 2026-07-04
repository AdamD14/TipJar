"use client";

import React from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import type { CourseModule } from "@/types/premiumContent";

interface CourseModulesEditorProps {
  modules: CourseModule[];
  onChange: (modules: CourseModule[]) => void;
}

/**
 * Content editor dla type === "course". Moduły są sekwencyjne — order
 * jest indeksem, nie polem edytowanym ręcznie (reorder = drag, nie liczba).
 * Drag & drop celowo nieuzupełniony (placeholder na GripVertical) —
 * podłącz pod istniejący DnD z studio/page/layout/ jeśli już macie
 * bibliotekę do tego wybraną, żeby nie duplikować dwóch implementacji DnD.
 */
export default function CourseModulesEditor({
  modules,
  onChange,
}: CourseModulesEditorProps) {
  const addModule = () => {
    onChange([
      ...modules,
      { id: crypto.randomUUID(), title: "", order: modules.length },
    ]);
  };

  const updateModule = (id: string, title: string) => {
    onChange(modules.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const removeModule = (id: string) => {
    onChange(
      modules
        .filter((m) => m.id !== id)
        .map((m, i) => ({ ...m, order: i })),
    );
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        Modules
      </label>

      {modules.length === 0 && (
        <p className="text-xs text-white/30 italic">
          No modules yet. A course needs at least one.
        </p>
      )}

      {modules.map((mod, i) => (
        <div key={mod.id} className="flex items-center gap-2">
          <GripVertical size={16} className="text-white/20 shrink-0" />
          <span className="text-xs text-white/30 w-5 tnum">{i + 1}</span>
          <Input
            value={mod.title}
            onChange={(e) => updateModule(mod.id, e.target.value)}
            placeholder={`Module ${i + 1} title`}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => removeModule(mod.id)}
            className="text-white/30 hover:text-red-300 transition-colors shrink-0"
            aria-label="Remove module"
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
        leftIcon={<Plus size={14} />}
      >
        Add module
      </Button>
    </div>
  );
}