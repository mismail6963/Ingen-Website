import Link from "next/link";
import en from "@/content/en";

// Rendered inside the [lang] root layout. Kept in English because not-found
// files do not receive params; the Arabic copy exists in content/ar.ts if a
// localized version is needed later.
export default function NotFound() {
  const t = en.notFound;
  return (
    <main className="page-container flex min-h-[70vh] flex-col justify-center gap-6 py-24">
      <h1 className="m-0 text-[clamp(34px,4vw,58px)] font-bold leading-[1.08]">{t.title}</h1>
      <p className="m-0 text-lg text-muted">{t.text}</p>
      <Link
        href="/en"
        className="inline-flex min-h-[54px] items-center self-start rounded-full bg-vermilion px-7 text-base font-bold text-white hover:bg-vermilion-deep"
      >
        {t.home}
      </Link>
    </main>
  );
}
