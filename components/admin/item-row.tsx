"use client";

import { useState } from "react";
import { updateItemAction } from "@/app/admin/items/actions";
import { ItemFormFields } from "@/components/admin/item-form-fields";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar item</DialogTitle>
          </DialogHeader>
          <form
            action={async (formData: FormData) => {
              await updateItemAction(item.id, formData);
              setEditing(false);
            }}
            className="space-y-4"
          >
            <ItemFormFields
              categories={categories}
              defaultItem={item}
              defaultTagIds={item.tags.map((t) => t.id)}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </Button>
              <SubmitButton>Salvar</SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
