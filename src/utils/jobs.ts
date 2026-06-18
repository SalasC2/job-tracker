import type { Job } from "../types/index";

const STATUS_PRIORITY: Record<string, number> = {
    "Final": 0,
    "Technical": 1,
    "Phone Screen": 2,
    "Applied": 3,
    "Bookmarked": 4,
    "Offer": 5,
    "Rejected": 6,
};

export const filterJobs = (activeJobs: Job[], filter: string, search: string): Job[] => {
    return activeJobs.filter((j) => {
      const matchFilter = filter === "All" || j.status === filter;
      const matchSearch =
        !search ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      const priorityDiff = (STATUS_PRIORITY[a.status] ?? 99) - (STATUS_PRIORITY[b.status] ?? 99);
      if (priorityDiff !== 0) return priorityDiff;
      // Secondary sort: most recent date first
      return (b.dateApplied ?? "").localeCompare(a.dateApplied ?? "");
    });
}