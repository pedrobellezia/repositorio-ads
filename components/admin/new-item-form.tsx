"use client";

import { useState } from "react";
import { createItemAction } from "@/app/admin/items/actions";
import { ItemFormFields } from "@/components/admin/item-form-fields";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CategoryWithTags } from "@/lib/data";

export function NewItemForm({
  categories,
  defaultProfessorName,
}: {
  categories: CategoryWithTags[];
  defaultProfessorName?: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo item</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo item</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            await createItemAction(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <ItemFormFields
            categories={categories}
            defaultProfessorName={defaultProfessorName}
          />
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <SubmitButton>Criar item</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
