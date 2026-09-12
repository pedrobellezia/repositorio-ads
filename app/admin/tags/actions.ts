"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import type { SimilarTag } from "@/lib/types";

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function searchSimilarTagsAction(
  categoryId: string,
  name: string,
): Promise<SimilarTag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("search_similar_tags", {
    p_category_id: categoryId,
    p_name: name,
  });

  if (error) throw error;
  return data ?? [];
}

export async function createTagAction(
  categoryId: string,
  name: string,
  icon: string,
) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Não autenticado.");

  const supabase = await createClient();
  const { error } = await supabase.from("tags").insert({
    category_id: categoryId,
    name: name.trim(),
    slug: slugify(name),
    icon,
    created_by: profile.id,
  });

  if (error) throw error;

  revalidatePath("/admin/tags");
  revalidatePath("/admin/items");
  revalidatePath("/");
}

export async function deleteTagAction(tagId: string) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Não autenticado.");

  const supabase = await createClient();
  const { error } = await supabase.from("tags").delete().eq("id", tagId);
  if (error) throw error;

  revalidatePath("/admin/tags");
  revalidatePath("/admin/items");
  revalidatePath("/");
}
