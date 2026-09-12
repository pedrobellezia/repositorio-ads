"use client";

import { useTransition } from "react";
import { deleteItemAction } from "@/app/admin/items/actions";
import { Button } from "@/components/ui/button";

export function DeleteItemButton({ itemId }: { itemId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Excluir este item? Essa ação não pode ser desfeita.")) {
          startTransition(() => {
            deleteItemAction(itemId);
          });
        }
      }}
    >
      Excluir
    </Button>
  );
}
