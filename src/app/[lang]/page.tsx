import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Approach } from "@/components/home/Approach";
import { DemoSection } from "@/components/home/DemoSection";
import { Enquiry } from "@/components/home/Enquiry";
import { EnquiryProvider } from "@/components/home/EnquiryProvider";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang) : {};
}

/**
 * Homepage. Section order (revised after the October 2026 audit): hero,
 * services, demo, how we work (stages + commitments, formerly the separate
 * Company and Approach sections), FAQ, enquiry. Verified proof, selected work
 * and team sections slot in after the hero, demo and how-we-work respectively
 * once approved content exists. SECTION_IDS in lib/sections.ts follows this order.
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <EnquiryProvider>
      <Header locale={lang} />
      <Hero locale={lang} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Services locale={lang} />
        <DemoSection locale={lang} />
        <Approach locale={lang} />
        <Faq locale={lang} />
        <Enquiry locale={lang} />
      </main>
      <Footer locale={lang} />
    </EnquiryProvider>
  );
}
