import { createClient } from "@/lib/supabase/server";
import type { Item, ItemWithTags, Tag, TagCategory } from "@/lib/types";

export async function getPublicItems(): Promise<ItemWithTags[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("items")
    .select("*, item_tags(tag:tags(*))")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const { item_tags, ...item } = row as Item & {
      item_tags: { tag: Tag }[];
    };
    return {
      ...item,
      tags: item_tags.map((it) => it.tag),
    };
  });
}

export type CategoryWithTags = TagCategory & { tags: Tag[] };

export async function getTagCategories(): Promise<CategoryWithTags[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tag_categories")
    .select("*, tags(*)")
    .order("name");

  if (error) throw error;

  return data as CategoryWithTags[];
}
