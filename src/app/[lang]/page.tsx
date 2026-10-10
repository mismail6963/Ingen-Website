import { notFound } from "next/navigation";
import { Approach } from "@/components/home/Approach";
import { Company } from "@/components/home/Company";
import { DemoSection } from "@/components/home/DemoSection";
import { Enquiry } from "@/components/home/Enquiry";
import { EnquiryProvider } from "@/components/home/EnquiryProvider";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Footer } from "@/components/site/Footer";
import { isLocale } from "@/lib/i18n";

/** Homepage. Section order is approved: hero, services, demo, company, approach, FAQ, enquiry. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <EnquiryProvider>
      <Hero locale={lang} />
      <main>
        <Services locale={lang} />
        <DemoSection locale={lang} />
        <Company locale={lang} />
        <Approach locale={lang} />
        <Faq locale={lang} />
        <Enquiry locale={lang} />
      </main>
      <Footer locale={lang} />
    </EnquiryProvider>
  );
}
