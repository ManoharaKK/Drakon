/** Allow only same-origin path redirects (blocks //evil.com and https:). */
export function safeInternalPath(next: string | null): string | null {
  if (!next || typeof next !== "string") return null;
  const trimmed = next.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  if (trimmed.includes("://")) return null;
  return trimmed;
}
