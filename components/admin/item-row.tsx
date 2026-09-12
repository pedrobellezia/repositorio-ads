"use client";

import { useState } from "react";
import { updateItemAction } from "@/app/admin/items/actions";
import { ItemFormFields } from "@/components/admin/item-form-fields";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteItemButton } from "@/components/admin/delete-item-button";
import { PHASE_LABELS, type ItemWithTags } from "@/lib/types";
import type { CategoryWithTags } from "@/lib/data";

export function ItemRow({
  item,
  categories,
}: {
  item: ItemWithTags;
  categories: CategoryWithTags[];
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <div>
          <p className="font-medium text-slate-900">{item.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge variant="outline">{PHASE_LABELS[item.phase]}</Badge>
            {item.tags.map((tag) => (
              <Badge key={tag.id}>{tag.name}</Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            Editar
          </Button>
          <DeleteItemButton itemId={item.id} />
        </div>
      </div>
    );
  }

  return (
    <form
      action={async (formData: FormData) => {
        await updateItemAction(item.id, formData);
        setEditing(false);
      }}
      className="space-y-4 rounded-lg border border-slate-300 bg-white p-4"
    >
      <ItemFormFields
        categories={categories}
        defaultItem={item}
        defaultTagIds={item.tags.map((t) => t.id)}
      />
      <div className="flex gap-2">
        <SubmitButton size="sm">Salvar</SubmitButton>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setEditing(false)}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
