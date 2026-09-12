export const ITEM_FILES_BUCKET = "item-files";
export const MAX_ITEM_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function getPublicFileUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${ITEM_FILES_BUCKET}/${path}`;
}
