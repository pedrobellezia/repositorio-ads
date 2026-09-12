"use client";

import { useState, useTransition } from "react";
import {
  createCategoryAction,
  deleteCategoryAction,
} from "@/app/admin/categories/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TagCategory } from "@/lib/types";

export function CategoryManager({
  categories,
}: {
  categories: TagCategory[];
}) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    if (!name.trim()) return;
    startTransition(async () => {
      await createCategoryAction(name.trim());
      setName("");
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 rounded-lg border border-slate-300 bg-white p-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da categoria (ex: Tipo, Disciplina)"
        />
        <Button onClick={handleCreate} disabled={isPending || !name.trim()}>
          Criar categoria
        </Button>
      </div>

      <div className="space-y-2">
        {categories.length === 0 && (
          <p className="text-sm text-slate-500">Nenhuma categoria ainda.</p>
        )}
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
          >
            <span className="text-sm font-medium text-slate-900">
              {category.name}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (
                  confirm(
                    `Excluir a categoria "${category.name}"? Todas as tags dela também serão excluídas.`,
                  )
                ) {
                  deleteCategoryAction(category.id);
                }
              }}
            >
              Excluir
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
