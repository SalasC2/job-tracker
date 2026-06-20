import type { ContactType } from "../types";

export const CONTACT_TYPES: ContactType[] = ["Recruiter", "Referral", "Hiring Manager"];

export const CONTACT_TYPE_CONFIG: Record<ContactType, { label: string; color: string; bg: string }> = {
  Recruiter: { label: "Recruiter", color: "var(--badge-blue)", bg: "var(--badge-blue-bg)" },
  Referral: { label: "Referral", color: "var(--badge-green)", bg: "var(--badge-green-bg)" },
  "Hiring Manager": { label: "Hiring Manager", color: "var(--badge-yellow)", bg: "var(--badge-yellow-bg)" },
};