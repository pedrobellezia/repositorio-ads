import {
  Code,
  Network,
  FileText,
  BookOpen,
  Wrench,
  Monitor,
  Terminal,
  Globe,
  Tag as TagIconDefault,
  type LucideIcon,
} from "lucide-react";

export const TAG_ICONS: Record<string, LucideIcon> = {
  code: Code,
  network: Network,
  "file-text": FileText,
  book: BookOpen,
  wrench: Wrench,
  monitor: Monitor,
  terminal: Terminal,
  globe: Globe,
};

export const TAG_ICON_OPTIONS = Object.keys(TAG_ICONS);

export function TagIcon({
  icon,
  className,
}: {
  icon: string | null;
  className?: string;
}) {
  const Icon = (icon && TAG_ICONS[icon]) || TagIconDefault;
  return <Icon className={className} />;
}
