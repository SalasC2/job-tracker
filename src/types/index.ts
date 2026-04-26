export type Status =
  | "Bookmarked"
  | "Applied"
  | "Phone Screen"
  | "Technical"
  | "Final"
  | "Offer"
  | "Rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: Status;
  dateApplied: string;
  nextAction: string;
  notes: string;
  url: string;
  prepUrl: string;
}

export interface StatusConfig {
  color: string;
  bg: string;
  label: string;
}