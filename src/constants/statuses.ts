import type { Status, StatusConfig } from "../types";

export const STATUS_CONFIG: Record<Status, StatusConfig> = {
  Bookmarked:    { color: "#6B7280", bg: "#1F2937",  label: "Bookmarked" },
  Applied:       { color: "#3B82F6", bg: "#1E3A5F",  label: "Applied" },
  "Phone Screen":{ color: "#A78BFA", bg: "#2E1F5E",  label: "Phone Screen" },
  Technical:     { color: "#F59E0B", bg: "#3D2800",  label: "Technical" },
  Final:         { color: "#FB923C", bg: "#3D1800",  label: "Final Round" },
  Offer:         { color: "#22C55E", bg: "#052E16",  label: "Offer 🎉" },
  Rejected:      { color: "#EF4444", bg: "#2D0707",  label: "Rejected" },
};

export const STATUSES = Object.keys(STATUS_CONFIG) as Status[];