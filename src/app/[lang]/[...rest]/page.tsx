import { notFound } from "next/navigation";

/**
 * Any path under /en or /ar that has no page of its own: render the localized
 * not-found page (../not-found.tsx) with a real 404 status, inside the right
 * language's layout. Without this, unknown paths fell through to Next's
 * generic English 404.
 *
 * `ensureStatic = "navigation"` makes Next render the complete 404 on the
 * server for an unknown path (full HTML, readable without JavaScript) instead
 * of an empty shell that the browser fills in. It needs at least one
 * prerendered parameter set, hence the placeholder below.
 */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return [{ rest: ["page-not-found"] }];
}

export default function UnknownPage() {
  notFound();
}
