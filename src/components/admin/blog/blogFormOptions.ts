import type { BlogPostStatus } from "../../../types/Blog";

export const BLOG_STATUS_OPTIONS: Array<{
  value: BlogPostStatus;
  label: string;
}> = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Publicado" },
  { value: "SCHEDULED", label: "Agendado" },
  { value: "ARCHIVED", label: "Arquivado" },
];
