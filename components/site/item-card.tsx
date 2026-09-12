import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PHASE_LABELS, type ItemWithTags } from "@/lib/types";
import { getPublicFileUrl } from "@/lib/storage";

export function ItemCard({ item }: { item: ItemWithTags }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{item.name}</h3>
        <Badge variant="outline" className="shrink-0">
          {PHASE_LABELS[item.phase]}
        </Badge>
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
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {item.link_url && (
          <a
            href={item.link_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
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
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <FileText className="h-3.5 w-3.5" />
            Arquivo
          </a>
        )}
      </div>
    </div>
  );
}
