/**
 * Homepage section anchors, in page order. Navigation, the footer and the
 * language switch all use this list, so their order always matches the page.
 * "enquiry-form" only exists once the form has been opened.
 */
export const SECTION_IDS = ["services", "examples", "approach", "enquiry", "enquiry-form", "faq"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/** Hash that opens the enquiry form when a page loads with it (used by links from other pages). */
export const ENQUIRY_FORM_HASH = "#enquiry-form";
