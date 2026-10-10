import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

export function Company({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).company;
  return (
    <section id="company" aria-labelledby="co-title" className="pb-[clamp(120px,12vw,192px)] pt-[clamp(40px,5vw,80px)]">
      <div className="page-container flex flex-col gap-[clamp(56px,6vw,88px)]">
        <div className="flex flex-col gap-7">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="co-title" className="m-0 max-w-[1080px] text-[clamp(27px,3.2vw,44px)] font-bold leading-[1.2] text-pretty">
            {t.titleStrong} <span className="text-muted">{t.titleMuted}</span>
          </h2>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-14 gap-y-10 p-0">
          {t.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-3 border-t-2 border-dotted border-line-strong pt-6">
              <h3 className="m-0 text-[22px] font-bold leading-[1.2]">{item.title}</h3>
              <p className="m-0 text-[17px] leading-[1.55] text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
