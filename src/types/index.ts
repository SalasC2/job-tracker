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

export interface Contact {
  id: string;
  userId: string;
  name: string;
  company: string;
  type: 'Recruiter' | 'Referral' | 'Hiring Manager';
  email: string;
  linkedin: string;
  lastContact: string;
  nextFollowup: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}