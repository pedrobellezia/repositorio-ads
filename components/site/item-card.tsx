import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PHASE_LABELS, type ItemWithTags } from "@/lib/types";
import { PHASE_COLORS } from "@/lib/phase-colors";
import { getPublicFileUrl } from "@/lib/storage";
import { TagIcon } from "@/lib/tag-icons";

export function ItemCard({ item }: { item: ItemWithTags }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-accent-border/30 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading font-semibold text-secondary">{item.name}</h3>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: PHASE_COLORS[item.phase] }}
        >
          {PHASE_LABELS[item.phase]}
        </span>
      </div>

      {item.description && (
        <p className="text-sm text-slate-600">{item.description}</p>
      )}

      {item.professor_name && (
        <p className="text-xs text-slate-500">
          Professor(a): {item.professor_name}
        </p>
      )}

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Badge key={tag.id}>
              <TagIcon icon={tag.icon} className="h-3 w-3" />
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {item.link_url && (
          <a
            href={item.link_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-heading text-sm font-semibold text-white hover:bg-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Link
          </a>
        )}
        {item.file_path && (
          <a
            href={getPublicFileUrl(item.file_path)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-secondary px-3 py-1.5 font-heading text-sm font-semibold text-secondary hover:bg-secondary hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            Arquivo
          </a>
        )}
      </div>
    </div>
  );
}
