import type { ItemWithTags, Tag, TagCategory } from "@/lib/types";

type CategoryWithTags = TagCategory & { tags: Tag[] };

const tagLinguagens: Tag = {
  id: "tag-1",
  category_id: "cat-1",
  name: "JavaScript",
  slug: "javascript",
  icon: null,
  created_by: null,
  created_at: "2026-01-10T12:00:00.000Z",
};

const tagBanco: Tag = {
  id: "tag-2",
  category_id: "cat-2",
  name: "SQL",
  slug: "sql",
  icon: null,
  created_by: null,
  created_at: "2026-01-10T12:00:00.000Z",
};

const tagRedes: Tag = {
  id: "tag-3",
  category_id: "cat-3",
  name: "TCP/IP",
  slug: "tcp-ip",
  icon: null,
  created_by: null,
  created_at: "2026-01-10T12:00:00.000Z",
};

export const mockItems: ItemWithTags[] = [
  {
    id: "item-1",
    name: "Introdução ao JavaScript",
    description: "Slides e exercícios da primeira aula de programação web.",
    phase: "1fase",
    professor_name: "Profa. Ana Souza",
    link_url: "https://example.com/js-intro",
    file_path: null,
    created_by: null,
    created_at: "2026-02-01T10:00:00.000Z",
    updated_at: "2026-02-01T10:00:00.000Z",
    tags: [tagLinguagens],
  },
  {
    id: "item-2",
    name: "Modelagem de banco de dados",
    description: "Material sobre modelo entidade-relacionamento e normalização.",
    phase: "2fase",
    professor_name: "Prof. Carlos Lima",
    link_url: "https://example.com/modelagem-bd",
    file_path: null,
    created_by: null,
    created_at: "2026-02-05T10:00:00.000Z",
    updated_at: "2026-02-05T10:00:00.000Z",
    tags: [tagBanco],
  },
  {
    id: "item-3",
    name: "Fundamentos de redes de computadores",
    description: "Apostila sobre a pilha TCP/IP e roteamento.",
    phase: "3fase",
    professor_name: "Prof. Bruno Alves",
    link_url: null,
    file_path: "redes/fundamentos-redes.pdf",
    created_by: null,
    created_at: "2026-02-10T10:00:00.000Z",
    updated_at: "2026-02-10T10:00:00.000Z",
    tags: [tagRedes, tagLinguagens],
  },
];

export const mockCategories: CategoryWithTags[] = [
  {
    id: "cat-1",
    name: "Linguagens",
    slug: "linguagens",
    created_at: "2026-01-01T12:00:00.000Z",
    tags: [tagLinguagens],
  },
  {
    id: "cat-2",
    name: "Banco de dados",
    slug: "banco-de-dados",
    created_at: "2026-01-01T12:00:00.000Z",
    tags: [tagBanco],
  },
  {
    id: "cat-3",
    name: "Redes",
    slug: "redes",
    created_at: "2026-01-01T12:00:00.000Z",
    tags: [tagRedes],
  },
];
