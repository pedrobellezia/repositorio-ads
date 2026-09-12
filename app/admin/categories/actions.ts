"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategoryAction(name: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tag_categories")
    .insert({ name: name.trim(), slug: slugify(name) });

  if (error) throw error;

  revalidatePath("/admin/categories");
  revalidatePath("/admin/tags");
  revalidatePath("/");
}

export async function deleteCategoryAction(categoryId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tag_categories")
    .delete()
    .eq("id", categoryId);

  if (error) throw error;

  revalidatePath("/admin/categories");
  revalidatePath("/admin/tags");
  revalidatePath("/");
}
