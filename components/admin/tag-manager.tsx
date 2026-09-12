"use client";

import { useState, useTransition } from "react";
import {
  createTagAction,
  deleteTagAction,
  searchSimilarTagsAction,
} from "@/app/admin/tags/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TAG_ICON_OPTIONS, TagIcon } from "@/lib/tag-icons";
import type { CategoryWithTags } from "@/lib/data";
import type { SimilarTag } from "@/lib/types";

export function TagManager({ categories }: { categories: CategoryWithTags[] }) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(TAG_ICON_OPTIONS[0]);
  const [similar, setSimilar] = useState<SimilarTag[] | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleCreate() {
    if (!categoryId || !name.trim()) return;

    const results = await searchSimilarTagsAction(categoryId, name.trim());
    if (results.length > 0) {
      setSimilar(results);
      return;
    }

    await confirmCreate();
  }

  async function confirmCreate() {
    setSimilar(null);
    startTransition(async () => {
      await createTagAction(categoryId, name.trim(), icon);
      setName("");
    });
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3 rounded-lg border border-slate-300 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Nova tag</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Ícone</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TAG_ICON_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    <span className="flex items-center gap-2">
                      <TagIcon icon={opt} className="h-3.5 w-3.5" />
                      {opt}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleCreate}
              disabled={isPending || !categoryId || !name.trim()}
            >
              Criar tag
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              {category.name}
            </h3>
            {category.tags.length === 0 ? (
              <p className="text-xs text-slate-500">Nenhuma tag ainda.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white py-1 pl-3 pr-1 text-sm"
                  >
                    <TagIcon icon={tag.icon} className="h-3.5 w-3.5" />
                    {tag.name}
                    <button
                      onClick={() => {
                        if (confirm(`Excluir a tag "${tag.name}"?`)) {
                          deleteTagAction(tag.id);
                        }
                      }}
                      className="rounded-full px-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={similar !== null} onOpenChange={(open) => !open && setSimilar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tags parecidas encontradas</DialogTitle>
            <DialogDescription>
              Já existem tags parecidas com &quot;{name}&quot; nessa categoria. Tem
              certeza que quer criar mesmo assim?
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2">
            {similar?.map((s) => (
              <Badge key={s.id} variant="outline">
                {s.name} ({Math.round(s.similarity * 100)}%)
              </Badge>
            ))}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setSimilar(null)}>
              Cancelar
            </Button>
            <Button onClick={confirmCreate}>Criar mesmo assim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
