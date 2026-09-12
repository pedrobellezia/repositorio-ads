"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { ITEM_FILES_BUCKET, MAX_ITEM_FILE_SIZE_BYTES } from "@/lib/storage";
import type { Phase } from "@/lib/types";

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    phase: String(formData.get("phase") ?? "geral") as Phase,
    professor_name: String(formData.get("professor_name") ?? "").trim() || null,
    link_url: String(formData.get("link_url") ?? "").trim() || null,
    tagIds: formData.getAll("tag_ids").map(String),
  };
}

async function uploadFileIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
) {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return null;

  if (file.size > MAX_ITEM_FILE_SIZE_BYTES) {
    throw new Error("Arquivo maior que o limite de 10MB.");
  }

  const path = `${crypto.randomUUID()}-${file.name}`;
  const { error } = await supabase.storage
    .from(ITEM_FILES_BUCKET)
    .upload(path, file);
  if (error) throw error;

  return path;
}

async function setItemTags(
  supabase: Awaited<ReturnType<typeof createClient>>,
  itemId: string,
  tagIds: string[],
) {
  await supabase.from("item_tags").delete().eq("item_id", itemId);
  if (tagIds.length > 0) {
    await supabase
      .from("item_tags")
      .insert(tagIds.map((tagId) => ({ item_id: itemId, tag_id: tagId })));
  }
}

export async function createItemAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Não autenticado.");

  const supabase = await createClient();
  const fields = readFields(formData);
  const filePath = await uploadFileIfPresent(supabase, formData);

  if (!fields.link_url && !filePath) {
    throw new Error("Informe um link externo ou envie um arquivo.");
  }

  const { data: item, error } = await supabase
    .from("items")
    .insert({
      name: fields.name,
      description: fields.description,
      phase: fields.phase,
      professor_name: fields.professor_name,
      link_url: fields.link_url,
      file_path: filePath,
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error) throw error;

  await setItemTags(supabase, item.id, fields.tagIds);

  revalidatePath("/admin/items");
  revalidatePath("/");
}

export async function updateItemAction(itemId: string, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Não autenticado.");

  const supabase = await createClient();
  const fields = readFields(formData);
  const newFilePath = await uploadFileIfPresent(supabase, formData);

  const update: Record<string, unknown> = {
    name: fields.name,
    description: fields.description,
    phase: fields.phase,
    professor_name: fields.professor_name,
    link_url: fields.link_url,
  };

  if (newFilePath) {
    update.file_path = newFilePath;
  }

  const { error } = await supabase.from("items").update(update).eq("id", itemId);
  if (error) throw error;

  await setItemTags(supabase, itemId, fields.tagIds);

  revalidatePath("/admin/items");
  revalidatePath("/");
}

export async function deleteItemAction(itemId: string) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Não autenticado.");

  const supabase = await createClient();

  const { data: item } = await supabase
    .from("items")
    .select("file_path")
    .eq("id", itemId)
    .single();

  const { error } = await supabase.from("items").delete().eq("id", itemId);
  if (error) throw error;

  if (item?.file_path) {
    await supabase.storage.from(ITEM_FILES_BUCKET).remove([item.file_path]);
  }

  revalidatePath("/admin/items");
  revalidatePath("/");
}
