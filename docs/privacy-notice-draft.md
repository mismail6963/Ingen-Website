# Privacy notice — DRAFT, NOT FOR PUBLICATION

> **Status:** working draft prepared from the website's actual code (October
> 2026). It is **not approved**, is **not linked or routed** anywhere on the
> site, and must not be published until Ingen (and its legal adviser) has
> filled every `[TO CONFIRM]` item and approved the English and Arabic text.
> It does not claim compliance with any law or standard.
>
> When approved: add `/[lang]/privacy` pages using `pageMetadata()`, put the
> copy in `content/en.ts` and `content/ar.ts`, link it in the footer and beside
> the enquiry form's submit button, and add the path to `src/app/sitemap.ts`.

## What the code actually does (verified facts behind the draft)

| Topic | What happens today | Source |
|---|---|---|
| Data collected by the enquiry form | Name, email, phone number, project description (required); organisation, approximate budget, desired timing, one attachment up to 5 MB (optional); the page language. A hidden spam-trap field. | `src/components/home/Enquiry.tsx`, `src/lib/enquiry.ts` |
| Where it goes | Posted to the site's own API (`/api/enquiry`), which emails it through **Resend** (email delivery service) to the inbox(es) in `ENQUIRY_TO`, with the visitor's email as reply-to and the attachment included. | `src/app/api/enquiry/route.ts` |
| Storage by the website | No database. The site does not store enquiries itself. Copies exist in the receiving inbox(es) and with the providers below. | same |
| IP address | Used in server memory for a best-effort rate limit (5 enquiries per 10 minutes); not written to storage by the site. The hosting provider may log requests. | same |
| Error logs | If sending fails, the server logs Resend's status and response text (normally no form content). | same |
| Hosting | Vercel, functions in the `fra1` region (Frankfurt, Germany). | `vercel.json` |
| Analytics | Vercel Web Analytics and Speed Insights scripts are loaded on every page. | `src/app/[lang]/layout.tsx` |
| Browser storage | `sessionStorage` flags for a one-time reload if a script fails to load. No form data is stored in the browser. The site sets no cookies of its own. | `layout.tsx` (`ASSET_RECOVERY`) |
| Confirmation email to the visitor | None is sent. | `route.ts` |
| WhatsApp button | Opens WhatsApp (wa.me) with a pre-filled message; the conversation then happens in WhatsApp, outside the website. Shown only once Ingen sets a number. | `src/lib/contact.ts` |

## Information needed before this can be approved `[TO CONFIRM]`

