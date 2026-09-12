"use client";

import { useState } from "react";
import { createItemAction } from "@/app/admin/items/actions";
import { ItemFormFields } from "@/components/admin/item-form-fields";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import type { CategoryWithTags } from "@/lib/data";

export function NewItemForm({
  categories,
  defaultProfessorName,
}: {
  categories: CategoryWithTags[];
  defaultProfessorName?: string | null;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return <Button onClick={() => setOpen(true)}>Novo item</Button>;
  }

  return (
    <form
      action={async (formData: FormData) => {
        await createItemAction(formData);
        setOpen(false);
      }}
      className="space-y-4 rounded-lg border border-slate-300 bg-white p-4"
    >
      <ItemFormFields
        categories={categories}
        defaultProfessorName={defaultProfessorName}
      />
      <div className="flex gap-2">
        <SubmitButton>Criar item</SubmitButton>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
