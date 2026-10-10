/**
 * English copy for the homepage. Approved in the Ingen v4 design (October 2026).
 *
 * Copy rules (see CLAUDE.md): never add clients, testimonials, completed
 * projects, results, awards, certifications, partnerships, years of
 * experience, prices, delivery times or response-time promises.
 */
const en = {
  meta: {
    title: "Ingen — Software and AI built around your business",
    description:
      "Ingen is a Riyadh-based software and AI company. Websites, applications, business systems and AI tools, designed around how your organisation works.",
  },

  nav: {
    homeLabel: "Ingen home",
    mainLabel: "Main",
    services: "Services",
    examples: "Examples",
    approach: "Approach",
    company: "Company",
    contact: "Contact",
    discuss: "Discuss your project",
    menu: "Menu",
    close: "Close",
    switchLabel: "العربية",
  },

  hero: {
    eyebrow: "Software and AI • Riyadh, Saudi Arabia",
    title: "Software and AI built around your business.",
    lead: "Websites, applications, business systems and AI tools, designed around how your organisation works.",
    cta: "Discuss your project",
    secondary: "Explore our services",
  },

  services: {
    eyebrow: "Services",
    title: "What do you need your software to do?",
    intro:
      "Start with the problem. We'll help define the right approach around your users, workflows and existing tools.",
    detailLabel: "Service",
    typicalLabel: "Typical work",
    howLabel: "How we approach it",
    back: "Back to services",
    close: "Close",
    items: [
      {
        slug: "business-systems",
        num: "[01]",
        title: "Business systems",
        lead: "Bring approvals, operations and reporting into a system designed around your organisation.",
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
        lead: "Give customers and employees a clear, useful way to interact with your organisation.",
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
        lead: "Put AI to work on a defined task, with the right information, evaluation and human oversight.",
        typical: ["Knowledge assistants", "Document processing", "Customer-support tools", "Workflow assistance"],
        how: "We define the task, the information it uses and how quality is checked, test a focused proof of concept with real examples, then release with monitoring and human oversight.",
      },
      {
        slug: "integration-and-automation",
        num: "[04]",
        title: "Integration and automation",
        lead: "Connect existing tools and reduce repeated work across your systems.",
        typical: ["System integrations", "Data migration", "Automated updates", "Connected reporting"],
        how: "We identify what data moves, when and between which systems, migrate and check existing data, and set up alerts so errors are detected and resolved.",
      },
    ],
  },

  demo: {
    badge: "Concept demonstration",
    title: "An approval workflow with a clear next step.",
    lead: "An illustrative concept: requests, approvals and progress in one shared workspace, so everyone can see what happens next and who owns it.",
    view: "View demonstration",
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

  company: {
    eyebrow: "Company",
    titleStrong: "A Riyadh-based software and AI company,",
    titleMuted: "built around the needs of businesses and public-sector organisations.",
    items: [
      { title: "Clear scope", text: "We agree the deliverables, responsibilities and acceptance criteria before development begins." },
      { title: "Visible progress", text: "Working demonstrations and regular updates make it easier to review progress and decide." },
      { title: "Named accountability", text: "A named contact coordinates communication, decisions and delivery." },
    ],
  },

  approach: {
    eyebrow: "Approach",
    title: "From business need to working software.",
    show: "+  See all six stages",
    hide: "−  Hide the six stages",
    allLabel: "All six stages",
    summary: [
      { num: "+ 01", title: "Understand and define", text: "We learn your goals, users and systems, then agree the scope, priorities and how the work will be accepted." },
      { num: "+ 02", title: "Design and build", text: "We map the experience and develop working versions for you to review as the work progresses." },
      { num: "+ 03", title: "Launch and support", text: "We release the work, hand over the agreed documentation, access and training, and provide the agreed support." },
    ],
    stages: [
      { title: "Understand.", text: "We learn about your goals, users, workflows and existing systems." },
      { title: "Define.", text: "We agree the scope, priorities, delivery plan and how the work will be accepted." },
      { title: "Design and build.", text: "We map the experience and develop working versions for you to review." },
      { title: "Test and accept.", text: "We check the agreed functionality, permissions and integrations, and support your review." },
      { title: "Launch and hand over.", text: "We prepare the release and provide the agreed documentation, access and training." },
      { title: "Support and improve.", text: "We provide the agreed support and plan further improvements as your needs develop." },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Before we begin.",
    items: [
      {
        q: "How much will my project cost?",
        a: "Cost depends on the scope, users, integrations, data and level of support required. We define these with you and set out the proposed work and commercial terms before development begins.",
      },
      {
        q: "How long does a project take?",
        a: "The timeline depends on the complexity of the work and what needs to be ready for launch. We agree a delivery plan during scoping and identify the decisions and dependencies that could affect it.",
      },
      {
        q: "Can you work with our existing systems?",
        a: "We assess the tools and processes you already use and identify where integration, configuration or custom development makes sense.",
      },
      {
        q: "What happens after launch?",
        a: "The proposal defines the support arrangements, maintenance coverage and how future improvements will be scoped.",
      },
    ],
  },

  closing: {
    title: "What would you like to build or improve?",
    lead: "Tell us about the website, application or business process you have in mind. A short description is enough to start.",
    cta: "Discuss your project",
  },

  form: {
    title: "Discuss your project",
    lead: "We'll review your needs and discuss a sensible next step.",
    notes: [
      { term: "Not sure what you need?", text: "Describe the problem. Where needed, we can begin with a discovery phase before a larger build." },
      { term: "Who owns the work?", text: "Ownership and licences are agreed in the project scope, including the source code, files and access handed over." },
      { term: "Hosting and data", text: "We agree hosting, access and data-handling requirements during scoping." },
    ],
    requiredNote: "Fields marked Required are needed to send your enquiry.",
    required: "Required",
    optional: "Optional",
    errorSummary: "Please check the highlighted fields.",
    name: "Name",
    email: "Email",
    org: "Organisation",
    need: "What would you like to build or improve?",
    needPlaceholder: "For example: our purchase approvals happen over email and we can't see where requests are stuck.",
    needHint: "A few sentences in your own words is fine.",
    more: "Add budget, timing, phone or a document",
    moreOptional: "(optional)",
    budget: "Approximate budget",
    currency: "SAR",
    budgetPlaceholder: "e.g. 120,000",
    budgetHint: "In Saudi riyals. A rough figure or range is fine.",
    timing: "Desired timing",
    timingOptions: ["Flexible / Not sure yet", "Within 3 months", "In 3 to 6 months", "More than 6 months away"],
    phone: "Phone number",
    file: "Existing brief or document",
    fileHint: "Any common document format, up to 5 MB.",
    fileAttached: (name: string) => `Attached: ${name}`,
    submit: "Send project enquiry",
    sending: "Sending…",
    messages: {
      name: "Please enter your name.",
      emailEmpty: "Please enter your email address.",
      emailBad: "Please enter a valid email address, for example name@company.com.",
      need: "Please tell us briefly what you would like to build or improve.",
    },
    failure: {
      not_configured: "Enquiries can't be sent from this site yet. Please try again later.",
      attachment_too_large: "The attached file is larger than 5 MB. Please attach a smaller file or remove it.",
      send_failed: "Something went wrong and your enquiry wasn't sent. Your details are still here, so please try again.",
      bad_request: "Something went wrong and your enquiry wasn't sent. Your details are still here, so please try again.",
      network: "We couldn't reach the server. Check your connection and try again.",
    },
    success: {
      title: "Thanks. We've received your enquiry.",
      text: "We'll review the details and contact you using the information provided.",
      back: "Send another enquiry",
    },
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
    title: "Page not found.",
    text: "The page you're looking for doesn't exist or has moved.",
    home: "Go to the homepage",
  },
};

export default en;
