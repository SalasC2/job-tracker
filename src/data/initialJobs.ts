import type { Job } from "../types";

export const INITIAL_JOBS: Job[] = [
  { id: "1", company: "Trunk",    role: "Frontend Engineer",  status: "Bookmarked", dateApplied: "", nextAction: "Apply this week",   notes: "React-heavy, Series A",      url: "", prepUrl: ""},
  { id: "2", company: "WorkOS",   role: "Software Engineer",  status: "Bookmarked", dateApplied: "", nextAction: "Research stack",     notes: "Dev tools, clean product",   url: "", prepUrl: "" },
  { id: "3", company: "Knock",    role: "Frontend Engineer",  status: "Bookmarked", dateApplied: "", nextAction: "Check Wellfound",    notes: "Notification infra",         url: "", prepUrl: "" },
  { id: "4", company: "Cursor",   role: "Frontend Engineer",  status: "Bookmarked", dateApplied: "", nextAction: "Apply this week",   notes: "Hot rn, competitive",        url: "", prepUrl: "" },
  { id: "5", company: "Descript", role: "Software Engineer",  status: "Bookmarked", dateApplied: "", nextAction: "Apply this week",   notes: "Strong React UI",            url: "", prepUrl: "" },
];