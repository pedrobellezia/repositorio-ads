export const PHASES = [
  "geral",
  "1fase",
  "2fase",
  "3fase",
  "4fase",
  "5fase",
  "6fase",
  "7fase",
] as const;

export type Phase = (typeof PHASES)[number];

export const PHASE_LABELS: Record<Phase, string> = {
  geral: "Geral",
  "1fase": "1ª Fase",
  "2fase": "2ª Fase",
  "3fase": "3ª Fase",
  "4fase": "4ª Fase",
  "5fase": "5ª Fase",
  "6fase": "6ª Fase",
  "7fase": "7ª Fase",
};

export type Role = "admin" | "professor";

export type Profile = {
  id: string;
  role: Role;
  display_name: string | null;
};

export type TagCategory = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Tag = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  icon: string | null;
  created_by: string | null;
  created_at: string;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  phase: Phase;
  professor_name: string | null;
  link_url: string | null;
  file_path: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ItemWithTags = Item & {
  tags: Tag[];
};

export type SimilarTag = {
  id: string;
  name: string;
  similarity: number;
};
