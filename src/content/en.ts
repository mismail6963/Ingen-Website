/**
 * English copy for the homepage. Based on the approved Ingen v4 design,
 * revised in October 2026 following the website audit (clearer hero and
 * services, one call to action, merged "How we work" section).
 *
 * Copy rules (see CLAUDE.md): never add clients, testimonials, completed
 * projects, results, awards, certifications, partnerships, years of
 * experience, prices, delivery times or response-time promises.
 */
const en = {
  meta: {
    title: "Ingen — Software and AI built around your business",
    description:
      "Ingen is a Riyadh-based software and AI company. We design and build business systems, websites, applications and practical AI tools for organisations, in Arabic and English.",
    ogAlt: "Ingen: software and AI built around your business. Riyadh, Saudi Arabia.",
  },

  nav: {
    homeLabel: "Ingen home",
    skip: "Skip to main content",
    mainLabel: "Main",
    // Same order as the sections on the page.
    services: "Services",
    demo: "Demo",
    approach: "How we work",
    faq: "FAQ",
    // Every control that opens the enquiry form uses this label.
    cta: "Tell us about your project",
    // Narrow screens only, where the full label does not fit beside the menu.
    ctaShort: "Contact us",
    menu: "Menu",
    close: "Close menu",
    switchLabel: "العربية",
  },

  hero: {
    eyebrow: "Software and AI • Riyadh, Saudi Arabia",
    title: "Turn slow, manual processes into software that fits how you work",
    lead: "We design and build business systems, websites, applications and practical AI tools for organisations, in Arabic and English.",
    secondary: "Explore our services",
  },

  services: {
    eyebrow: "Services",
    title: "What do you want to improve?",
    intro: "Choose the closest match, or simply describe the problem and we’ll recommend the right approach.",
    detailLabel: "Service",
    detailsHint: "Details",
    typicalLabel: "Typical work",
    howLabel: "How we approach it",
    back: "Back to services",
    close: "Close",
    notSure: "Not sure? Describe the problem.",
    items: [
      {
        slug: "business-systems",
        num: "[01]",
        title: "Business systems",
        lead: "Approval workflows, internal tools, dashboards and ERP extensions that help your team manage work beyond email and spreadsheets.",
        typical: [
          "Management dashboards and reporting",
          "Internal workflows and approvals",
          "ERP configuration and extensions",
          "Custom business tools",
        ],
        how: "We map the current process, roles and approvals, then define the records, permissions and reports people need. Where an existing platform fits, we configure it; where it doesn’t, we build.",
      },
      {
        slug: "websites-and-applications",
        num: "[02]",
        title: "Websites and applications",
        lead: "Corporate websites, customer portals, booking platforms, and web and mobile applications, in Arabic, English or both.",
        typical: [
          "Corporate websites",
          "Customer portals and account areas",
          "Booking platforms",
          "Web and mobile applications",
        ],
        how: "We map the journeys and actions people need, design in Arabic and English where the scope requires it, and build, test and release on web and mobile.",
      },
      {
        slug: "applied-ai",
        num: "[03]",
        title: "Applied AI",
        lead: "Assistants that answer from your documents, document-processing tools and customer-support tools, tested on real examples with human oversight.",
        typical: ["Knowledge assistants", "Document processing", "Customer-support tools", "Workflow assistance"],
        how: "We define the task, the information it uses and how quality is checked, test a focused proof of concept with real examples, then release with monitoring and human oversight.",
      },
      {
        slug: "integration-and-automation",
        num: "[04]",
        title: "Integration and automation",
        lead: "Connect your existing systems, migrate data and automate updates to reduce repeated data entry.",
        typical: ["System integrations", "Data migration", "Automated updates", "Connected reporting"],
        how: "We identify what data moves, when and between which systems, migrate and check existing data, and set up alerts so errors are detected and resolved.",
      },
    ],
  },

  demo: {
    badge: "Concept demonstration",
    title: "An approval workflow with a clear next step",
    lead: "An illustrative concept: requests, approvals and progress in one shared workspace, so everyone can see what happens next and who owns it.",
    view: "Try the demonstration",
    previewLabel:
      "Preview of the approval workflow concept. The request Laptop replacement for field team is at stage 3 of 4, Finance review. Next action: Finance checks the budget and approves.",
    requests: "Requests",
    openCount: (n: number) => `${n} open`,
    requestedBy: (who: string) => `Requested by ${who}`,
    status: { manager: "Awaiting manager", finance: "Awaiting Finance", approved: "Approved" },
    stepState: { done: "done", current: "in progress", waiting: "waiting" },
    stagesLabel: "Approval stages",
    stages: ["Submitted", "Manager", "Finance", "Approved"],
    next: [
      null,
      { label: "Next action · Step 2 of 4", text: "The department manager reviews the request.", who: "Assigned to Department manager" },
      { label: "Next action · Step 3 of 4", text: "Finance checks the budget and approves.", who: "Assigned to Finance team" },
      { label: "Complete · 4 of 4", text: "Approved. The requester has been notified.", who: "No further action needed" },
    ],
    approveAs: { manager: "Approve as manager", finance: "Approve as Finance" },
    reset: "Reset demo",
    dialogTitle: "Approval workflow",
    dialogHint: "Select a request, then approve it to see the next step update.",
    close: "Close demonstration",
    footnote: "Illustrative concept, not a client project. Names and figures are samples.",
    // Sample data only. Not real requests, people or organisations.
    sampleRequests: [
      { id: "PR-2041", title: "Laptop replacement for field team", dept: "IT", amount: "SAR 18,400", by: "Field operations" },
      { id: "PR-2044", title: "Annual software licence renewal", dept: "Operations", amount: "SAR 42,000", by: "Operations team" },
      { id: "PR-2047", title: "Training workshop booking", dept: "Human resources", amount: "SAR 6,500", by: "Learning and development" },
    ],
  },

  approach: {
    eyebrow: "How we work",
    title: "From idea to working software",
    show: "See all six stages",
    hide: "Show the three-stage summary",
    summaryLabel: "Three-stage summary",
    allLabel: "All six stages",
    summary: [
      { title: "Understand and define", text: "We learn your goals, users and systems, then agree the scope, priorities and how the work will be accepted." },
      { title: "Design and build", text: "We design the experience and develop working versions for you to review as the work progresses." },
      { title: "Launch and support", text: "We launch, hand over documentation, access and training, and support you as set out in the proposal." },
    ],
    stages: [
      { title: "Understand", text: "We learn about your goals, users, workflows and existing systems." },
      { title: "Define", text: "We agree the scope, priorities, delivery plan and how the work will be accepted." },
      { title: "Design and build", text: "We design the experience and develop working versions for you to review." },
      { title: "Test and accept", text: "We check the agreed functionality, permissions and integrations, and support your review." },
      { title: "Launch and hand over", text: "We prepare the release and hand over the agreed documentation, access and training." },
      { title: "Support and improve", text: "We provide the support set out in the proposal and plan further improvements as your needs develop." },
    ],
    commitmentsTitle: "A clear approach to your project",
    commitments: [
      { title: "Clear scope", text: "We agree the deliverables, responsibilities and acceptance criteria before development begins." },
      { title: "Visible progress", text: "Working demonstrations and regular updates make it easier to review progress and decide." },
      { title: "One named contact", text: "One person coordinates communication, decisions and delivery, from kick-off to handover." },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Before we begin",
    items: [
      {
        q: "How much will my project cost?",
        a: "Cost depends mainly on scope: the number of users and roles, the screens and workflows involved, integrations with your existing systems, any data migration, and the support you need after launch. Once we understand the problem, we set out the proposed work and commercial terms in a written proposal before development begins. If the scope is still unclear, we can start with a discovery phase to define it.",
      },
      {
        q: "How long does a project take?",
        a: "Timing depends on the scope, how quickly decisions and feedback can be given, access to your existing systems and data, and what must be ready for launch. We agree a delivery plan during scoping and point out the dependencies that could affect it.",
      },
      {
        q: "Can you work with our existing systems?",
        a: "We start by reviewing the tools and processes you already use, then recommend where integration, configuration or custom development makes sense. Whether a particular system can be connected depends on the access and interfaces it provides, which we check during scoping.",
      },
      {
        q: "Who owns the code and files?",
        a: "Ownership and licences are set out in the proposal and agreement before work begins, including what is handed over: source code, files, documentation and access. Third-party platforms and components stay under their own licences.",
      },
      {
        q: "Can you build in Arabic and English?",
        a: "Yes. We design and build interfaces in Arabic, English or both, including right-to-left layouts. Which languages a project includes is agreed in its scope.",
      },
      {
        q: "What happens after launch?",
        a: "Support after launch is agreed in the proposal: what is covered, for how long, and how further improvements are scoped. We hand over the agreed documentation, access and training at launch.",
      },
    ],
  },

  closing: {
    title: "What would you like to build or improve?",
    lead: "Tell us about the website, application or business process you have in mind. A short description is enough to start.",
  },

  form: {
    title: "Tell us about your project",
    lead: "We'll review your needs and discuss a sensible next step.",
    reassurance: {
      term: "Not sure what you need?",
      text: "Describe the problem in your own words. You don't need a technical brief; we'll suggest the right approach, and where needed we can begin with a discovery phase.",
    },
    notes: [
      { term: "What happens next", text: "We review your enquiry and contact you using the details you provide to discuss a sensible next step." },
      { term: "Hosting and data", text: "We agree hosting, access and data-handling requirements during scoping." },
    ],
    requiredNote: "Fields marked Required are needed to send your enquiry.",
    required: "Required",
    optional: "Optional",
    errorSummary: "Please check the highlighted fields.",
    errorPrefix: "Error:",
    name: "Name",
    email: "Email",
    org: "Organisation",
    need: "What would you like to build or improve?",
    needPlaceholder: "For example: our purchase approvals happen over email and we can't see where requests are stuck.",
    needHint: "A few sentences in your own words is fine.",
    more: "Add budget, timing or a document",
    moreOptional: "(optional)",
    budget: "Approximate budget",
    currency: "SAR",
    budgetHint: "In Saudi riyals. A rough figure or range is fine.",
    timing: "Desired timing",
    timingOptions: ["Flexible / Not sure yet", "Within 3 months", "In 3 to 6 months", "More than 6 months away"],
    phone: "Phone number",
    phoneHint: "So we can call or message you about your enquiry.",
    file: "Existing brief or document",
    fileChoose: "Choose a file",
    fileReplace: "Choose a different file",
    fileRemove: "Remove file",
    fileNone: "No file selected",
    fileHint: "PDF, Word, PowerPoint, Excel, text or image files, up to 5 MB.",
    fileSelected: (name: string, size: string) => `Selected: \u2068${name}\u2069 (${size})`,
    fileSize: (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))}\u00a0KB` : `${(bytes / (1024 * 1024)).toFixed(1)}\u00a0MB`),
    fileTooLarge: "This file is larger than 5 MB. Choose a smaller file or remove it.",
    submit: "Send project enquiry",
    sending: "Sending your enquiry…",
    messages: {
      name: "Please enter your name.",
      emailEmpty: "Please enter your email address.",
      emailBad: "Please enter a valid email address, for example name@company.com.",
      phoneEmpty: "Please enter your phone number.",
      phoneBad: "Please enter a valid phone number: digits only, with the country code if you're outside Saudi Arabia.",
      need: "Please tell us briefly what you would like to build or improve.",
    },
    failure: {
      not_configured: "Enquiries can't be sent from this site at the moment. Your details are still here; please try again later.",
      attachment_too_large: "The attached file is larger than 5 MB. Please attach a smaller file or remove it.",
      send_failed: "Something went wrong and your enquiry wasn't sent. Your details are still here, so please try again.",
      bad_request: "Something went wrong and your enquiry wasn't sent. Your details are still here, so please try again.",
      network: "We couldn't reach the server, so your enquiry wasn't sent. Check your connection and try again; your details are still here.",
    },
    success: {
      title: "Thank you. We’ve received your enquiry.",
      text: "We will contact you using the details you provided.",
      back: "Send another enquiry",
    },
  },

  // WhatsApp contact. Only shown once a number is set in src/lib/contact.ts.
  whatsapp: {
    cta: "Message us on WhatsApp",
    prefer: "Prefer WhatsApp?",
    short: "WhatsApp",
    newTab: "(opens WhatsApp in a new tab)",
    // Pre-filled first message in the visitor's WhatsApp.
    message: "Hello Ingen team, I visited your website and would like to discuss my project and learn more about your services and how you could help.",
  },

  footer: {
    tagline: "Software and AI built around your business.",
    location: "Riyadh, Saudi Arabia.",
    explore: "Explore",
    contact: "Get in touch",
    language: "Language",
    current: "English",
    other: "العربية",
    copyright: "© 2026 Ingen.",
    top: "Back to top",
  },

  notFound: {
    label: "Error 404",
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved. These links will take you somewhere useful.",
    home: "Go to the homepage",
    services: "See our services",
    cta: "Tell us about your project",
    metaTitle: "Page not found — Ingen",
  },
};

export default en;
