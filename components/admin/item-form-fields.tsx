import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PHASE_LABELS, PHASES, type Item, type Tag } from "@/lib/types";
import type { CategoryWithTags } from "@/lib/data";

export function ItemFormFields({
  categories,
  defaultItem,
  defaultTagIds,
  defaultProfessorName,
}: {
  categories: CategoryWithTags[];
  defaultItem?: Item;
  defaultTagIds?: string[];
  defaultProfessorName?: string | null;
}) {
  const selected = new Set(defaultTagIds ?? []);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={defaultItem?.name}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultItem?.description}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phase">Fase</Label>
        <select
          id="phase"
          name="phase"
          defaultValue={defaultItem?.phase ?? "geral"}
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          {PHASES.map((phase) => (
            <option key={phase} value={phase}>
              {PHASE_LABELS[phase]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="professor_name">Professor(a)</Label>
        <Input
          id="professor_name"
          name="professor_name"
          defaultValue={defaultItem?.professor_name ?? defaultProfessorName ?? ""}
          placeholder="Deixe em branco para item geral"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="link_url">Link externo</Label>
        <Input
          id="link_url"
          name="link_url"
          type="url"
          defaultValue={defaultItem?.link_url ?? ""}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="file">
          Arquivo {defaultItem?.file_path ? "(substituir)" : "(máx. 10MB)"}
        </Label>
        <Input id="file" name="file" type="file" accept="*/*" />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label>Tags</Label>
        {categories.length === 0 && (
          <p className="text-xs text-slate-500">
            Nenhuma categoria de tag cadastrada ainda.
          </p>
        )}
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id}>
              <p className="mb-1 text-xs font-semibold text-slate-500">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-3">
                {category.tags.map((tag: Tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-1.5 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      name="tag_ids"
                      value={tag.id}
                      defaultChecked={selected.has(tag.id)}
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
