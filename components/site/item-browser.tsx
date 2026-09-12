"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/site/item-card";
import type { CategoryWithTags } from "@/lib/data";
import { PHASE_LABELS, PHASES, type ItemWithTags } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TagIcon } from "@/lib/tag-icons";

export function ItemBrowser({
  items,
  categories,
}: {
  items: ItemWithTags[];
  categories: CategoryWithTags[];
}) {
  const [phase, setPhase] = useState<string>("todas");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const usedPhases = useMemo(
    () => PHASES.filter((p) => items.some((item) => item.phase === p)),
    [items],
  );

  function toggleTag(tagId: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (phase !== "todas" && item.phase !== phase) return false;

      for (const category of categories) {
        const selectedInCategory = category.tags
          .map((t) => t.id)
          .filter((id) => selectedTags.has(id));

        if (selectedInCategory.length === 0) continue;

        const hasMatch = item.tags.some((tag) =>
          selectedInCategory.includes(tag.id),
        );
        if (!hasMatch) return false;
      }

      return true;
    });
  }, [items, phase, selectedTags, categories]);

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="space-y-6">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-700">Fase</h2>
          <div className="flex flex-wrap gap-1.5 md:flex-col">
            <PhaseButton
              active={phase === "todas"}
              onClick={() => setPhase("todas")}
            >
              Todas
            </PhaseButton>
            {usedPhases.map((p) => (
              <PhaseButton
                key={p}
                active={phase === p}
                onClick={() => setPhase(p)}
              >
                {PHASE_LABELS[p]}
              </PhaseButton>
            ))}
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="mb-2 text-sm font-semibold text-slate-700">
              {category.name}
            </h2>
            <div className="flex flex-wrap gap-1.5 md:flex-col md:items-start">
              {category.tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    selectedTags.has(tag.id)
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
                  )}
                >
                  <TagIcon icon={tag.icon} className="h-3 w-3" />
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        ))}

        {selectedTags.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTags(new Set())}
          >
            Limpar tags
          </Button>
        )}
      </aside>

      <div>
        {filteredItems.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nenhum item encontrado com esses filtros.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhaseButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}