1. Legal name of the entity responsible for the website and the enquiries (the "controller"), its commercial registration number and registered address.
2. A contact channel for privacy questions and requests (email address or form), and who handles them.
3. How long enquiries (and attachments) are kept in the inbox, and how they are deleted.
4. Who at Ingen can access the enquiry inbox, and which email provider hosts it (and where).
5. Confirmation from Vercel's and Resend's documentation or agreements of: what Vercel Analytics/Speed Insights collect, request-log retention, Resend's processing locations and retention.
6. Legal review of applicable law (for example Saudi Arabia's Personal Data Protection Law, and any rules on transferring data outside the Kingdom, given hosting in Germany and an email provider that may process data elsewhere), the lawful basis, and the rights wording.
7. Whether enquiries are ever used for anything other than replying (for example adding to a CRM or marketing list). The draft below assumes **not**; change it if that is wrong.
8. Effective date and how changes will be announced.

---

## English draft

**Privacy notice**

*Last updated: [TO CONFIRM]*

This notice explains how [legal entity name, TO CONFIRM] ("Ingen", "we") handles personal information sent through the enquiry form on this website.

**What we collect.** When you send an enquiry, we receive the details you enter: your name, email address, phone number and a description of what you would like to build or improve, and, if you choose to add them, your organisation, an approximate budget, your desired timing and one document. If you message us on WhatsApp, that conversation takes place in WhatsApp. [TO CONFIRM: how WhatsApp messages are kept.] We also receive the language of the page you used.

**How we use it.** We use these details to review your enquiry and to contact you about it. [TO CONFIRM: we do not use them for marketing or add them to mailing lists.]

**How it is processed.** The form is sent to our website's server, hosted by Vercel in Frankfurt, Germany, and delivered to our team by email through Resend, an email delivery service. Our website does not keep a separate database of enquiries. Your IP address is used briefly to limit repeated submissions. [TO CONFIRM: email provider for our inbox and where it stores data.]

**Who can see it.** [TO CONFIRM: the Ingen team members who handle enquiries], and the service providers named above, which process it on our behalf to host the site and deliver email.

**How long we keep it.** [TO CONFIRM: retention period and deletion practice.]

**Website analytics.** We use Vercel Web Analytics and Speed Insights to understand how the site is used and how fast it loads. [TO CONFIRM: what these collect.] Our website does not set its own cookies.

**Your choices and rights.** You can ask us what information we hold about you from an enquiry, ask us to correct it or ask us to delete it by contacting [privacy contact, TO CONFIRM]. [TO CONFIRM with legal adviser: rights wording and how to complain to the relevant authority.]

**Changes.** If we change this notice, we will update the date above. [TO CONFIRM]

---

## Arabic draft — مسودة عربية (تحتاج إلى مراجعة لغوية وقانونية)

**إشعار الخصوصية**

*آخر تحديث: [يُحدَّد لاحقًا]*

يوضّح هذا الإشعار كيف تتعامل [اسم المنشأة القانوني — يُحدَّد لاحقًا] («Ingen» أو «نحن») مع البيانات الشخصية المرسلة عبر نموذج التواصل في هذا الموقع.

**البيانات التي نتلقّاها.** عند إرسال طلبك نتلقّى البيانات التي تُدخلها: اسمك وبريدك الإلكتروني ورقم هاتفك ووصفًا لما تودّ بناءه أو تحسينه، وإن اخترت إضافتها: اسم منشأتك والميزانية التقريبية والتوقيت المطلوب ومستندًا واحدًا. وإذا راسلتنا عبر واتساب فتجري المحادثة داخل تطبيق واتساب. [يُحدَّد لاحقًا: طريقة الاحتفاظ برسائل واتساب.] كما نتلقّى لغة الصفحة التي استخدمتها.

**كيف نستخدمها.** نستخدم هذه البيانات لمراجعة طلبك والتواصل معك بشأنه. [يُحدَّد لاحقًا: لا نستخدمها لأغراض تسويقية ولا نضيفها إلى قوائم بريدية.]

**كيف تُعالَج.** يُرسَل النموذج إلى خادم موقعنا المستضاف لدى Vercel في فرانكفورت بألمانيا، ويُسلَّم إلى فريقنا بالبريد الإلكتروني عبر Resend، وهي خدمة لإرسال البريد الإلكتروني. ولا يحتفظ موقعنا بقاعدة بيانات مستقلة للطلبات. ويُستخدم عنوان IP الخاص بك لفترة وجيزة للحدّ من الإرسال المتكرر. [يُحدَّد لاحقًا: مزوّد البريد الإلكتروني لصندوق الوارد لدينا ومكان تخزينه للبيانات.]

**من يمكنه الاطلاع عليها.** [يُحدَّد لاحقًا: أعضاء فريق Ingen المسؤولون عن الطلبات]، ومزوّدو الخدمات المذكورون أعلاه الذين يعالجونها نيابةً عنا لاستضافة الموقع وتسليم البريد.

**مدة الاحتفاظ بها.** [يُحدَّد لاحقًا: مدة الاحتفاظ وطريقة الحذف.]

**تحليلات الموقع.** نستخدم Vercel Web Analytics وSpeed Insights لفهم طريقة استخدام الموقع وسرعة تحميله. [يُحدَّد لاحقًا: البيانات التي تجمعها.] ولا يضع موقعنا ملفات تعريف ارتباط (كوكيز) خاصة به.

**خياراتك وحقوقك.** يمكنك أن تطلب منا معرفة البيانات التي نحتفظ بها عنك من طلبك، أو تصحيحها، أو حذفها، بالتواصل عبر [قناة التواصل الخاصة بالخصوصية — يُحدَّد لاحقًا]. [يُحدَّد لاحقًا مع المستشار القانوني: صياغة الحقوق وطريقة تقديم الشكوى إلى الجهة المختصة.]

**التعديلات.** إذا عدّلنا هذا الإشعار فسنحدّث التاريخ أعلاه. [يُحدَّد لاحقًا]
